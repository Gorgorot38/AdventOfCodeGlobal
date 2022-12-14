import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d14',
  templateUrl: './day-y2022-d14.component.html',
  styleUrls: ['./day-y2022-d14.component.scss'],
})
export class DayY2022D14Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  grid: string[][] = [];
  count = 0;

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '14' && d.year === '2022'),
        takeUntil(this._destroying),
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables(part1: boolean) {
    this.count = 0;
    this.grid = [];

    const coord = this.data
      .filter((d) => d)
      .map((d) => d.split(' -> '))
      .map((d) =>
        d.map((c) => {
          const cs = c.split(',');
          return new Coordinates(Number(cs[0]), Number(cs[1]));
        }),
      );
    const flat = _.flatten(coord);

    const maxX = flat.sort((a, b) => b.x - a.x)[0].x;
    const maxY = flat.sort((a, b) => b.y - a.y)[0].y;

    for (let y = 0; y <= maxY + 2; y++) {
      const line: string[] = [];
      for (let x = 0; x <= maxX + 1000; x++) {
        line.push('.');
      }
      this.grid.push(line);
    }

    if (part1) {
      this.buildGridPart1(coord);
    } else {
      this.buildGridPart2(coord);
    }
  }

  private buildGridPart1(coord: Coordinates[][]) {
    coord.forEach((c) => {
      for (let idx = 1; idx < c.length; idx++) {
        const coord1 = c[idx - 1];
        const coord2 = c[idx];

        if (coord1.x === coord2.x) {
          if (coord1.y < coord2.y) {
            for (let idxY = coord1.y; idxY <= coord2.y; idxY++) {
              this.grid[idxY][coord1.x] = '#';
            }
          } else {
            for (let idxY = coord2.y; idxY <= coord1.y; idxY++) {
              this.grid[idxY][coord1.x] = '#';
            }
          }
        } else {
          if (coord1.x < coord2.x) {
            for (let idxX = coord1.x; idxX <= coord2.x; idxX++) {
              this.grid[coord2.y][idxX] = '#';
            }
          } else {
            for (let idxX = coord2.x; idxX <= coord1.x; idxX++) {
              this.grid[coord2.y][idxX] = '#';
            }
          }
        }
      }
    });
  }

  private buildGridPart2(coord: Coordinates[][]) {
    for (let x = 0; x < this.grid[0].length; x++) {
      this.grid[this.grid.length - 1][x] = '#';
    }
    coord.forEach((c) => {
      for (let idx = 1; idx < c.length; idx++) {
        const coord1 = c[idx - 1];
        const coord2 = c[idx];

        if (coord1.x === coord2.x) {
          if (coord1.y < coord2.y) {
            for (let idxY = coord1.y; idxY <= coord2.y; idxY++) {
              this.grid[idxY][coord1.x] = '#';
            }
          } else {
            for (let idxY = coord2.y; idxY <= coord1.y; idxY++) {
              this.grid[idxY][coord1.x] = '#';
            }
          }
        } else {
          if (coord1.x < coord2.x) {
            for (let idxX = coord1.x; idxX <= coord2.x; idxX++) {
              this.grid[coord2.y][idxX] = '#';
            }
          } else {
            for (let idxX = coord2.x; idxX <= coord1.x; idxX++) {
              this.grid[coord2.y][idxX] = '#';
            }
          }
        }
      }
    });
  }

  solvePartOne() {
    this.initVariables(true);

    let isPossible = true;
    while (isPossible) {
      isPossible = this.checkBlocksPart1(0, 500);
    }
    console.log(this.grid.map((g) => g.join('')).join('\r\n'));

    this.result.emit(this.count.toString());
  }

  private checkBlocksPart1(y: number, x: number): boolean {
    if (y >= this.grid.length) {
      return false;
    }
    if (this.isBlock(y, x)) {
      if (this.isBlock(y, x - 1) && this.isBlock(y, x + 1)) {
        this.grid[y - 1][x] = 'o';
        this.count++;
        return true;
      }
      if (!this.isBlock(y, x - 1)) {
        return this.checkBlocksPart1(y + 1, x - 1);
      }
      if (!this.isBlock(y, x + 1)) {
        return this.checkBlocksPart1(y + 1, x + 1);
      }
    } else {
      return this.checkBlocksPart1(y + 1, x);
    }
  }

  private checkBlocksPart2(y: number, x: number): boolean {
    if (this.isBlock(0, 500)) {
      return false;
    }
    if (this.isBlock(y, x)) {
      if (this.isBlock(y, x - 1) && this.isBlock(y, x + 1)) {
        this.grid[y - 1][x] = 'o';
        this.count++;
        return true;
      }
      if (!this.isBlock(y, x - 1)) {
        return this.checkBlocksPart1(y + 1, x - 1);
      }
      if (!this.isBlock(y, x + 1)) {
        return this.checkBlocksPart1(y + 1, x + 1);
      }
    } else {
      return this.checkBlocksPart1(y + 1, x);
    }
  }

  private isBlock(y: number, x: number) {
    return this.grid[y][x] === '#' || this.grid[y][x] === 'o';
  }

  solvePartTwo() {
    this.initVariables(false);

    let isPossible = true;
    while (isPossible) {
      isPossible = this.checkBlocksPart2(0, 500);
    }
    console.log(this.grid.map((g) => g.join('')).join('\r\n'));

    this.result.emit(this.count.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Coordinates {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
