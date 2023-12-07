import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d07',
  templateUrl: './day-y2023-d07.component.html',
  styleUrl: './day-y2023-d07.component.scss',
})
export class DayY2023D07Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '07' && d.year === '2023'),
        takeUntil(this._destroying),
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

  solvePartOne() {
    const hands = this.data.map((d) => new Hand(d.split(' ')[0], Number(d.split(' ')[1]))).sort((a, b) => a.compare(b));
    const res = hands.reduce((acc, current, idx) => acc + current.bid * (idx + 1), 0);
    this.result.emit(res.toString());
  }

  solvePartTwo() {
    const hands = this.data.map((d) => new Hand(d.split(' ')[0], Number(d.split(' ')[1]))).sort((a, b) => a.compare(b, true));
    const res = hands.reduce((acc, current, idx) => acc + current.bid * (idx + 1), 0);
    this.result.emit(res.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Hand {
  hand: string;
  bid: number;

  handCount: Map<string, number>;
  betterHandCount: Map<string, number>;

  constructor(hand: string, bid: number) {
    this.hand = hand;
    this.bid = bid;

    this.handCount = hand.split('').reduce((acc, current) => {
      if (acc.has(current)) acc.set(current, acc.get(current) + 1);
      else acc.set(current, 1);
      return acc;
    }, new Map<string, number>());

    this.betterHandCount = this.buildStrongerHand()
      .split('')
      .reduce((acc, current) => {
        if (acc.has(current)) acc.set(current, acc.get(current) + 1);
        else acc.set(current, 1);
        return acc;
      }, new Map<string, number>());
  }

  buildStrongerHand() {
    if (!this.hand.includes('J')) return this.hand;
    if (this.hand === 'JJJJJ') return 'AAAAA';
    const bestLetter = Array.from(this.handCount.entries())
      .sort((a, b) => {
        if (b[1] - a[1] === 0) return ORDER.indexOf(b[0]) - ORDER.indexOf(a[0]);
        return b[1] - a[1];
      })
      .find((l) => l[0] !== 'J')[0];

    return this.hand.replaceAll('J', bestLetter);
  }

  compare(otherHand: Hand, better: boolean = false): number {
    const pointOne = this.getHandType(better ? this.betterHandCount : this.handCount);
    const pointTwo = otherHand.getHandType(better ? otherHand.betterHandCount : otherHand.handCount);
    const handType = pointOne.rank - pointTwo.rank;
    if (handType === 0) {
      return this.compareHauteur(otherHand, better);
    }
    return handType;
  }

  isPair(map: Map<string, number>): Point {
    const entryTwo = Array.from(map.entries()).filter(([_, val]) => val === 2);
    if (entryTwo.length === 1 && !this.isFull(map).value) return { cards: entryTwo.map((e) => e[0]), rank: 1, value: true };
    return { value: false, rank: -1 };
  }
  isDoublePair(map: Map<string, number>): Point {
    const entryTwo = Array.from(map.entries()).filter(([_, val]) => val === 2);
    if (entryTwo.length === 2) return { cards: entryTwo.map((e) => e[0]), rank: 2, value: true };
    return { value: false, rank: -1 };
  }
  isBrelan(map: Map<string, number>): Point {
    const entryThree = Array.from(map.entries()).find(([_, val]) => val === 3);
    const entryTwo = Array.from(map.entries()).find(([_, val]) => val === 2);
    if (entryThree && !entryTwo) return { cards: [entryThree[0]], rank: 3, value: true };
    return { value: false, rank: -1 };
  }
  isCarre(map: Map<string, number>): Point {
    const entry = Array.from(map.entries()).find(([_, val]) => val === 4);
    if (entry) return { cards: [entry[0]], rank: 5, value: true };
    return { value: false, rank: -1 };
  }
  isCheating(map: Map<string, number>): Point {
    const entry = Array.from(map.entries()).find(([_, val]) => val === 5);
    if (entry) return { cards: [entry[0]], rank: 6, value: true };
    return { value: false, rank: -1 };
  }
  isFull(map: Map<string, number>): Point {
    const entryThree = Array.from(map.entries()).find(([_, val]) => val === 3);
    const entryTwo = Array.from(map.entries()).find(([_, val]) => val === 2);
    if (entryThree && entryTwo) return { cards: [entryThree[0], entryTwo[0]], rank: 4, value: true };
    return { value: false, rank: -1 };
  }

  getHandType(map: Map<string, number>): Point {
    let point = this.isCheating(map);
    if (point.value) return point;
    point = this.isCarre(map);
    if (point.value) return point;
    point = this.isFull(map);
    if (point.value) return point;
    point = this.isBrelan(map);
    if (point.value) return point;
    point = this.isDoublePair(map);
    if (point.value) return point;
    point = this.isPair(map);
    if (point.value) return point;
    return { value: true, rank: 0, cards: this.hand.split('') };
  }

  compareHauteur(otherHand: Hand, better: boolean) {
    for (let idx = 0; idx < otherHand.hand.length; idx++) {
      const indexOne = (better ? NEW_ORDER : ORDER).indexOf(this.hand[idx]);
      const indexTwo = (better ? NEW_ORDER : ORDER).indexOf(otherHand.hand[idx]);
      if (indexTwo - indexOne !== 0) {
        return indexTwo - indexOne;
      }
    }

    return 0;
  }
}

export interface Point {
  rank: number;
  cards?: string[];
  value: boolean;
}

export const ORDER: string[] = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];
export const NEW_ORDER: string[] = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];
