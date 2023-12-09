import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import clone from 'just-clone';

@Component({
  selector: 'app-day-y2023-d09',
  templateUrl: './day-y2023-d09.component.html',
  styleUrl: './day-y2023-d09.component.scss',
})
export class DayY2023D09Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '09' && d.year === '2023'),
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
    const res = this.data.reduce((acc, d) => {
      const allSequences: number[][] = [];
      let currentSequence = d.split(' ').map((n) => Number(n));
      allSequences.push(clone(currentSequence));
      while (currentSequence.some((c) => c !== 0)) {
        currentSequence = currentSequence.reduce((acc, current, idx) => {
          if (idx === currentSequence.length - 1) return acc;
          acc.push(currentSequence[idx + 1] - current);
          return acc;
        }, [] as number[]);
        allSequences.push(clone(currentSequence));
      }

      while (allSequences.length > 1) {
        const seq = allSequences.pop();
        const previousSeq = allSequences[allSequences.length - 1];
        previousSeq.push(previousSeq[previousSeq.length - 1] + seq.pop());
      }

      return acc + allSequences[0].pop();
    }, 0);
    this.result.emit(res.toString());
  }

  solvePartTwo() {
    const res = this.data.reduce((acc, d) => {
      const allSequences: number[][] = [];
      let currentSequence = d.split(' ').map((n) => Number(n));
      allSequences.push(clone(currentSequence));
      while (currentSequence.some((c) => c !== 0)) {
        currentSequence = currentSequence.reduce((acc, current, idx) => {
          if (idx === currentSequence.length - 1) return acc;
          acc.push(currentSequence[idx + 1] - current);
          return acc;
        }, [] as number[]);
        allSequences.push(clone(currentSequence));
      }

      while (allSequences.length > 1) {
        const seq = allSequences.pop();
        const previousSeq = allSequences[allSequences.length - 1];
        previousSeq.unshift(previousSeq[0] - seq.shift());
      }

      return acc + allSequences[0].shift();
    }, 0);

    this.result.emit(res.toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
