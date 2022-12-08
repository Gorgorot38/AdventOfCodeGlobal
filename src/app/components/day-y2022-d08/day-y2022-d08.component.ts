import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d08',
  templateUrl: './day-y2022-d08.component.html',
  styleUrls: ['./day-y2022-d08.component.scss'],
})
export class DayY2022D08Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  grid: string[][] = [];

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '08' && d.year === '2022'),
        takeUntil(this._destroying),
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.grid = this.data.filter((d) => d).map((d) => d.split(''));
  }

  solvePartOne() {
    this.initVariables();

    const map = new Map<string, Visible>();
    for (let j = 0; j < this.grid.length; j++) {
      for (let i = 0; i < this.grid[j].length; i++) {
        this.checkVisible(i, j, map);
      }
    }

    this.result.emit(
      Array.from(map.values())
        .filter((v) => v.visibleBottom || v.visibleLeft || v.visibleRight || v.visibleTop)
        .length.toString(),
    );
  }

  private checkVisible(i: number, j: number, map: Map<string, Visible>) {
    // Case Top Bottom
    if (j === 0) {
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleTop: true });
    } else if (j === this.grid.length - 1) {
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleBottom: true });
    } else {
      const val = Number(this.grid[j][i]);
      let visible = true;
      for (let idx = 0; idx < j; idx++) {
        if (Number(this.grid[idx][i]) >= val) {
          visible = false;
          break;
        }
      }
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleTop: visible });

      visible = true;
      for (let idx = j + 1; idx < this.grid.length; idx++) {
        if (Number(this.grid[idx][i]) >= val) {
          visible = false;
          break;
        }
      }
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleBottom: visible });
    }

    // Case Left Right
    if (i === 0) {
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleLeft: true });
    } else if (i === this.grid[j].length - 1) {
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleRight: true });
    } else {
      const val = Number(this.grid[j][i]);
      let visible = true;
      for (let idx = 0; idx < i; idx++) {
        if (Number(this.grid[j][idx]) >= val) {
          visible = false;
          break;
        }
      }
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleLeft: visible });

      visible = true;
      for (let idx = i + 1; idx < this.grid[j].length; idx++) {
        if (Number(this.grid[j][idx]) >= val) {
          visible = false;
          break;
        }
      }
      this.setMapVisible(`i=${i}j=${j}`, map, { visibleRight: visible });
    }
  }

  private setMapVisible(key: string, map: Map<string, Visible>, visible: Visible) {
    if (map.has(key)) {
      const v = map.get(key);
      Object.keys(visible).forEach((k) => (v[k] = v[k] || visible[k]));
    } else {
      map.set(key, visible);
    }
  }

  solvePartTwo() {
    this.initVariables();

    const map = new Map<string, number>();
    for (let j = 0; j < this.grid.length; j++) {
      for (let i = 0; i < this.grid[j].length; i++) {
        this.checkDistance(i, j, map);
      }
    }

    this.result.emit(
      Array.from(map.values())
        .sort((a, b) => b - a)[0]
        .toString(),
    );
  }

  private checkDistance(i: number, j: number, map: Map<string, number>) {
    // Case Top Bottom
    if (j === 0 || j === this.grid.length - 1 || i === 0 || i === this.grid[j].length - 1) {
      this.setMapDistance(`i=${i}j=${j}`, map, 0);
    } else {
      const val = Number(this.grid[j][i]);
      let visible = true;
      // Top
      for (let idx = j - 1; idx >= 0; idx--) {
        if (Number(this.grid[idx][i]) >= val) {
          visible = false;
          this.setMapDistance(`i=${i}j=${j}`, map, j - idx);
          break;
        }
      }
      if (visible) {
        this.setMapDistance(`i=${i}j=${j}`, map, j);
      }

      // Bottom
      visible = true;
      for (let idx = j + 1; idx < this.grid.length; idx++) {
        if (Number(this.grid[idx][i]) >= val) {
          visible = false;
          this.setMapDistance(`i=${i}j=${j}`, map, idx - j);
          break;
        }
      }
      if (visible) {
        this.setMapDistance(`i=${i}j=${j}`, map, this.grid.length - 1 - j);
      }

      // Left
      visible = true;
      for (let idx = i - 1; idx >= 0; idx--) {
        if (Number(this.grid[j][idx]) >= val) {
          visible = false;
          this.setMapDistance(`i=${i}j=${j}`, map, i - idx);
          break;
        }
      }
      if (visible) {
        this.setMapDistance(`i=${i}j=${j}`, map, i);
      }

      // Right
      visible = true;
      for (let idx = i + 1; idx < this.grid[j].length; idx++) {
        if (Number(this.grid[j][idx]) >= val) {
          visible = false;
          this.setMapDistance(`i=${i}j=${j}`, map, idx - i);
          break;
        }
      }
      if (visible) {
        this.setMapDistance(`i=${i}j=${j}`, map, this.grid[j].length - 1 - i);
      }
    }
  }

  private setMapDistance(key: string, map: Map<string, number>, distance: number) {
    if (map.has(key)) {
      map.set(key, map.get(key) * distance);
    } else {
      map.set(key, distance);
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Visible {
  visibleLeft?: boolean;
  visibleTop?: boolean;
  visibleRight?: boolean;
  visibleBottom?: boolean;
}
