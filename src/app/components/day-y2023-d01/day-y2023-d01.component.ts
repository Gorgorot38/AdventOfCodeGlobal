import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d01',
  templateUrl: './day-y2023-d01.component.html',
  styleUrls: ['./day-y2023-d01.component.scss'],
})
export class DayY2023D01Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  map = new Map<string, number>([
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
  ]);

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '01' && d.year === '2023'),
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
    const result = this.data
      .filter((str) => str)
      .reduce((acc, current) => {
        const first = current.split('').find((char) => /\d/.test(char));
        const last = current
          .split('')
          .reverse()
          .find((char) => /\d/.test(char));
        return Number(`${first}${last}`) + acc;
      }, 0);
    this.result.emit(result.toString());
  }

  solvePartTwo() {
    const list = Array.from(this.map.entries()).reduce((acc, current) => acc.concat([current[0], current[1].toString()]), [] as string[]);
    const result = this.data
      .filter((str) => str)
      .reduce((acc, current) => {
        let firstIdx = 9999;
        let firstVal = '';

        let lastIdx = -1;
        let lastVal = '';
        for (const v of list) {
          const tmpFirstIdx = current.indexOf(v);
          if (tmpFirstIdx >= 0 && tmpFirstIdx < firstIdx) {
            firstIdx = tmpFirstIdx;
            firstVal = v;
          }

          const tmpLastIdx = current.lastIndexOf(v);
          if (tmpLastIdx >= 0 && tmpLastIdx > lastIdx) {
            lastIdx = tmpLastIdx;
            lastVal = v;
          }
        }

        return Number(`${this.getStrAsNumber(firstVal)}${this.getStrAsNumber(lastVal)}`) + acc;
      }, 0);
    this.result.emit(result.toString());
  }

  private getStrAsNumber(str: string): string {
    console.log(str);
    if (/\d/.test(str)) return str;
    return this.map.get(str).toString();
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
