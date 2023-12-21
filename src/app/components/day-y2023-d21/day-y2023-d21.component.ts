import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { pointToString, stringToPoint } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2023-d21',
  templateUrl: './day-y2023-d21.component.html',
  styleUrl: './day-y2023-d21.component.scss',
})
export class DayY2023D21Component implements OnInit, OnChanges, OnDestroy {
  @Input()
  data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visitedFaster = new Set<string>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '21' && d.year === '2023'),
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
    const startingY = this.data.findIndex((str) => str.includes('S'));
    const startingX = this.data[startingY].indexOf('S');

    const grid = this.data.map((str) => str.split(''));
    grid[startingY][startingX] = '.';
    const set = new Set<string>([pointToString({ x: startingX, y: startingY })]);
    for (let i = 0; i < 64; i++) {
      const values = Array.from(set.values());
      set.clear();
      values.forEach((val) => {
        const point = stringToPoint(val);
        if (grid[point.y][point.x - 1] === '.') set.add(pointToString({ x: point.x - 1, y: point.y }));
        if (grid[point.y][point.x + 1] === '.') set.add(pointToString({ x: point.x + 1, y: point.y }));
        if (grid[point.y - 1] && grid[point.y - 1][point.x] === '.') set.add(pointToString({ x: point.x, y: point.y - 1 }));
        if (grid[point.y + 1] && grid[point.y + 1][point.x] === '.') set.add(pointToString({ x: point.x, y: point.y + 1 }));
      });
    }
    this.result.emit(set.size.toString());
  }

  solvePartTwo() {
    const startingY = this.data.findIndex((str) => str.includes('S'));
    const startingX = this.data[startingY].indexOf('S');

    const maxX = this.data[0].length;
    const maxY = this.data.length;

    const grid = this.data.map((str) => str.split(''));
    grid[startingY][startingX] = '.';
    const set = new Set<string>([pointToString({ x: startingX, y: startingY })]);
    for (let i = 0; i < 5000; i++) {
      const values = Array.from(set.values());
      set.clear();
      values.forEach((val) => {
        const point = stringToPoint(val);
        if (grid[this.computeCorrectCoordinate(point.y, maxY)][this.computeCorrectCoordinate(point.x - 1, maxX)] === '.') set.add(pointToString({ x: point.x - 1, y: point.y }));
        if (grid[this.computeCorrectCoordinate(point.y, maxY)][this.computeCorrectCoordinate(point.x + 1, maxX)] === '.') set.add(pointToString({ x: point.x + 1, y: point.y }));
        if (grid[this.computeCorrectCoordinate(point.y - 1, maxY)][this.computeCorrectCoordinate(point.x, maxX)] === '.') set.add(pointToString({ x: point.x, y: point.y - 1 }));
        if (grid[this.computeCorrectCoordinate(point.y + 1, maxY)][this.computeCorrectCoordinate(point.x, maxX)] === '.') set.add(pointToString({ x: point.x, y: point.y + 1 }));
      });
    }

    this.result.emit(set.size.toString());
  }

  private computeCorrectCoordinate(c: number, max: number): number {
    if (c < 0) return ((c % max) + max) % max;
    return c % max;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
