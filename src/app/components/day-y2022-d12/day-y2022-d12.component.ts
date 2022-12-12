import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { dijkstra, Node } from 'src/app/utils/nodes';

@Component({
  selector: 'app-day-y2022-d12',
  templateUrl: './day-y2022-d12.component.html',
  styleUrls: ['./day-y2022-d12.component.scss'],
})
export class DayY2022D12Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  endIndex = 0;
  startIndex = 0;

  vertices: Map<string, Node> = new Map();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '12' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    const filteredData = this.data.filter((d) => d);
    this.initVertices(filteredData);
  }

  private initVertices(filteredData: string[]) {
    this.vertices.clear();

    for (let i = 0; i < filteredData.length; i++) {
      for (let j = 0; j < filteredData[i].length; j++) {
        const currentNode = new Node((j + i * filteredData[i].length).toString(), 1);
        const left = j - 1;
        const right = j + 1;
        const up = i - 1;
        const down = i + 1;
        if (left >= 0 && this.getCustomCharCode(filteredData[i][left]) - this.getCustomCharCode(filteredData[i][j]) <= 1) {
          this.buildEdge(i, left, currentNode, filteredData[i].length);
        }
        if (right < filteredData[i].length && this.getCustomCharCode(filteredData[i][right]) - this.getCustomCharCode(filteredData[i][j]) <= 1) {
          this.buildEdge(i, right, currentNode, filteredData[i].length);
        }
        if (up >= 0 && this.getCustomCharCode(filteredData[up][j]) - this.getCustomCharCode(filteredData[i][j]) <= 1) {
          this.buildEdge(up, j, currentNode, filteredData[i].length);
        }
        if (down < filteredData.length && this.getCustomCharCode(filteredData[down][j]) - this.getCustomCharCode(filteredData[i][j]) <= 1) {
          this.buildEdge(down, j, currentNode, filteredData[i].length);
        }

        currentNode.valueName = filteredData[i][j];

        this.vertices.set(currentNode.name, currentNode);
      }
    }
  }

  private buildEdge(i: number, j: number, currentNode: Node, length: number) {
    currentNode.neighbors.push(new Node((j + i * length).toString(), 1));
  }

  private getCustomCharCode(str: string): number {
    if (str === 'E') {
      return 'z'.charCodeAt(0);
    }
    if (str === 'S') {
      return 'a'.charCodeAt(0);
    }

    return str.charCodeAt(0);
  }

  solvePartOne() {
    this.initVariables();

    const endNode = Array.from(this.vertices).find((e) => e[1].valueName === 'E')[1];
    const startNode = Array.from(this.vertices).find((e) => e[1].valueName === 'S')[1];
    this.result.emit(dijkstra(endNode, Number(startNode.name), this.vertices).toString());
  }

  solvePartTwo() {
    this.initVariables();

    const distances: number[] = [];

    const nodes = Array.from(this.vertices)
      .filter((e) => e[1].valueName === 'S' || e[1].valueName === 'a')
      .map((e) => _.cloneDeep(e[1]));
    nodes.forEach((node) => {
      this.initVertices(this.data.filter((d) => d));
      const endNode = Array.from(this.vertices).find((e) => e[1].valueName === 'E')[1];
      distances.push(dijkstra(endNode, Number(node.name), this.vertices));
    });
    this.result.emit(distances.sort((a, b) => a - b)[0].toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
