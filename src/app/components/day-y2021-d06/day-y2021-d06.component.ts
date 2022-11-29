import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d06',
  templateUrl: './day-y2021-d06.component.html',
  styleUrls: ['./day-y2021-d06.component.scss'],
})
export class DayY2021D06Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  working_data: number[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '06' && d.year === '2021'),
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

  initiVariables() {
    this.working_data = this.data[0].split(',').map((v) => parseFloat(v));
  }

  solvePartOne() {
    this.initiVariables();

    for (let day = 1; day <= 80; day++) {
      this.working_data.forEach((v, i) => {
        if (this.working_data[i] === 0) {
          this.working_data[i] = 6;
          this.working_data.push(8);
        } else {
          this.working_data[i] = v - 1;
        }
      });
    }

    this.result.emit(this.working_data.length.toString());
  }

  solvePartTwo() {
    this.initiVariables();

    let map = new Map<number, number>([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
    ]);

    this.working_data.forEach((v) => map.set(v, map.get(v) + 1));
    for (let day = 0; day < 256; day++) {
      map = new Map<number, number>([
        [0, map.get(1)],
        [1, map.get(2)],
        [2, map.get(3)],
        [3, map.get(4)],
        [4, map.get(5)],
        [5, map.get(6)],
        [6, map.get(7) + map.get(0)],
        [7, map.get(8)],
        [8, map.get(0)],
      ]);
    }

    this.result.emit([...map.entries()].reduce((a, b) => a + b[1], 0).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
