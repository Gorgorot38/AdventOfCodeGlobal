import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d07',
  templateUrl: './day-y2021-d07.component.html',
  styleUrls: ['./day-y2021-d07.component.scss'],
})
export class DayY2021D07Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  working_data: number[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '07' && d.year === '2021'),
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

    this.working_data.sort((a, b) => b - a);
    const max = this.working_data[0];
    this.working_data.sort((a, b) => a - b);
    const min = this.working_data[0];

    var fuel = Number.MAX_SAFE_INTEGER;
    for (let idx = min; idx <= max; idx++) {
      const tmpInput = [...this.working_data];
      let tmpFuel = 0;
      tmpInput.forEach((v) => {
        tmpFuel += Math.abs(v - idx);
      });

      if (tmpFuel <= fuel) {
        fuel = tmpFuel;
      }
    }

    this.result.emit(fuel.toString());
  }

  solvePartTwo() {
    this.initiVariables();

    this.working_data.sort((a, b) => b - a);
    const max = this.working_data[0];
    this.working_data.sort((a, b) => a - b);
    const min = this.working_data[0];

    let fuel = Number.MAX_SAFE_INTEGER;
    for (let idx = min; idx <= max; idx++) {
      const tmpInput = [...this.working_data];
      let tmpFuel = 0;
      tmpInput.forEach((v) => {
        let fuelCost = 1;
        while (v !== idx) {
          if (v >= idx) {
            v--;
          } else {
            v++;
          }
          tmpFuel += fuelCost;
          fuelCost++;
        }
      });

      if (tmpFuel <= fuel) {
        fuel = tmpFuel;
      }
    }

    this.result.emit(fuel.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
