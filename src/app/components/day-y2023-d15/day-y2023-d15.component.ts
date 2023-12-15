import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d15',
  templateUrl: './day-y2023-d15.component.html',
  styleUrl: './day-y2023-d15.component.scss',
})
export class DayY2023D15Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '15' && d.year === '2023'),
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
    const res = this.data[0]
      .split(',')
      .map((chunk) => this.computeHash(chunk.split('')))
      .reduce((a, b) => a + b, 0);
    this.result.emit(res.toString());
  }

  solvePartTwo() {
    const map = new Map<number, Map<string, number>>();
    this.data[0].split(',').forEach((chunk) => {
      if (chunk.includes('=')) {
        const label = chunk.split('=')[0];
        const value = Number(chunk.split('=')[1]);
        const hash = this.computeHash(label.split(''));
        if (map.has(hash)) {
          map.get(hash).set(label, value);
        } else {
          map.set(hash, new Map([[label, value]]));
        }
      } else {
        const label = chunk.split('-')[0];
        const subMap = Array.from(map.values()).find((m) => m.has(label));
        if (subMap) subMap.delete(label);
      }
    });

    const res = Array.from(map.entries())
      .filter(([_, val1]) => val1.size > 0)
      .reduce((acc, [key1, val1]) => {
        const values = Array.from(val1.values()).reduce((acc, val, idx) => acc + (key1 + 1) * val * (idx + 1), 0);
        return acc + values;
      }, 0);
    this.result.emit(res.toString());
  }

  computeHash(chars: string[]): number {
    return chars.reduce((acc, char) => ((acc + char.charCodeAt(0)) * 17) % 256, 0);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
