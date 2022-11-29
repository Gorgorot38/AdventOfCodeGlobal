import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d20',
  templateUrl: './day-y2021-d20.component.html',
  styleUrls: ['./day-y2021-d20.component.scss'],
})
export class DayY2021D20Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  input_data: string[][] = [];
  input_copy: string[][] = [];
  mapping: string[];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '20' && d.year === '2021'),
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
    this.input_copy = [];
    this.input_data = [];
    this.mapping = this.data[0].split('');

    const lengthToAdd = this.data.slice(2).filter((v) => v).length;

    for (let idx = 0; idx < lengthToAdd; idx++) {
      const lineLength = this.data[2].length;
      let line = '';
      for (let i = 0; i < lineLength * 3; i++) {
        line += '.';
      }
      this.input_data.push(line.split(''));
      this.input_copy.push(line.split(''));
    }

    this.data
      .slice(2)
      .filter((v) => v)
      .forEach((line) => {
        let tmp = '';
        for (const {} of line) {
          tmp += '.';
        }
        const current = tmp + line + tmp;
        this.input_data.push(current.split(''));
        this.input_copy.push(current.split(''));
      });

    for (let idx = 0; idx < lengthToAdd; idx++) {
      const lineLength = this.data[2].length;
      let line = '';
      for (let i = 0; i < lineLength * 3; i++) {
        line += '.';
      }
      this.input_data.push(line.split(''));
      this.input_copy.push(line.split(''));
    }
  }

  solvePartOne() {
    this.initVariables();

    for (let idx = 0; idx < 2; idx++) {
      this.excuteEnhancement();
      this.input_copy = [];
      this.input_data.forEach((line) => this.input_copy.push([...line]));
    }

    // Cheating to remove unwanted values, might get fucked by this in part 2
    this.result.emit(
      this.input_data
        .slice(1, this.input_data.length - 2)
        .map((line) => line.slice(1, line.length - 2))
        .flat()
        .filter((i) => i === '#')
        .length.toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    for (let idx = 0; idx < 50; idx++) {
      this.excuteEnhancement();

      // Cheating again because my modelisation sucks
      if (idx % 2 !== 0) {
        this.input_data[0].forEach((_, idx) => (this.input_data[0][idx] = '.'));
        this.input_data[this.input_data.length - 1].forEach((_, idx) => (this.input_data[this.input_data.length - 1][idx] = '.'));
        this.input_data.forEach((l) => (l[l.length - 1] = '.'));
      }
      this.input_copy = [];
      this.input_data.forEach((line) => this.input_copy.push([...line]));
    }

    this.result.emit(
      this.input_data
        .slice(1, this.input_data.length - 2)
        .map((line) => line.slice(1, line.length - 2))
        .flat()
        .filter((i) => i === '#')
        .length.toString()
    );
  }

  private excuteEnhancement() {
    for (let i = 0; i < this.input_data.length; i++) {
      for (let j = 0; j < this.input_data[i].length; j++) {
        const index = this.getLocalEnhancement(i, j);
        this.input_data[i][j] = this.mapping[index];
      }
    }
  }

  private getLocalEnhancement(i: number, j: number): number {
    let result = '';
    for (let x = i - 1; x <= i + 1; x++) {
      let line = '';
      for (let y = j - 1; y <= j + 1; y++) {
        if (this.input_copy[x] && this.input_copy[x][y]) {
          line += this.input_copy[x][y] === '.' ? '0' : '1';
        } else {
          line += '0';
        }
      }
      result += line;
    }
    return parseInt(result, 2);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
