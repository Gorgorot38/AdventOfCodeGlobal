import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { dijkstra, Node } from 'src/app/utils/nodes';
import { PriorityQueue } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2021-d15',
  templateUrl: './day-y2021-d15.component.html',
  styleUrls: ['./day-y2021-d15.component.scss'],
})
export class DayY2021D15Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  input_data: string[][];
  vertices: Map<string, Node> = new Map();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '15' && d.year === '2021'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      //do stuff
    }
  }

  initVariables() {
    this.input_data = this.data.filter((i) => i).map((i) => i.split(''));
    this.vertices.clear();
  }

  solvePartOne() {
    this.initVariables();

    this.buildGraph();
    const last = [...this.vertices][[...this.vertices].length - 1][1];
    const count = dijkstra(last, '0', this.vertices);

    this.result.emit(count.toString());
  }

  solvePartTwo() {
    this.initVariables();

    this.buildBiggerData();
    this.buildGraph();
    const last = [...this.vertices][[...this.vertices].length - 1][1];
    const count = dijkstra(last, '0', this.vertices);

    this.result.emit(count.toString());
  }

  private buildBiggerData() {
    const initalData: string[][] = [];
    this.input_data.forEach((line) => initalData.push([...line]));
    // Build more lines
    for (let idx = 1; idx < 5; idx++) {
      initalData.forEach((line, y) =>
        line.forEach((col, x) => {
          if (parseInt(col) === 9) {
            initalData[y][x] = '1';
          } else {
            initalData[y][x] = (parseInt(col) + 1).toString();
          }
        })
      );
      initalData.forEach((line) => this.input_data.push([...line]));
    }
    // Build more columns
    this.input_data.forEach((line, y) => {
      const initialLine = [...line];
      for (let idx = 1; idx < 5; idx++) {
        initialLine.forEach((col, x) => {
          if (parseInt(col) === 9) {
            initialLine[x] = '1';
          } else {
            initialLine[x] = (parseInt(col) + 1).toString();
          }
        });
        initialLine.forEach((c) => this.input_data[y].push(c));
      }
    });
  }

  /**
   * Builds adjacency because i like adjacency matrix
   */
  private buildGraph() {
    for (let y = 0; y < this.input_data.length; y++) {
      for (let x = 0; x < this.input_data[0].length; x++) {
        const currentNode = new Node((x + y * this.input_data[0].length).toString(), parseInt(this.input_data[y][x]));
        this.buildEdge(y + 1, x, currentNode);
        this.buildEdge(y, x + 1, currentNode);
        this.buildEdge(y - 1, x, currentNode);
        this.buildEdge(y, x - 1, currentNode);
        this.vertices.set(currentNode.name, currentNode);
      }
    }
  }

  private buildEdge(y: number, x: number, currentNode: Node) {
    if (this.input_data[y] && this.input_data[y][x]) {
      currentNode.neighbors.push(new Node((x + y * this.input_data[0].length).toString(), parseInt(this.input_data[y][x])));
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
