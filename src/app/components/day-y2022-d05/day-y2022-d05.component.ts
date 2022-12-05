import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { map } from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d05',
  templateUrl: './day-y2022-d05.component.html',
  styleUrls: ['./day-y2022-d05.component.scss'],
})
export class DayY2022D05Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  stacks: Map<number, string[]> = new Map();
  instructions: Instructions[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '05' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.stacks.clear();
    this.instructions = [];

    this.data
      .filter((d) => d)
      .forEach((d) => {
        if (new RegExp('move (\\d+) from (\\d+) to (\\d+)').test(d)) {
          const res = new RegExp('move (\\d+) from (\\d+) to (\\d+)').exec(d);
          this.instructions.push({ cratesToMove: Number(res[1]), destinationStack: Number(res[3]), sourceStack: Number(res[2]) });
        } else if (new RegExp('(\\[[A-Z]\\]| {3}) {0,1}').test(d) && !d.startsWith(' 1')) {
          const matches = [...d.matchAll(new RegExp('(\\[[A-Z]\\]| {3}) {0,1}', 'g'))];
          matches.forEach((match, idx) => {
            if (new RegExp('\\[([A-Z])\\]').test(match[1])) {
              const letter = new RegExp('\\[([A-Z])\\]').exec(match[1])[1];
              if (this.stacks.has(idx + 1)) {
                this.stacks.get(idx + 1).push(letter);
              } else {
                this.stacks.set(idx + 1, [letter]);
              }
            }
          });
        }
      });

    this.stacks.forEach((val) => (val = val.reverse()));
  }

  solvePartOne() {
    this.initVariables();

    this.instructions.forEach((i) => {
      for (let idx = 0; idx < i.cratesToMove; idx++) {
        const toMove = this.stacks.get(i.sourceStack).pop();
        this.stacks.get(i.destinationStack).push(toMove);
      }
    });

    const stackArray = Array.from(this.stacks);
    stackArray.sort((a, b) => a[0] - b[0]);

    this.result.emit(stackArray.map((v) => v[1].pop()).join(''));
  }

  solvePartTwo() {
    this.initVariables();

    this.instructions.forEach((i) => {
      const moved: string[] = [];
      for (let idx = 0; idx < i.cratesToMove; idx++) {
        moved.push(this.stacks.get(i.sourceStack).pop());
      }
      moved.reverse().forEach((m) => this.stacks.get(i.destinationStack).push(m));
    });

    const stackArray = Array.from(this.stacks);
    stackArray.sort((a, b) => a[0] - b[0]);

    this.result.emit(stackArray.map((v) => v[1].pop()).join(''));
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Instructions {
  cratesToMove: number;
  sourceStack: number;
  destinationStack: number;
}
