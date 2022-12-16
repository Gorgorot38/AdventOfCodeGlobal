import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { dijkstra, getNeighbours, Node } from 'src/app/utils/nodes';
import { PriorityQueue } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2022-d16',
  templateUrl: './day-y2022-d16.component.html',
  styleUrls: ['./day-y2022-d16.component.scss'],
})
export class DayY2022D16Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  vertices: Map<string, Node> = new Map();
  allScores: number[] = [];
  allMidScores: number[] = [];
  maxValues: number[] = [];
  pathPrices = new Map<string, ElephantsStuff>();
  allPaths: string[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '16' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.allPaths = [];
    this.allScores = [];
    this.vertices.clear();
    this.pathPrices.clear();

    this.data
      .filter((d) => d)
      .forEach((line) => {
        const match = new RegExp('Valve ([A-Z]{2}) has flow rate=([0-9]{1,3}); tunnels{0,1} leads{0,1} to valves{0,1} ([A-Z]{2},* *)+').exec(line);
        const name = match[1];
        const value = Number(match[2]);
        const neighbours: string[] = [];
        if (line.includes('valves')) {
          line
            .split('valves ')[1]
            .split(', ')
            .forEach((n) => neighbours.push(n));
        } else {
          line
            .split('valve ')[1]
            .split(', ')
            .forEach((n) => neighbours.push(n));
        }

        const currentNode = new Node(name, 1);
        currentNode.value = value;
        neighbours.forEach((n) => currentNode.neighbors.push(new Node(n, 1)));
        this.vertices.set(name, currentNode);
      });

    for (const node of this.vertices) {
      node[1].neighbors.forEach((n) => (n.value = this.vertices.get(n.name).value));
    }

    this.maxValues = [...this.vertices.values()]
      .map((v) => v.value as number)
      .sort((a, b) => b - a)
      .filter((n) => n);

    this.maxValues = this.maxValues.splice(0, 4);
    console.log(this.maxValues);
  }

  solvePartOne() {
    this.initVariables();

    this.computeDistances();
    this.computePathsPart1(30, 0, 'AA', _.cloneDeep(this.vertices), []);

    this.result.emit(this.allScores.sort((s1, s2) => s2 - s1)[0].toString());
  }

  computeDistances() {
    [...this.vertices.values()]
      .filter((v) => v.value !== 0 || v.name === 'AA')
      .forEach((v) => {
        [...this.vertices.values()]
          .filter((v2) => (v2.value !== 0 || v2.name === 'AA') && v.name !== v2.name)
          .forEach((v2) => {
            const copy = _.cloneDeep(this.vertices);
            this.pathPrices.set(`${v.name}->${v2.name}`, this.dijkstraElephants(copy.get(v2.name), v.name, copy));
          });
      });
  }

  computePathsPart1(minutes: number, score: number, currentNode: string, vertices: Map<string, Node>, path: string[]) {
    path.push(currentNode);

    if (minutes <= 0) {
      const max = Math.max(...this.allScores);
      if (score > max) {
        console.log(path.join(','));
        this.allScores.push(score);
      }
    } else {
      const elephants: ElephantsStuff[] = [];
      if ([...vertices.values()].filter((v) => v.name !== currentNode && !v.isOpened && v.value !== 0).length === 0) {
        this.computePathsPart1(-1, score, currentNode, _.cloneDeep(vertices), _.cloneDeep(path));
      } else {
        [...vertices.values()]
          .filter((v) => v.name !== currentNode && !v.isOpened && v.value !== 0)
          .forEach((v) => {
            const aled = this.pathPrices.get(`${currentNode}->${v.name}`);
            if (aled.minutes <= minutes - 1) {
              elephants.push(aled);
            }
          });

        if (elephants.length > 0) {
          elephants.forEach((e) => {
            const copied = _.cloneDeep(vertices);
            copied.get(e.name).isOpened = true;
            const newMinute = minutes - (e.minutes + 1);
            this.computePathsPart1(newMinute, score + e.flow * newMinute, e.name, copied, _.cloneDeep(path));
          });
        } else {
          this.computePathsPart1(0, score, currentNode, _.cloneDeep(vertices), _.cloneDeep(path));
        }
      }
    }
  }

  envieDeCreverEncorePlus(both: BothNodes[]) {
    const scores: number[] = [];
    both.forEach((n) => {
      let myScore = 0;
      let elScore = 0;
      const myMap = new Map<string, string[]>();
      (this.permutations(n.myNodes) as string[][]).forEach((nodes) => {
        let workingNodes = [...nodes];
        if (!Array.isArray(nodes)) {
          workingNodes = [_.cloneDeep(nodes) as unknown as string];
        }

        const newNodes: string[] = ['AA'];
        workingNodes.unshift('AA');
        let minutes = 26;
        for (let idx = 1; idx < workingNodes.length; idx++) {
          const dist = this.pathPrices.get(`${workingNodes[idx - 1]}->${workingNodes[idx]}`);
          minutes -= dist.minutes + 1;
          if (minutes >= 0) {
            newNodes.push(workingNodes[idx]);
          } else {
            break;
          }
        }
        myMap.set(newNodes.join(''), newNodes);
      });

      [...myMap.values()].forEach((nodes) => {
        let minutes = 26;
        let score = 0;
        for (let idx = 1; idx < nodes.length; idx++) {
          const stuff = this.pathPrices.get(`${nodes[idx - 1]}->${nodes[idx]}`);
          minutes -= stuff.minutes + 1;
          if (minutes >= 0) {
            score += stuff.flow * minutes;
          } else {
            break;
          }
        }
        if (score > myScore) {
          myScore = score;
        }
      });

      const elMap = new Map<string, string[]>();
      (this.permutations(n.elNodes) as string[][]).forEach((nodes) => {
        let workingNodes = [...nodes];
        if (!Array.isArray(nodes)) {
          workingNodes = [_.cloneDeep(nodes) as unknown as string];
        }

        const newNodes: string[] = ['AA'];
        workingNodes.unshift('AA');
        let minutes = 26;
        for (let idx = 1; idx < workingNodes.length; idx++) {
          const dist = this.pathPrices.get(`${workingNodes[idx - 1]}->${workingNodes[idx]}`);
          minutes -= dist.minutes + 1;
          if (minutes >= 0) {
            newNodes.push(workingNodes[idx]);
          } else {
            break;
          }
        }
        elMap.set(newNodes.join(''), newNodes);
      });

      [...elMap.values()].forEach((nodes) => {
        let minutes = 26;
        let score = 0;
        for (let idx = 1; idx < nodes.length; idx++) {
          const stuff = this.pathPrices.get(`${nodes[idx - 1]}->${nodes[idx]}`);
          minutes -= stuff.minutes + 1;
          if (minutes >= 0) {
            score += stuff.flow * minutes;
          } else {
            break;
          }
        }
        if (score > elScore) {
          elScore = score;
        }
      });

      if (myScore + elScore > Math.max(...scores)) {
        scores.push(myScore + elScore);
      }
    });

    return scores.sort((a, b) => b - a)[0];
  }

  private dijkstraElephants(target: Node, startName: string, vertices: Map<string, Node>, maxDistance: number = 9007199254740991) {
    const queue = new PriorityQueue<Node>();
    vertices.get(startName).distance = 0;
    queue.insert(0, vertices.get(startName));

    while (!queue.isEmpty()) {
      const current = queue.pop();
      if (current.isVisited) {
        continue;
      }
      current.isVisited = true;
      vertices.get(current.name).isVisited = true;

      if (current.name === target.name) {
        return { price: (target.value as number) - target.distance, flow: target.value, minutes: target.distance, name: target.name } as ElephantsStuff;
      }

      getNeighbours(current, vertices).forEach((n) => {
        const dist = current.distance + n.weight;
        if (dist < maxDistance) {
          if (dist < n.distance) {
            n.distance = dist;
            vertices.get(n.name).distance = dist;
          }

          if (n.distance !== Number.MAX_SAFE_INTEGER) {
            queue.insert(n.distance, n);
          }
        }
      });
    }
    return { price: (target.value as number) - target.distance, flow: target.value, minutes: target.distance, name: target.name } as ElephantsStuff;
  }

  solvePartTwo() {
    this.initVariables();
    this.computeDistances();

    const jambon = this.buildPaths([...this.vertices.values()].filter((v) => v.value !== 0));

    this.result.emit(this.envieDeCreverEncorePlus(jambon).toString());
  }

  buildPaths(nodes: Node[]) {
    nodes.forEach((node) => {});
    const allNodes: BothNodes[] = [];
    this.permutations(nodes).forEach((n) => {
      for (let idx = 0; idx <= n.length; idx++) {
        allNodes.push({ myNodes: _.cloneDeep(n.slice(0, idx).map((n) => n.name)), elNodes: _.cloneDeep(n.slice(idx).map((n) => n.name)) });
      }
    });

    return allNodes;
  }

  private permutations(array: any[]) {
    if (array.length <= 2) return array.length === 2 ? [array, [array[1], array[0]]] : array;
    return array.reduce((acc, item, i) => acc.concat(this.permutations([...array.slice(0, i), ...array.slice(i + 1)]).map((val) => [item, ...val])), []);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export interface ElephantsStuff {
  minutes: number;
  flow: number;
  price: number;
  name: string;
}

export interface BothNodes {
  myNodes: string[];
  elNodes: string[];
}
