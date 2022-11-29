import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d24',
  templateUrl: './day-y2021-d24.component.html',
  styleUrls: ['./day-y2021-d24.component.scss'],
})
export class DayY2021D24Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  input_data: string[];
  toCheck: Analysed[] = [];
  stack: Result[] = [];
  result_output: number[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '24' && d.year === '2021'),
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

  initVariables() {
    this.toCheck = [];
    this.stack = [];
    this.result_output = [];
    this.input_data = this.data.filter((i) => i).map((s) => s.replace('\r', ''));
    this.input_data.forEach((_, i) => {
      if (i % 18 === 0) {
        const a = new Analysed();
        a.check = parseInt(this.input_data[i + 5].split(' ')[2]);
        a.offset = parseInt(this.input_data[i + 15].split(' ')[2]);
        this.toCheck.push(a);
      }
    });
  }

  solvePartOne() {
    this.initVariables();

    for (let idx = 0; idx < 14; idx++) {
      if (this.toCheck[idx].check > 0) {
        this.stack.push(new Result(idx, this.toCheck[idx].offset));
      } else {
        const last = this.stack.pop();
        const modifier = last.value + this.toCheck[idx].check;
        if (modifier >= 0) {
          this.result_output[last.index] = 9 - Math.abs(modifier);
          this.result_output[idx] = 9;
        } else {
          this.result_output[idx] = 9 - Math.abs(modifier);
          this.result_output[last.index] = 9;
        }
      }
    }

    this.result.emit(this.result_output.join(''));
  }

  solvePartTwo() {
    this.initVariables();

    for (let idx = 0; idx < 14; idx++) {
      if (this.toCheck[idx].check > 0) {
        this.stack.push(new Result(idx, this.toCheck[idx].offset));
      } else {
        const last = this.stack.pop();
        const modifier = last.value + this.toCheck[idx].check;
        if (modifier >= 0) {
          this.result_output[last.index] = 1;
          this.result_output[idx] = 1 + Math.abs(modifier);
        } else {
          this.result_output[idx] = 1;
          this.result_output[last.index] = 1 + Math.abs(modifier);
        }
      }
    }

    this.result.emit(this.result_output.join(''));
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Analysed {
  check = 0;
  offset = 0;
}

export class Result {
  index: number;
  value: number;
  constructor(i: number, v: number) {
    this.index = i;
    this.value = v;
  }
}
