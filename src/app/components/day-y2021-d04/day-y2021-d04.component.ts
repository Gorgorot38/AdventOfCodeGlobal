import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Bingo } from 'src/app/models/bingo';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d04',
  templateUrl: './day-y2021-d04.component.html',
  styleUrls: ['./day-y2021-d04.component.scss'],
})
export class DayY2021D04Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  boards: Bingo[][][] = [];
  drawnNumbers: string[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '04' && d.year === '2021'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      // Do stuff
    }
  }

  private initVariables() {
    this.boards = [];
    this.drawnNumbers = this.data[0].split(',').filter((v) => v);
    const grids = this.data.filter((v) => v && v.length < 30);
    grids.forEach((v, idx) => {
      if (idx % 5 === 0) {
        const currentBingo: Bingo[][] = [];
        for (let tmpIdx = 0; tmpIdx < 5; tmpIdx++) {
          currentBingo.push(
            grids[idx + tmpIdx]
              .split(' ')
              .filter((c) => c)
              .map((c) => new Bingo(c, false))
          );
        }
        this.boards.push(currentBingo);
      }
    });
  }

  solvePartOne() {
    this.initVariables();

    let winningNum = '';
    for (let num of this.drawnNumbers) {
      this.boards.forEach((board) =>
        board.forEach((line) =>
          line.forEach((v) => {
            if (v.num === num) {
              v.marked = v.num === num;
            }
          })
        )
      );

      if (this.boards.some((b) => this.isCompleted(b))) {
        winningNum = num;
        break;
      }
    }

    const winningBoard = this.boards.find((b) => this.isCompleted(b));
    this.result.emit(
      (
        parseInt(winningNum) *
        winningBoard
          .flat()
          .filter((v) => !v.marked)
          .reduce((a, b) => a + parseInt(b.num), 0)
      ).toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    let winningNum = '';
    for (let num of this.drawnNumbers) {
      this.boards.forEach((board) =>
        board.forEach((line) =>
          line.forEach((v) => {
            if (v.num === num) {
              v.marked = v.num === num;
            }
          })
        )
      );

      if (this.boards.length === 1 && this.boards.some((b) => this.isCompleted(b))) {
        winningNum = num;
        break;
      }
      this.boards = this.boards.filter((b) => !this.isCompleted(b));
    }

    const winningBoard = this.boards.find((b) => this.isCompleted(b));

    this.result.emit(
      (
        parseInt(winningNum) *
        winningBoard
          .flat()
          .filter((v) => !v.marked)
          .reduce((a, b) => a + parseInt(b.num), 0)
      ).toString()
    );
  }

  private isCompleted(board: Bingo[][]): boolean {
    let column = false;
    for (let x = 0; x < board.length; x++) {
      column = board.every((b) => b[x].marked);
      if (column) {
        break;
      }
    }
    const line = board.some((b) => b.every((n) => n.marked));

    return column || line;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
