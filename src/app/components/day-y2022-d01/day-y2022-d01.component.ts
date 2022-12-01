import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d01',
  templateUrl: './day-y2022-d01.component.html',
  styleUrls: ['./day-y2022-d01.component.scss'],
})
export class DayY2022D01Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  copyInput: string[] = [];
  elvesTotalFood: number[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '01' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.copyInput = [...this.data];
    this.elvesTotalFood = [];
    this.buildElvesTotalFood();
  }

  solvePartOne() {
    this.initVariables();

    let maxTotal = 0;
    this.elvesTotalFood.forEach((t) => {
      const tmpTotal = t.reduce((prev, curr) => prev + curr, 0);
      if (tmpTotal > maxTotal) maxTotal = tmpTotal;
    });

    return this.result.emit(maxTotal.toString());
  }

  solvePartTwo() {
    this.initVariables();

    const totals = this.elvesTotalFood.map((t) => t.reduce((prev, curr) => prev + curr, 0));
    totals.sort((a, b) => b - a);

    this.result.emit((totals[0] + totals[1] + totals[2]).toString());
  }

  private buildElvesTotalFood() {
    let currentTotal: number[] = [];

    while (this.copyInput.length !== 0) {
      if (this.copyInput[0] === '') {
        this.elvesTotalFood.push([...currentTotal]);
        this.copyInput.shift();
        currentTotal = [];
      } else {
        currentTotal.push(parseInt(this.copyInput.shift()));
      }
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
