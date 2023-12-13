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
    const allGrid = this.buildAllGrids();

    let vertical = 0;
    let horizontal = 0;
    allGrid.forEach((grid) => {
      vertical = this.checkHorizontalSymetry(grid, vertical).direction;
      horizontal = this.checkVerticalSymetry(grid, horizontal).direction;
    });
    this.result.emit((horizontal + vertical).toString());
  }

  private checkVerticalSymetry(grid: string[], horizontal: number, map?: Map<number, string>, index?: number) {
    let hasFound = false;
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
        if (isSymetrical) {
          if (!map) {
            horizontal += idx + 1;
            hasFound = true;
            break;
          }
          if (!map.has(index)) {
            map.set(index, `h${idx};${idx + 1}`);
          } else if (map.get(index) !== `h${idx};${idx + 1}`) {
            horizontal += idx + 1;
            hasFound = true;
            break;
          }
        }
      }
    }
    return { direction: horizontal, hasFound };
  }

  private checkHorizontalSymetry(grid: string[], vertical: number, map?: Map<number, string>, index?: number) {
    let hasFound = false;
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
        if (isSymetrical) {
          if (!map) {
            vertical += 100 * (idx + 1);
            hasFound = true;
            break;
          }
          if (!map.has(index)) {
            map.set(index, `v${idx};${idx + 1}`);
          } else if (map.get(index) !== `v${idx};${idx + 1}`) {
            vertical += 100 * (idx + 1);
            hasFound = true;
            break;
          }
        }
      }
    }
    return { direction: vertical, hasFound };
  }

  private buildAllGrids() {
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
    return allGrid;
  }

  solvePartTwo() {
    const allGrid = this.buildAllGrids();

    let vertical = 0;
    let horizontal = 0;
    const map = new Map<number, string>();
    allGrid.forEach((grid, idx) => {
      this.checkHorizontalSymetry(grid, vertical, map, idx);
      this.checkVerticalSymetry(grid, horizontal, map, idx);
    });

    allGrid.forEach((grid, idx) => {
      let hasFound = false;
      for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid.length; y++) {
          const copyGrid = clone(grid);
          let replacement = '.';
          if (copyGrid[y][x] === '.') {
            replacement = '#';
          }
          copyGrid[y] = this.replaceAt(copyGrid[y], x, replacement);

          const h = this.checkVerticalSymetry(copyGrid, horizontal, map, idx);
          const v = this.checkHorizontalSymetry(copyGrid, vertical, map, idx);
          vertical = v.direction;
          horizontal = h.direction;

          if (h.hasFound || v.hasFound) {
            hasFound = true;
            break;
          }
        }
        if (hasFound) break;
      }
    });
    this.result.emit((horizontal + vertical).toString());
  }

  private replaceAt(str: string, index: number, replacement: string) {
    return str.substring(0, index) + replacement + str.substring(index + replacement.length);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
