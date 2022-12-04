import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d04',
  templateUrl: './day-y2022-d04.component.html',
  styleUrls: ['./day-y2022-d04.component.scss'],
})
export class DayY2022D04Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  elvesPairs: string[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '04' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.elvesPairs = this.data.filter((d) => d).map((d) => d.split(','));
  }

  solvePartOne() {
    this.initVariables();

    this.result.emit(this.elvesPairs.filter((pair) => this.areContained(pair[0], pair[1])).length.toString());
  }

  solvePartTwo() {
    this.initVariables();

    this.result.emit(this.elvesPairs.filter((pair) => this.areOverlapping(pair[0], pair[1])).length.toString());
  }

  private areContained(p1: string, p2: string): boolean {
    const min1 = Number(p1.split('-')[0]);
    const max1 = Number(p1.split('-')[1]);
    const min2 = Number(p2.split('-')[0]);
    const max2 = Number(p2.split('-')[1]);

    return (min1 <= min2 && max1 >= max2) || (min1 >= min2 && max1 <= max2);
  }

  private areOverlapping(p1: string, p2: string): boolean {
    const min1 = Number(p1.split('-')[0]);
    const max1 = Number(p1.split('-')[1]);
    const min2 = Number(p2.split('-')[0]);
    const max2 = Number(p2.split('-')[1]);

    return !(max1 < min2 || max2 < min1);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
