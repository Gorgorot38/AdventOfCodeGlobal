import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d02',
  templateUrl: './day-y2023-d02.component.html',
  styleUrls: ['./day-y2023-d02.component.scss'],
})
export class DayY2023D02Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '02' && d.year === '2023'),
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
    const limit: Colors[] = [
      { color: 'blue', quantity: 14 },
      { color: 'red', quantity: 12 },
      { color: 'green', quantity: 13 },
    ];
    const result = this.data
      .filter((l) => l)
      .reduce((acc, l) => {
        const gameId = Number(l.match(/Game \d+/g)[0].split(' ')[1]);
        const colors = l.match(/(\d+) (blue|red|green)/g).map((m) => ({ color: m.split(' ')[1], quantity: Number(m.split(' ')[0]) } as Colors));
        if (colors.some((c) => c.quantity > limit.find((li) => li.color === c.color).quantity)) {
          return acc;
        }
        return acc + gameId;
      }, 0);
    this.result.emit(result.toString());
  }

  solvePartTwo() {
    const result = this.data
      .filter((l) => l)
      .reduce((acc, l) => {
        const colors = l.match(/(\d+) (blue|red|green)/g).map((m) => ({ color: m.split(' ')[1], quantity: Number(m.split(' ')[0]) } as Colors));
        const maxBlue = _.sortBy(
          colors.filter((c) => c.color === 'blue'),
          (c) => c.quantity,
        ).reverse()[0].quantity;
        const maxGreen = _.sortBy(
          colors.filter((c) => c.color === 'green'),
          (c) => c.quantity,
        ).reverse()[0].quantity;
        const maxRed = _.sortBy(
          colors.filter((c) => c.color === 'red'),
          (c) => c.quantity,
        ).reverse()[0].quantity;

        return acc + maxBlue * maxGreen * maxRed;
      }, 0);
    this.result.emit(result.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export interface Colors {
  color: Color;
  quantity: number;
}

export type Color = 'blue' | 'red' | 'green';
