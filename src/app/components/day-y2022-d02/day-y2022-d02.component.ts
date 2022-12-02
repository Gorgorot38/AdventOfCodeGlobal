import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d02',
  templateUrl: './day-y2022-d02.component.html',
  styleUrls: ['./day-y2022-d02.component.scss'],
})
export class DayY2022D02Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '02' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  solvePartOne() {
    this.result.emit(
      this.data
        .filter((d) => d)
        .reduce((prev, curr) => {
          const playArray = curr.split(' ');
          return prev + this.roundOutcomePart1(playArray[0], playArray[1]);
        }, 0)
        .toString()
    );
  }

  solvePartTwo() {
    this.result.emit(
      this.data
        .filter((d) => d)
        .reduce((prev, curr) => {
          const playArray = curr.split(' ');
          return prev + this.roundOutcomePart2(playArray[0], playArray[1]);
        }, 0)
        .toString()
    );
  }

  private roundOutcomePart1(opponent: string, you: string): number {
    const opPlay = this.letterToPlay(opponent);
    const youPlay = this.letterToPlay(you);

    return this.signOutcome(opPlay, youPlay);
  }

  private roundOutcomePart2(opponent: string, you: string): number {
    const opPlay = this.letterToPlay(opponent);
    const outcome = this.letterToOutcome(you);
    const youPlay = this.getSignFromOutcome(opPlay, outcome);

    return this.signOutcome(opPlay, youPlay);
  }

  private letterToPlay(letter: string): PlaySign {
    switch (letter) {
      case 'A':
      case 'X':
        return PlaySign.Rock;
      case 'B':
      case 'Y':
        return PlaySign.Paper;
      case 'C':
      case 'Z':
        return PlaySign.Scissors;
    }
  }

  private letterToOutcome(letter: string): 'win' | 'draw' | 'lose' {
    switch (letter) {
      case 'X':
        return 'lose';
      case 'Y':
        return 'draw';
      case 'Z':
        return 'win';
    }
  }

  private signOutcome(opponent: PlaySign, you: PlaySign) {
    if (you < opponent) {
      if (Math.abs(opponent - you) === 1) {
        return you + 0;
      } else {
        return you + 6;
      }
    } else if (you > opponent) {
      if (Math.abs(opponent - you) === 1) {
        return you + 6;
      } else {
        return you + 0;
      }
    } else {
      return you + 3;
    }
  }

  private getSignFromOutcome(opponent: PlaySign, outcome: 'win' | 'draw' | 'lose') {
    switch (outcome) {
      case 'draw':
        return opponent;
      case 'win':
        return ((opponent + 1) % 4 || 1) as PlaySign;
      case 'lose':
        return ((opponent - 1) % 4 || 3) as PlaySign;
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export enum PlaySign {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}
