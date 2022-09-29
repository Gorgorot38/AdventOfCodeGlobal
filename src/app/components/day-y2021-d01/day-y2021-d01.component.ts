import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d01',
  templateUrl: './day-y2021-d01.component.html',
  styleUrls: ['./day-y2021-d01.component.scss'],
})
export class DayY2021D01Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '01' && d.year === '2021'),
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

  solvePartOne() {
    this.result.emit(this.data.filter((d, i) => this.data[i - 1] && parseInt(d) > parseInt(this.data[i - 1])).length.toString());
  }

  solvePartTwo() {
    this.result.emit(this.data
      .filter((value, idx) => value && this.data[idx + 1] && this.data[idx + 2])
      .map((value, idx) => parseInt(value) + parseInt(this.data[idx + 1]) + parseInt(this.data[idx + 2]))
      .filter((value, idx, current) => this.data[idx - 1] && value > current[idx - 1])
      .length.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
