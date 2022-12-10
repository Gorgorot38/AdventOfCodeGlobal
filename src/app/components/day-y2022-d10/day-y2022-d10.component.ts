import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d10',
  templateUrl: './day-y2022-d10.component.html',
  styleUrls: ['./day-y2022-d10.component.scss'],
})
export class DayY2022D10Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  states: number[] = [];
  drawing: string[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '10' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVarialbes() {
    this.states = [];
    this.drawing = [];
  }

  solvePartOne() {
    this.initVarialbes();

    let register = 1;
    let cycle = 1;
    this.data
      .filter((d) => d)
      .forEach((inst) => {
        if (!inst.startsWith('noop')) {
          if (this.checkCycle20(cycle)) this.states.push(cycle * register);
          cycle++;
          if (this.checkCycle20(cycle)) this.states.push(cycle * register);
          cycle++;
          register += Number(inst.split(' ')[1]);
        } else {
          if (this.checkCycle20(cycle)) this.states.push(cycle * register);
          cycle++;
        }
      });

    this.result.emit(this.states.reduce((prev, curr) => prev + curr, 0).toString());
  }

  private checkCycle20(cycle: number): boolean {
    return (cycle - 20) % 40 === 0;
  }

  private checkCycle40(cycle: number): boolean {
    return cycle % 40 === 0;
  }

  solvePartTwo() {
    this.initVarialbes();

    let register = 1;
    let cycle = 1;
    const line: string[] = [];
    this.data
      .filter((d) => d)
      .forEach((inst) => {
        if (!inst.startsWith('noop')) {
          this.drawPixel(line, register);
          this.drawLine(cycle, line);
          cycle++;
          this.drawPixel(line, register);
          this.drawLine(cycle, line);
          cycle++;
          register += Number(inst.split(' ')[1]);
        } else {
          this.drawPixel(line, register);
          this.drawLine(cycle, line);
          cycle++;
        }
      });

    this.result.emit(this.drawing.map((l) => l.join('')).join('\r\n'));
  }

  drawLine(cycle: number, line: string[]) {
    if (this.checkCycle40(cycle)) {
      this.drawing.push(_.cloneDeep(line));
      line.length = 0;
    }
  }

  drawPixel(line: string[], register: number) {
    const range = [register - 1, register, register + 1];
    const newIndex = line.length;
    if (range.includes(newIndex)) {
      line.push('#');
    } else {
      line.push('.');
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
