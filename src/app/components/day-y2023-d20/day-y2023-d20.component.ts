import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d20',
  templateUrl: './day-y2023-d20.component.html',
  styleUrl: './day-y2023-d20.component.scss',
})
export class DayY2023D20Component implements OnInit, OnChanges, OnDestroy {
  @Input()
  data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visitedFaster = new Set<string>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '20' && d.year === '2023'),
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
    this.result.emit();
  }

  solvePartTwo() {
    this.result.emit();
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
