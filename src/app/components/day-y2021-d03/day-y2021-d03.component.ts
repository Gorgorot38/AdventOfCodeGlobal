import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d03',
  templateUrl: './day-y2021-d03.component.html',
  styleUrls: ['./day-y2021-d03.component.scss'],
})
export class DayY2021D03Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  modifiedData: string[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '03' && d.year === '2021'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.modifiedData = this.data.filter((val) => val);
    }
  }

  solvePartOne() {
    let gamma = '';
    let epsilon = '';
    for (let idx = 0; idx < this.modifiedData[0].length; idx++) {
      const currentArray = this.modifiedData.map((el) => el[idx]);
      gamma += this.getCommonValue(currentArray, true);
      epsilon += this.getCommonValue(currentArray, false);
    }
    this.result.emit((parseInt(gamma, 2) * parseInt(epsilon, 2)).toString())
  }

  solvePartTwo() {
    return '';
  }

  private getCommonValue(array: string[], most: boolean): string {
    const map = new Map<string, number>();
    array.forEach((el) => {
      const current = map.get(el) ?? 0;
      map.set(el, current + 1);
    });

    if (most) {
      if ([...map.entries()].every((e) => e[1] == [...map.entries()][0][1])) {
        return '1';
      }
      return [...map.entries()].sort((a, b) => b[1] - a[1])[0][0];
    } else {
      if ([...map.entries()].every((e) => e[1] == [...map.entries()][0][1])) {
        return '0';
      }
      return [...map.entries()].sort((a, b) => a[1] - b[1])[0][0];
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
