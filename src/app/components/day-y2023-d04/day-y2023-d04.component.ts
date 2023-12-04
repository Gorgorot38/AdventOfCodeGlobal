import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d04',
  templateUrl: './day-y2023-d04.component.html',
  styleUrl: './day-y2023-d04.component.scss',
})
export class DayY2023D04Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '04' && d.year === '2023'),
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
    const result = this.data.reduce((acc, current) => {
      const numbers = current.split(':')[1];
      const mine = numbers
        .split('|')[0]
        .trim()
        .split(' ')
        .filter((m) => m);
      const winning = numbers
        .split('|')[1]
        .trim()
        .split(' ')
        .filter((m) => m);
      const res = Math.pow(2, winning.filter((w) => mine.includes(w)).length - 1);
      if (res >= 1) return acc + res;
      return acc;
    }, 0);
    this.result.emit(result.toString());
  }

  solvePartTwo() {
    const map = new Map<Card, number>();
    const cards = this.data.map((d) => {
      const id = d.split(':')[0].match(/\d+/g)[0];
      const numbers = d.split(':')[1];
      const scratched = numbers
        .split('|')[0]
        .trim()
        .split(' ')
        .filter((m) => m);
      const winning = numbers
        .split('|')[1]
        .trim()
        .split(' ')
        .filter((m) => m);
      return new Card(id, scratched, winning);
    });

    cards.forEach((c) => map.set(c, 1));

    map.forEach((val, key) => {
      const ids = key.getCopiedIds();
      ids.forEach((i) => {
        const card = cards.find((c) => c.cardId === i.toString());
        map.set(card, map.get(card) + 1 * val);
      });
    });

    this.result.emit(
      Array.from(map.values())
        .reduce((a, c) => a + c, 0)
        .toString(),
    );
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Card {
  cardId: string;
  scratched: string[];
  winning: string[];

  constructor(cardId: string, scratched: string[], winning: string[]) {
    this.cardId = cardId;
    this.scratched = scratched;
    this.winning = winning;
  }

  getCopiedIds(): number[] {
    const num = this.winning.filter((w) => this.scratched.includes(w)).length;
    if (num < 1) return [];
    const id = Number(this.cardId);
    return Array.from({ length: num }, (_, i) => i + id + 1);
  }
}
