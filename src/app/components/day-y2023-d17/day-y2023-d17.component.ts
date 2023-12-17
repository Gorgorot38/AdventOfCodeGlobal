import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import Heap from 'heap-js';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { Node } from 'src/app/utils/nodes';

@Component({
  selector: 'app-day-y2023-d17',
  templateUrl: './day-y2023-d17.component.html',
  styleUrl: './day-y2023-d17.component.scss',
})
export class DayY2023D17Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visitedFaster = new Set<string>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '17' && d.year === '2023'),
        takeUntil(this._destroying),
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

  solvePartOne() {
    this.result.emit(dijkstra(this.data).toString());
  }

  solvePartTwo() {
    this.result.emit(dijkstraUltra(this.data).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

const D = {
  N: 1,
  S: 2,
  E: 3,
  W: 4,
} as const;

const cacheKey = ([, [x, y, direction], hl, steps]: Step): number => (y << 16) | (x << 8) | (direction << 4) | steps;

type Direction = (typeof D)[keyof typeof D];
type Position = [number, number, Direction];
type HeatLoss = number;
type StepsInDirection = number;
type Heuristic = number;
type Step = [Heuristic, Position, HeatLoss, StepsInDirection];

function dijkstra(grid: string[]): number {
  const endX = grid[0].length - 1;
  const endY = grid.length - 1;

  const startX = 0;
  const startY = 0;

  const startingStepEast: Step = [0, [startX, startY, D.E], 0, 0];
  const startingStepSouth: Step = [0, [startX, startY, D.S], 0, 0];

  const queue = new Heap<Step>(([hA], [hb]) => hA - hb);
  queue.push(startingStepEast);
  queue.push(startingStepSouth);

  const visited = new Set<number>();
  visited.add(cacheKey(startingStepEast));
  visited.add(cacheKey(startingStepSouth));

  while (queue.size() > 0) {
    const [, [x, y, direction], heatLoss, steps] = queue.pop();

    if (x === endX && y === endY) return heatLoss;

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) => (steps > 2 ? newDirection !== direction : true))
      .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

    for (const [nextX, nextY, nextDirection] of nextPositions) {
      let nextStep: Step = [
        heatLoss + Number(grid[nextY][nextX]) + endX - nextX + endY - nextY,
        [nextX, nextY, nextDirection],
        heatLoss + Number(grid[nextY][nextX]),
        nextDirection === direction ? steps + 1 : 1,
      ];

      const key = cacheKey(nextStep);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(nextStep);
      }
    }
  }

  return -1;
}

export function dijkstraUltra(grid: string[]) {
  const endX = grid[0].length - 1;
  const endY = grid.length - 1;

  const startX = 0;
  const startY = 0;

  const startingStepEast: Step = [0, [startX, startY, D.E], 0, 0];
  const startingStepSouth: Step = [0, [startX, startY, D.S], 0, 0];

  const queue = new Heap<Step>(([hA], [hB]) => hA - hB);
  queue.push(startingStepEast);
  queue.push(startingStepSouth);

  const visited = new Set<number>();
  visited.add(cacheKey(startingStepEast));
  visited.add(cacheKey(startingStepSouth));

  while (queue.size() > 0) {
    const [, [x, y, direction], heatLoss, steps] = queue.pop();

    if (x === endX && y === endY) {
      if (steps < 4) continue;
      return heatLoss;
    }

    const nextPositions = getNextPositions[direction](x, y)
      .filter(([, , newDirection]) => {
        if (steps < 4) return newDirection === direction;
        if (steps > 9) return newDirection !== direction;
        return true;
      })
      .filter(([x, y]) => !(x < 0 || y < 0 || y > endY || x > endX));

    for (const [nextX, nextY, newDirection] of nextPositions) {
      let nextStep: Step = [
        heatLoss + Number(grid[nextY][nextX]) + endX - nextX + endY - nextY,
        [nextX, nextY, newDirection],
        heatLoss + Number(grid[nextY][nextX]),
        newDirection === direction ? steps + 1 : 1,
      ];

      const key = cacheKey(nextStep);
      if (!visited.has(key)) {
        visited.add(key);
        queue.push(nextStep);
      }
    }
  }

  return -1;
}

const getNextPositions: Record<Direction, (x: number, y: number) => Position[]> = {
  [D.N]: (x, y) => [
    [x, y - 1, D.N],
    [x + 1, y, D.E],
    [x - 1, y, D.W],
  ],
  [D.S]: (x, y) => [
    [x, y + 1, D.S],
    [x + 1, y, D.E],
    [x - 1, y, D.W],
  ],
  [D.E]: (x, y) => [
    [x, y + 1, D.S],
    [x, y - 1, D.N],
    [x + 1, y, D.E],
  ],
  [D.W]: (x, y) => [
    [x, y + 1, D.S],
    [x, y - 1, D.N],
    [x - 1, y, D.W],
  ],
};
