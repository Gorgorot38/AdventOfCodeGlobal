import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d25',
  templateUrl: './day-y2021-d25.component.html',
  styleUrls: ['./day-y2021-d25.component.scss'],
})
export class DayY2021D25Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  input_data: string[][];
  input_copy: string[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '25' && d.year === '2021'),
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
    this.input_data = this.data
      .filter((i) => i)
      .map((s) => s.replace('\r', ''))
      .map((i) => i.split(''));
    this.copy();
  }

  solvePartOne() {
    this.initVariables();

    let steps = 0;
    while (true) {
      const hasMoved = this.step();
      steps++;
      if (!hasMoved) {
        this.result.emit(steps.toString());
        break;
      }
    }
  }

  solvePartTwo() {
    this.initVariables();

    this.result.emit('');
  }

  private copy() {
    this.input_copy = [];
    this.input_data.forEach((line, y) => this.input_copy.push([...line]));
  }

  private step(): boolean {
    let hasMoved = false;
    this.input_copy.forEach((line, y) =>
      line.forEach((c, x) => {
        if (c === '>' && x === line.length - 1 && line[0] === '.') {
          this.input_data[y][0] = '>';
          this.input_data[y][x] = '.';
          hasMoved = true;
        } else if (c === '>' && line[x + 1] && line[x + 1] === '.') {
          this.input_data[y][x + 1] = '>';
          this.input_data[y][x] = '.';
          hasMoved = true;
        }
      })
    );

    this.copy();

    this.input_copy.forEach((line, y) =>
      line.forEach((c, x) => {
        if (c === 'v' && y === this.input_data.length - 1 && this.input_copy[0][x] === '.') {
          this.input_data[0][x] = 'v';
          this.input_data[y][x] = '.';
          hasMoved = true;
        } else if (c === 'v' && this.input_copy[y + 1] && this.input_copy[y + 1][x] === '.') {
          this.input_data[y + 1][x] = 'v';
          this.input_data[y][x] = '.';
          hasMoved = true;
        }
      })
    );

    this.copy();

    return hasMoved;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
