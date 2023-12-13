import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import clone from 'just-clone';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d13',
  templateUrl: './day-y2023-d13.component.html',
  styleUrl: './day-y2023-d13.component.scss',
})
export class DayY2023D13Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '13' && d.year === '2023'),
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
    const allGrid: string[][] = [];
    let tmpArray: string[] = [];
    for (const line of this.data) {
      if (line) {
        tmpArray.push(line);
      } else {
        allGrid.push(clone(tmpArray));
        tmpArray = [];
      }
    }

    allGrid.push(clone(tmpArray));
    tmpArray = [];

    let vertical = 0;
    let horizontal = 0;
    allGrid.forEach((grid) => {
      for (let idx = 0; idx < grid.length - 1; idx++) {
        if (grid[idx] === grid[idx + 1]) {
          let isSymetrical = true;
          for (let [x, y] = [idx, idx + 1]; x >= 0 && y < grid.length; x--) {
            if (grid[x] !== grid[y]) {
              isSymetrical = false;
              break;
            }
            y++;
          }
          if (isSymetrical) vertical += 100 * (idx + 1);
        }
      }

      for (let idx = 0; idx < grid[0].length - 1; idx++) {
        if (grid.map((l) => l[idx]).join('') === grid.map((l) => l[idx + 1]).join('')) {
          let isSymetrical = true;
          for (let [x, y] = [idx, idx + 1]; x >= 0 && y < grid[0].length; x--) {
            if (grid.map((l) => l[x]).join('') !== grid.map((l) => l[y]).join('')) {
              isSymetrical = false;
              break;
            }
            y++;
          }
          if (isSymetrical) horizontal += idx + 1;
        }
      }
    });
    this.result.emit((horizontal + vertical).toString());
  }

  solvePartTwo() {
    this.result.emit();
  }
  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
