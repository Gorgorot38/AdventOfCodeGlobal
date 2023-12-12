import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { memoize } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2023-d12',
  templateUrl: './day-y2023-d12.component.html',
  styleUrl: './day-y2023-d12.component.scss',
})
export class DayY2023D12Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '12' && d.year === '2023'),
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
    const res = this.data.reduce((acc, l) => {
      const firstPart = l.split(' ')[0];
      const shouldMatch = l
        .split(' ')[1]
        .split(',')
        .map((n) => Number(n));

      return acc + this.countWays(firstPart, shouldMatch);
    }, 0);
    this.result.emit(res.toString());
  }

  solvePartTwo() {
    const res = this.data.reduce((acc, l) => {
      const firstPart = l.split(' ')[0];
      const shouldMatch = l
        .split(' ')[1]
        .split(',')
        .map((n) => Number(n));
      const strExpanded = [firstPart, firstPart, firstPart, firstPart, firstPart].join('?');
      const nums = [...shouldMatch, ...shouldMatch, ...shouldMatch, ...shouldMatch, ...shouldMatch];

      return acc + this.countWays(strExpanded, nums);
    }, 0);
    this.result.emit(res.toString());
  }

  countWays = memoize((line: string, runs: readonly number[]): number => {
    if (line.length === 0) {
      if (runs.length === 0) {
        return 1;
      }
      return 0;
    }
    if (runs.length === 0) {
      for (let i = 0; i < line.length; i++) {
        if (line[i] === '#') {
          return 0;
        }
      }
      return 1;
    }

    if (line.length < runs.reduce((a, b) => a + b, 0) + runs.length - 1) {
      // The line is not long enough for all runs
      return 0;
    }

    if (line[0] === '.') {
      return this.countWays(line.slice(1), runs);
    }
    if (line[0] === '#') {
      const [run, ...leftoverRuns] = runs;
      for (let i = 0; i < run; i++) {
        if (line[i] === '.') {
          return 0;
        }
      }
      if (line[run] === '#') {
        return 0;
      }

      return this.countWays(line.slice(run + 1), leftoverRuns);
    }
    // Otherwise dunno first spot, pick
    return this.countWays('#' + line.slice(1), runs) + this.countWays('.' + line.slice(1), runs);
  });

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export function* combinationsWithRepetitions(chars: string, n: number) {
  if (n < 2) {
    yield* chars;
    return;
  }

  for (let x of chars) for (let c of combinationsWithRepetitions(chars, n - 1)) yield [x].concat(c);
}
