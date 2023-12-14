import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import clone from 'just-clone';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d14',
  templateUrl: './day-y2023-d14.component.html',
  styleUrl: './day-y2023-d14.component.scss',
})
export class DayY2023D14Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '14' && d.year === '2023'),
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
    const copy = clone(this.data.map((l) => l.split('')));
    //north
    for (let y = 0; y < copy.length; y++) {
      for (let x = 0; x < copy[0].length; x++) {
        if (copy[y][x] === 'O') {
          let tmp = y - 1;
          while (tmp >= 0 && copy[tmp][x] === '.') {
            copy[tmp + 1][x] = '.';
            copy[tmp][x] = 'O';
            tmp--;
          }
        }
      }
    }

    const res = copy.reduce((acc, line, idx) => {
      const rocks = line.join('').match(/O/g)?.length ?? 0;
      return acc + rocks * (copy.length - idx);
    }, 0);

    this.result.emit(res.toString());
  }

  solvePartTwo() {
    const states = new Map<string, number>();
    let copy = clone(this.data.map((l) => l.split('')));

    let firstLoop = '';
    let firstLoopIndex = 0;
    for (let idx = 0; idx < 1000000000; idx++) {
      this.runOneCycle(copy);
      const str = JSON.stringify(copy);
      if (states.has(str)) {
        firstLoop = str;
        firstLoopIndex = idx;
        break;
      }
      states.set(JSON.stringify(copy), idx);
    }

    let loopDuration = 0;
    for (let idx = 0; idx < 1000000000; idx++) {
      this.runOneCycle(copy);
      const str = JSON.stringify(copy);
      if (str === firstLoop) {
        loopDuration = idx + 1;
        break;
      }
    }

    const numInLoop = (1000000000 - firstLoopIndex) % loopDuration;
    copy = clone(this.data.map((l) => l.split('')));
    for (let idx = 0; idx < numInLoop + firstLoopIndex; idx++) {
      this.runOneCycle(copy);
    }

    const res = copy.reduce((acc, line, idx) => {
      const rocks = line.join('').match(/O/g)?.length ?? 0;
      return acc + rocks * (copy.length - idx);
    }, 0);

    this.result.emit(res.toString());
  }

  private runOneCycle(copy: string[][]) {
    //north
    for (let y = 0; y < copy.length; y++) {
      for (let x = 0; x < copy[0].length; x++) {
        if (copy[y][x] === 'O') {
          let tmp = y - 1;
          while (tmp >= 0 && copy[tmp][x] === '.') {
            copy[tmp + 1][x] = '.';
            copy[tmp][x] = 'O';
            tmp--;
          }
        }
      }
    }

    //west
    for (const element of copy) {
      for (let x = 0; x < copy[0].length; x++) {
        if (element[x] === 'O') {
          let tmp = x - 1;
          while (element[tmp] === '.') {
            element[tmp + 1] = '.';
            element[tmp] = 'O';
            tmp--;
          }
        }
      }
    }

    //south
    for (let y = copy.length - 1; y >= 0; y--) {
      for (let x = 0; x < copy[0].length; x++) {
        if (copy[y][x] === 'O') {
          let tmp = y + 1;
          while (tmp < copy.length && copy[tmp][x] === '.') {
            copy[tmp - 1][x] = '.';
            copy[tmp][x] = 'O';
            tmp++;
          }
        }
      }
    }

    //east
    for (const element of copy) {
      for (let x = copy[0].length - 1; x >= 0; x--) {
        if (element[x] === 'O') {
          let tmp = x + 1;
          while (element[tmp] === '.') {
            element[tmp - 1] = '.';
            element[tmp] = 'O';
            tmp++;
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
