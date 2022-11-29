import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d10',
  templateUrl: './day-y2021-d10.component.html',
  styleUrls: ['./day-y2021-d10.component.scss'],
})
export class DayY2021D10Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  lines: Line[];
  incomplete_lines: Line[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '10' && d.year === '2021'),
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
    this.lines = this.data.filter((v) => v).map((v) => new Line(v));
  }

  solvePartOne() {
    this.initVariables();

    let res = 0;
    const openings = ['(', '[', '<', '{'];
    this.lines.forEach((line) => {
      const opens: string[] = [];
      const chars = line.content.split('');
      for (let char of chars) {
        if (openings.includes(char)) {
          opens.push(char);
        } else {
          const last = opens.pop() as string;
          if (!this.isMatching(last, char)) {
            line.isCorrupted = true;
            res += this.getCorruptedPoints(char);
            break;
          }
        }
      }
      if (!line.isCorrupted) {
        line.isIncomplete = true;
      }
    });
    this.incomplete_lines = this.lines.filter((l) => l.isIncomplete);

    this.result.emit(res.toString());
  }

  solvePartTwo() {
    this.solvePartOne();

    const openings = ['(', '[', '<', '{'];
    const scores: number[] = [];
    this.incomplete_lines.forEach((line) => {
      const opens: string[] = [];
      const chars = line.content.split('');
      chars.forEach((c) => {
        if (openings.includes(c)) {
          opens.push(c);
        } else {
          opens.pop();
        }
      });
      scores.push(
        opens
          .reverse()
          .map((c) => this.getClosingChar(c))
          .reduce((prev, current) => prev * 5 + this.getIncompletePoints(current), 0)
      );
    });

    scores.sort((a, b) => a - b);

    this.result.emit(scores[(scores.length - 1) / 2].toString());
  }

  private isMatching(opening: string, closing: string): boolean {
    switch (opening) {
      case '(':
        return closing === ')';
      case '[':
        return closing === ']';
      case '<':
        return closing === '>';
      case '{':
        return closing === '}';
      default:
        return false;
    }
  }

  private getCorruptedPoints(val: string): number {
    switch (val) {
      case ')':
        return 3;
      case ']':
        return 57;
      case '}':
        return 1197;
      case '>':
        return 25137;
      default:
        return 0;
    }
  }

  private getClosingChar(val: string) {
    switch (val) {
      case '(':
        return ')';
      case '[':
        return ']';
      case '<':
        return '>';
      case '{':
        return '}';
      default:
        return '';
    }
  }

  private getIncompletePoints(val: string): number {
    switch (val) {
      case ')':
        return 1;
      case ']':
        return 2;
      case '}':
        return 3;
      case '>':
        return 4;
      default:
        return 0;
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Line {
  content: string;
  isCorrupted: boolean = false;
  isIncomplete: boolean = false;

  constructor(content: string) {
    this.content = content;
  }
}
