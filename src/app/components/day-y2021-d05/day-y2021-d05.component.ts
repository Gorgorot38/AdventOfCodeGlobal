import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d05',
  templateUrl: './day-y2021-d05.component.html',
  styleUrls: ['./day-y2021-d05.component.scss'],
})
export class DayY2021D05Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  coordinates: Coordinates[];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '05' && d.year === '2021'),
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
    this.coordinates = this.data
      .map((v) =>
        v
          .replace(' -> ', ',')
          .split(',')
          .map((v) => parseInt(v))
      )
      .map((v) => new Coordinates(v[0], v[1], v[2], v[3]));
  }

  solvePartOne() {
    this.initVariables();

    const grid: number[][] = this.initGrid();
    this.coordinates
      .filter((v) => v.startingX === v.endingX || v.startingY === v.endingY)
      .forEach((coord) => {
        if (coord.startingX === coord.endingX) {
          if (coord.startingY < coord.endingY) {
            for (let idx = coord.startingY; idx <= coord.endingY; idx++) {
              grid[coord.startingX][idx]++;
            }
          } else {
            for (let idx = coord.startingY; idx >= coord.endingY; idx--) {
              grid[coord.startingX][idx]++;
            }
          }
        } else {
          if (coord.startingX < coord.endingX) {
            for (let idx = coord.startingX; idx <= coord.endingX; idx++) {
              grid[idx][coord.startingY]++;
            }
          } else {
            for (let idx = coord.startingX; idx >= coord.endingX; idx--) {
              grid[idx][coord.startingY]++;
            }
          }
        }
      });

    this.result.emit(
      grid
        .flat()
        .filter((v) => v && v >= 2)
        .length.toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    const grid: number[][] = this.initGrid();
    this.coordinates.forEach((coord) => {
      if (coord.startingX === coord.endingX) {
        if (coord.startingY < coord.endingY) {
          for (let idx = coord.startingY; idx <= coord.endingY; idx++) {
            grid[coord.startingX][idx]++;
          }
        } else {
          for (let idx = coord.startingY; idx >= coord.endingY; idx--) {
            grid[coord.startingX][idx]++;
          }
        }
      } else if (coord.startingY === coord.endingY) {
        if (coord.startingX < coord.endingX) {
          for (let idx = coord.startingX; idx <= coord.endingX; idx++) {
            grid[idx][coord.startingY]++;
          }
        } else {
          for (let idx = coord.startingX; idx >= coord.endingX; idx--) {
            grid[idx][coord.startingY]++;
          }
        }
      } else {
        let idxX = coord.startingX;
        let idxY = coord.startingY;
        if (coord.startingY < coord.endingY && coord.startingX < coord.endingX) {
          while (idxX <= coord.endingX && idxY <= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX++;
            idxY++;
          }
        } else if (coord.startingY > coord.endingY && coord.startingX > coord.endingX) {
          while (idxX >= coord.endingX && idxY >= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX--;
            idxY--;
          }
        } else if (coord.startingY > coord.endingY) {
          while (idxX <= coord.endingX && idxY >= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX++;
            idxY--;
          }
        } else {
          while (idxX >= coord.endingX && idxY <= coord.endingY) {
            if (grid[idxX][idxY]) {
              grid[idxX][idxY]++;
            } else {
              grid[idxX][idxY] = 1;
            }

            idxX--;
            idxY++;
          }
        }
      }
    });

    this.result.emit(
      grid
        .flat()
        .filter((v) => v && v >= 2)
        .length.toString()
    );
  }

  private initGrid(): number[][] {
    this.coordinates.sort((a, b) => Math.max(b.endingX, b.startingX) - Math.max(a.endingX, a.startingX));
    const maxX = Math.max(this.coordinates[0].endingX, this.coordinates[0].startingX);
    this.coordinates.sort((a, b) => Math.max(b.endingY, b.startingY) - Math.max(a.endingY, a.startingY));
    const maxY = Math.max(this.coordinates[0].endingY, this.coordinates[0].startingY);
    const grid: number[][] = [];
    for (let idx = 0; idx <= maxX; idx++) {
      grid[idx] = Array(maxY + 1).fill(0);
    }
    return grid;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Coordinates {
  startingX: number;
  startingY: number;
  endingX: number;
  endingY: number;

  constructor(startingX: number, startingY: number, endingX: number, endingY: number) {
    this.startingX = startingX;
    this.startingY = startingY;
    this.endingX = endingX;
    this.endingY = endingY;
  }
}
