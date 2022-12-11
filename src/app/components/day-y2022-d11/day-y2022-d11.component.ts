import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d11',
  templateUrl: './day-y2022-d11.component.html',
  styleUrls: ['./day-y2022-d11.component.scss'],
})
export class DayY2022D11Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  monkeys: Monkey[] = [];
  supermodulo: number;

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '11' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.monkeys = [];
    const filtered = this.data.filter((d) => d);
    for (let idx = 0; idx < filtered.length; idx = idx + 6) {
      const id = new RegExp('Monkey ([0-9]):').exec(filtered[idx])[1];
      const items = filtered[idx + 1]
        .split('Starting items: ')[1]
        .split(', ')
        .map((i) => Number(i));
      const operation = filtered[idx + 2].split('Operation: new = ')[1];
      const test = new RegExp('([0-9]+)').exec(filtered[idx + 3])[1];
      const trueThrow = new RegExp('([0-9]+)').exec(filtered[idx + 4])[1];
      const falseThrow = new RegExp('([0-9]+)').exec(filtered[idx + 5])[1];
      this.monkeys.push(new Monkey(Number(id), items, operation, Number(test), Number(trueThrow), Number(falseThrow)));
    }

    this.supermodulo = this.monkeys.map((m) => m.test).reduce((prev, curr) => prev * curr, 1);
  }

  solvePartOne() {
    this.initVariables();

    for (let idx = 0; idx < 20; idx++) {
      this.monkeys.forEach((m) => {
        while (m.items.length !== 0) {
          const item = m.inspectNoWorries();
          const monkeyToThrow = this.monkeys.find((mon) => mon.id === m.getMonkeyToThrow(item));
          monkeyToThrow.items.push(item);
        }
      });
    }

    this.result.emit(
      this.monkeys
        .map((m) => m.inspectedItems)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((prev, curr) => prev * curr, 1)
        .toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    for (let idx = 0; idx < 10000; idx++) {
      this.monkeys.forEach((m) => {
        while (m.items.length !== 0) {
          let item = m.inspectWorried(this.supermodulo);
          const monkeyToThrow = this.monkeys.find((mon) => mon.id === m.getMonkeyToThrow(item));
          monkeyToThrow.items.push(item);
        }
      });
    }

    this.result.emit(
      this.monkeys
        .map((m) => m.inspectedItems)
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((prev, curr) => prev * curr, 1)
        .toString()
    );
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Monkey {
  operation: string;
  items: number[] = [];
  id: number;
  test: number;
  trueThrow: number;
  falseThrow: number;
  inspectedItems = 0;

  constructor(id: number, items: number[], operation: string, test: number, trueThrow: number, falseThrow: number) {
    this.id = id;
    this.operation = operation;
    this.test = test;
    this.trueThrow = trueThrow;
    this.falseThrow = falseThrow;
    this.items = items;
  }

  inspectNoWorries(): number {
    this.inspectedItems++;
    const a = this.operation.split(' ');
    const item = this.items.shift();
    const multiplier = Number(a[2]) ? Number(a[2]) : item;
    const worryLevel = a[1] === '+' ? item + multiplier : item * multiplier;
    return Math.floor(worryLevel / 3);
  }

  inspectWorried(modulo: number): number {
    this.inspectedItems++;
    const a = this.operation.split(' ');
    const item = this.items.shift() % modulo;
    const multiplier = Number(a[2]) ? Number(a[2]) : item;
    return a[1] === '+' ? item + multiplier : item * multiplier;
  }

  getMonkeyToThrow(item: number): number {
    if (item % this.test === 0) {
      return this.trueThrow;
    }
    return this.falseThrow;
  }

  reduceWorryLevel(item: number): number {
    if (item % this.test === 0) {
      return this.test;
    }
    return item % this.test;
  }
}
