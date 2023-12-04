import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d03',
  templateUrl: './day-y2023-d03.component.html',
  styleUrl: './day-y2023-d03.component.scss',
})
export class DayY2023D03Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '03' && d.year === '2023'),
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
    const allPositions = this.getAllPositions();

    const result = allPositions
      .filter((ap) => {
        let hasSymbol = false;
        for (let x = ap[0].x - 1; x < ap[ap.length - 1].x + 2; x++) {
          for (let y = ap[0].y - 1; y < ap[ap.length - 1].y + 2; y++) {
            const line = this.data[y];
            const char = line ? line[x] : undefined;
            if (char && !/\d/.test(char) && char !== '.') hasSymbol = true;
          }
        }
        return hasSymbol;
      })
      .reduce((acc, current) => Number(current.map((c) => c.num).join('')) + acc, 0);

    this.result.emit(result.toString());
  }

  solvePartTwo() {
    const allPositions = this.getAllPositions();
    const assumedGears = this.data
      .map((d, idx) => {
        const indices = this.getAllIndexesOf(d, '*');
        if (indices.length > 0) return indices.map((i) => ({ num: '*', x: i, y: idx } as Engine));
        return undefined;
      })
      .flat()
      .filter((g) => g);

    const result = assumedGears
      .map((g) => {
        const engines = new Set<Engine[]>();
        for (let x = g.x - 1; x < g.x + 2; x++) {
          for (let y = g.y - 1; y < g.y + 2; y++) {
            const line = this.data[y];
            const char = line ? line[x] : undefined;
            if (/\d/.test(char)) {
              engines.add(allPositions.find((ap) => ap.some((p) => p.x === x && p.y === y)));
            }
          }
        }
        return engines;
      })
      .reduce((acc, current) => {
        if (current.size === 2) {
          return (
            acc +
            Array.from(current.values())
              .map((v) => Number(v.map((e) => e.num).join('')))
              .reduce((mul, c) => c * mul, 1)
          );
        }
        return acc;
      }, 0);

    this.result.emit(result.toString());
  }

  getAllIndexesOf(str: string, char: string) {
    const indices: number[] = [];
    for (let i = 0; i < str.length; i++) {
      if (str[i] === char) indices.push(i);
    }

    return indices;
  }

  getAllPositions() {
    const allPositions: Engine[][] = [];
    this.data.forEach((l, idx) => {
      const positions: Engine[] = [];
      for (let w = 0; w < l.length; w++) {
        if (!/\d/.test(l[w])) {
          if (positions.length > 0) allPositions.push(JSON.parse(JSON.stringify(positions)));
          positions.length = 0;
        } else {
          positions.push({ num: l[w], x: w, y: idx });
          if (w === l.length - 1 && positions.length > 0) {
            allPositions.push(JSON.parse(JSON.stringify(positions)));
            positions.length = 0;
          }
        }
      }
    });
    return allPositions;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export interface Engine {
  num: string;
  x: number;
  y: number;
}
