import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d06',
  templateUrl: './day-y2023-d06.component.html',
  styleUrl: './day-y2023-d06.component.scss',
})
export class DayY2023D06Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '06' && d.year === '2023'),
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
    const times: number[] = this.data[0].match(/\d+/g).map((v) => Number(v));
    const records: number[] = this.data[1].match(/\d+/g).map((v) => Number(v));

    const res = this.computeRaceTime(times, records);

    this.result.emit(res.toString());
  }

  private computeRaceTime(times: number[], records: number[]) {
    return times.reduce((acc, time, idx) => {
      let first: number;
      let last: number;
      for (let i = 0; i <= time; i++) {
        const speed = i * 1;
        const timeRemaining = time - i;
        const traveled = timeRemaining * speed;
        if (traveled > records[idx]) {
          first = i;
          break;
        }
      }

      for (let i = time; i >= 0; i--) {
        const speed = i * 1;
        const timeRemaining = time - i;
        const traveled = timeRemaining * speed;
        if (traveled > records[idx]) {
          last = i;
          break;
        }
      }

      return (last - first + 1) * acc;
    }, 1);
  }

  solvePartTwo() {
    const times: number = Number(this.data[0].match(/\d+/g).join(''));
    const records: number = Number(this.data[1].match(/\d+/g).join(''));

    const res = this.computeRaceTime([times], [records]);
    this.result.emit(res.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
