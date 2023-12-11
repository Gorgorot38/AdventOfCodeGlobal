import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import clone from 'just-clone';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d11',
  templateUrl: './day-y2023-d11.component.html',
  styleUrl: './day-y2023-d11.component.scss',
})
export class DayY2023D11Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  xIndexes: number[] = [];
  yIndexes: number[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '11' && d.year === '2023'),
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
    this.result.emit(this.solveWithManathan(2).toString());
  }

  buildEmptyIndexes() {
    const copy = clone(this.data);
    this.xIndexes = [];
    this.yIndexes = [];
    for (let i = 0; i < copy[0].length; i++) {
      if (copy.every((l) => l[i] === '.')) {
        this.xIndexes.push(i);
      }
    }

    copy.forEach((l, idx) => {
      if (l.split('').every((c) => c === '.')) {
        this.yIndexes.push(idx);
      }
    });
  }

  getEmptyNumber(position1: string, position2: string): number {
    const x1 = Number(position1.split(';')[0]);
    const y1 = Number(position1.split(';')[1]);
    const x2 = Number(position2.split(';')[0]);
    const y2 = Number(position2.split(';')[1]);

    const emptyY = this.yIndexes.filter((y) => y > Math.min(y1, y2) && y < Math.max(y1, y2)).reduce((acc) => acc + 1, 0);
    const emptyX = this.xIndexes.filter((x) => x > Math.min(x1, x2) && x < Math.max(x1, x2)).reduce((acc) => acc + 1, 0);

    return emptyX + emptyY;
  }

  solveWithManathan(addEmpty: number): number {
    this.buildEmptyIndexes();
    const positions: string[] = [];
    this.data.forEach((l, y) =>
      l.split('').forEach((c, x) => {
        if (c === '#') {
          positions.push(`${x};${y}`);
        }
      }),
    );

    return positions
      .flatMap((v, i) => positions.slice(i + 1).map((w) => ({ from: v, to: w })))
      .reduce((acc, current) => {
        const empty = this.getEmptyNumber(current.from, current.to);
        const manhattan =
          Math.abs(Number(current.from.split(';')[0]) - Number(current.to.split(';')[0])) + Math.abs(Number(current.from.split(';')[1]) - Number(current.to.split(';')[1]));
        return acc + manhattan + empty * (addEmpty - 1);
      }, 0);
  }

  solvePartTwo() {
    this.result.emit(this.solveWithManathan(1000000).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
