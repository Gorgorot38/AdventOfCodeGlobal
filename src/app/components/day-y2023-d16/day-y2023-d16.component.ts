import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { dumbEquals, getUniqueId } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2023-d16',
  templateUrl: './day-y2023-d16.component.html',
  styleUrl: './day-y2023-d16.component.scss',
})
export class DayY2023D16Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visited = new Map<string, Visited[]>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '16' && d.year === '2023'),
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
    this.visited.clear();
    this.navigate('0;0', Direction.RIGHT);
    const visited = new Set(
      Array.from(this.visited.values())
        .flat()
        .map((v) => v.coordinates),
    );
    this.result.emit(visited.size.toString());
  }

  solvePartTwo() {
    const edges: Visited[] = [];
    for (let x = 0; x < this.data[0].length; x++) {
      edges.push({ coordinates: `${x};0`, direction: Direction.DOWN });
      edges.push({ coordinates: `${x};${this.data.length - 1}`, direction: Direction.UP });
    }

    for (let y = 0; y < this.data.length; y++) {
      edges.push({ coordinates: `0;${y}`, direction: Direction.RIGHT });
      edges.push({ coordinates: `${this.data[0].length - 1};${y}`, direction: Direction.LEFT });
    }

    let res = 0;
    edges.forEach((e) => {
      this.visited.clear();
      this.navigate(e.coordinates, e.direction);
      const tmp = new Set(
        Array.from(this.visited.values())
          .flat()
          .map((v) => v.coordinates),
      ).size;
      if (tmp > res) res = tmp;
    });
    this.result.emit(res.toString());
  }

  navigate(initialPosition: string, direction: Direction) {
    const id = getUniqueId(4);
    this.visited.set(id, []);

    let currentDirection = direction;

    let x = Number(initialPosition.split(';')[0]);
    let y = Number(initialPosition.split(';')[1]);
    while (true) {
      if (x < 0 || y < 0 || x >= this.data[0].length || y >= this.data.length) break;

      const currentVisited = { coordinates: `${x};${y}`, direction: currentDirection };
      if (
        Array.from(this.visited.values())
          .flat()
          .some((v) => dumbEquals(v, currentVisited))
      )
        break;

      this.visited.get(id).push(currentVisited);

      if (this.data[y][x] === '.') {
        ({ y, x } = this.handleThroughDirection(currentDirection, y, x));
      } else if (this.data[y][x] === '|') {
        if (currentDirection === Direction.UP || currentDirection === Direction.DOWN) {
          ({ y, x } = this.handleThroughDirection(currentDirection, y, x));
        } else {
          this.navigate(`${x};${y - 1}`, Direction.UP);
          currentDirection = Direction.DOWN;
          y++;
        }
      } else if (this.data[y][x] === '-') {
        if (currentDirection === Direction.LEFT || currentDirection === Direction.RIGHT) {
          ({ y, x } = this.handleThroughDirection(currentDirection, y, x));
        } else {
          this.navigate(`${x + 1};${y}`, Direction.RIGHT);
          currentDirection = Direction.LEFT;
          x--;
        }
      } else if (this.data[y][x] === '/') {
        if (currentDirection === Direction.RIGHT) {
          currentDirection = Direction.UP;
          y--;
        } else if (currentDirection === Direction.LEFT) {
          currentDirection = Direction.DOWN;
          y++;
        } else if (currentDirection === Direction.DOWN) {
          currentDirection = Direction.LEFT;
          x--;
        } else if (currentDirection === Direction.UP) {
          currentDirection = Direction.RIGHT;
          x++;
        }
      } else if (this.data[y][x] === '\\') {
        if (currentDirection === Direction.RIGHT) {
          currentDirection = Direction.DOWN;
          y++;
        } else if (currentDirection === Direction.LEFT) {
          currentDirection = Direction.UP;
          y--;
        } else if (currentDirection === Direction.DOWN) {
          currentDirection = Direction.RIGHT;
          x++;
        } else if (currentDirection === Direction.UP) {
          currentDirection = Direction.LEFT;
          x--;
        }
      }
    }
  }

  private handleThroughDirection(currentDirection: Direction, y: number, x: number) {
    switch (currentDirection) {
      case Direction.DOWN:
        y++;
        break;
      case Direction.UP:
        y--;
        break;
      case Direction.LEFT:
        x--;
        break;
      case Direction.RIGHT:
        x++;
        break;
    }
    return { y, x };
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

export interface Visited {
  coordinates: string;
  direction: Direction;
}
