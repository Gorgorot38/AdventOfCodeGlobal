import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d21',
  templateUrl: './day-y2021-d21.component.html',
  styleUrls: ['./day-y2021-d21.component.scss'],
})
export class DayY2021D21Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  dice: Queue<number> = new Queue();
  player1: Player;
  player2: Player;
  cache: Map<string, Tuple> = new Map();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '21' && d.year === '2021'),
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
    this.dice = new Queue();
    for (let count = 1; count <= 100; count++) {
      this.dice.enqueue(count);
    }

    this.player1 = new Player(parseInt(this.data[0][this.data[0].length - 1]));
    this.player2 = new Player(parseInt(this.data[1][this.data[1].length - 1]));
  }

  solvePartOne() {
    this.initVariables();

    while (true) {
      let launch = this.launchNTimes(3, this.dice);
      this.player1.play(launch);

      if (this.player1.currentScore >= 1000) {
        return (this.player2.currentScore * this.dice.timeDequeued).toString();
      }

      launch = this.launchNTimes(3, this.dice);
      this.player2.play(launch);

      if (this.player2.currentScore >= 1000) {
        this.result.emit((this.player1.currentScore * this.dice.timeDequeued).toString());
        break;
      }
    }
  }

  solvePartTwo() {
    this.initVariables();

    let winsP1 = 0;
    let winsP2 = 0;
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        for (let k = 1; k <= 3; k++) {
          const wins = this.quantumTurn(
            this.player1.positions.getCurrentPosition(),
            this.player1.currentScore,
            this.player2.positions.getCurrentPosition(),
            this.player2.currentScore,
            i + j + k,
            true
          );
          winsP1 += wins.a;
          winsP2 += wins.b;
        }
      }
    }

    this.result.emit(winsP1 >= winsP2 ? winsP1.toString() : winsP2.toString());
  }

  private quantumTurn(p1Pos: number, p1Score: number, p2Pos: number, p2Score: number, roll: number, player1: boolean): Tuple {
    const win = new Tuple(0, 0);
    if (this.cache.has(this.getTurnKey(player1, roll, p1Pos, p1Score, p2Pos, p2Score))) {
      return this.cache.get(this.getTurnKey(player1, roll, p1Pos, p1Score, p2Pos, p2Score)) as Tuple;
    }

    let currentPos = player1 ? p1Pos : p2Pos;
    let currentScore = player1 ? p1Score : p2Score;

    currentPos = (currentPos + roll) % 10;
    if (currentPos === 0) currentPos = 10;

    currentScore += currentPos;
    if (currentScore >= 21) {
      this.cache.set(this.getTurnKey(player1, roll, p1Pos, p1Score, p2Pos, p2Score), player1 ? new Tuple(1, 0) : new Tuple(0, 1));
      return player1 ? new Tuple(1, 0) : new Tuple(0, 1);
    } else {
      let posP1 = p1Pos;
      let scoreP1 = p1Score;
      let posP2 = p2Pos;
      let scoreP2 = p2Score;
      if (player1) {
        p1Pos = currentPos;
        p1Score = currentScore;
      } else {
        p2Pos = currentPos;
        p2Score = currentScore;
      }

      let win1 = 0;
      let win2 = 0;
      for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
          for (let k = 1; k <= 3; k++) {
            const wins = this.quantumTurn(p1Pos, p1Score, p2Pos, p2Score, i + j + k, !player1);
            win1 += wins.a;
            win2 += wins.b;
          }
        }
      }
      this.cache.set(this.getTurnKey(player1, roll, posP1, scoreP1, posP2, scoreP2), new Tuple(win1, win2));
      return new Tuple(win1, win2);
    }
  }

  private getTurnKey(player1: boolean, roll: number, p1Pos: number, p1Score: number, p2Pos: number, p2Score: number): string {
    return [p1Pos, p1Score, p2Pos, p2Score, player1 ? '1' : '0', roll].join(';');
  }

  private launchNTimes(n: number, queue: Queue<number>): number {
    let result = 0;
    for (let idx = 0; idx < n; idx++) {
      const current = queue.dequeue() as number;
      result += current as number;
      queue.enqueue(current);
    }
    return result;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Player {
  currentScore = 0;
  positions = new Queue<number>();

  constructor(position: number) {
    for (let pos = 1; pos <= 10; pos++) {
      this.positions.enqueue(pos);
    }

    while (this.positions.getCurrentPosition() !== position) {
      this.positions.enqueue(this.positions.dequeue() as number);
    }
  }

  play(amount: number) {
    for (let idx = 0; idx < amount; idx++) {
      this.positions.enqueue(this.positions.dequeue() as number);
    }
    this.currentScore += this.positions.getCurrentPosition();
  }
}

export class Queue<T> {
  private storage: T[] = [];
  timeDequeued: number = 0;

  constructor(private capacity: number = Infinity) {}

  enqueue(item: T): void {
    if (this.size() === this.capacity) {
      throw Error('Queue has reached max capacity, you cannot add more items');
    }
    this.storage.push(item);
  }

  dequeue(): T | undefined {
    this.timeDequeued++;
    return this.storage.shift();
  }

  size(): number {
    return this.storage.length;
  }

  getCurrentPosition(): T {
    return this.storage[0];
  }
}

export class Tuple {
  a: number;
  b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }
}
