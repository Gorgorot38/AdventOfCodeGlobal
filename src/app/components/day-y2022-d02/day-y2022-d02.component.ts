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

  initVariables() {}

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

  letterToPlay(letter: string): PlaySign {
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

  letterToOutcome(letter: string): 'win' | 'draw' | 'lose' {
    switch (letter) {
      case 'X':
        return 'lose';
      case 'Y':
        return 'draw';
      case 'Z':
        return 'win';
    }
  }

  getSignFromOutcome(opponent: PlaySign, outcome: 'win' | 'draw' | 'lose'): PlaySign {
    if (outcome === 'win') {
      if (opponent === PlaySign.Paper) {
        return PlaySign.Scissors;
      } else if (opponent === PlaySign.Rock) {
        return PlaySign.Paper;
      } else {
        return PlaySign.Rock;
      }
    } else if (outcome === 'draw') {
      if (opponent === PlaySign.Paper) {
        return PlaySign.Paper;
      } else if (opponent === PlaySign.Rock) {
        return PlaySign.Rock;
      } else {
        return PlaySign.Scissors;
      }
    } else {
      if (opponent === PlaySign.Paper) {
        return PlaySign.Rock;
      } else if (opponent === PlaySign.Rock) {
        return PlaySign.Scissors;
      } else {
        return PlaySign.Paper;
      }
    }
  }

  roundOutcomePart1(opponent: string, you: string): number {
    const opPlay = this.letterToPlay(opponent);
    const youPlay = this.letterToPlay(you);

    return this.signOutcome(opPlay, youPlay);
  }

  roundOutcomePart2(opponent: string, you: string): number {
    const opPlay = this.letterToPlay(opponent);
    const outcome = this.letterToOutcome(you);
    const youPlay = this.getSignFromOutcome(opPlay, outcome);

    return this.signOutcome(opPlay, youPlay);
  }

  signOutcome(opponent: PlaySign, you: PlaySign) {
    if (you === PlaySign.Paper) {
      const played = 2;
      if (opponent === PlaySign.Paper) {
        return played + 3;
      } else if (opponent === PlaySign.Rock) {
        return played + 6;
      } else {
        return played;
      }
    } else if (you === PlaySign.Rock) {
      const played = 1;
      if (opponent === PlaySign.Paper) {
        return played + 0;
      } else if (opponent === PlaySign.Rock) {
        return played + 3;
      } else {
        return played + 6;
      }
    } else {
      const played = 3;
      if (opponent === PlaySign.Paper) {
        return played + 6;
      } else if (opponent === PlaySign.Rock) {
        return played + 0;
      } else {
        return played + 3;
      }
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export enum PlaySign {
  Rock,
  Paper,
  Scissors,
}
