import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import clone from 'just-clone';

@Component({
  selector: 'app-day-y2023-d10',
  templateUrl: './day-y2023-d10.component.html',
  styleUrl: './day-y2023-d10.component.scss',
})
export class DayY2023D10Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '10' && d.year === '2023'),
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
    const startY = this.data.findIndex((d) => d.includes('S'));
    const startX = this.data[startY].indexOf('S');
    let step = 0;

    let y = startY;
    let x = startX;

    let previousStep = new Pipe(this.data[y][x], x, y, 'from');

    while (true) {
      step++;
      const current = new Pipe(this.data[y][x], x, y, 'from');
      const left = new Pipe(this.data[y][x - 1] ?? '.', x - 1, y, 'left');
      const right = new Pipe(this.data[y][x + 1] ?? '.', x + 1, y, 'right');
      const top = new Pipe(this.data[y - 1] ? this.data[y - 1][x] : '.', x, y - 1, 'top');
      const bottom = new Pipe(this.data[y + 1] ? this.data[y + 1][x] : '.', x, y + 1, 'bottom');

      if (current.isConnectedTo(left) && !left.isEqual(previousStep)) {
        x--;
      } else if (current.isConnectedTo(right) && !right.isEqual(previousStep)) {
        x++;
      } else if (current.isConnectedTo(top) && !top.isEqual(previousStep)) {
        y--;
      } else if (current.isConnectedTo(bottom) && !bottom.isEqual(previousStep)) {
        y++;
      }

      previousStep = clone(current);

      if (x === startX && y === startY) break;
    }

    this.result.emit((step / 2).toString());
  }

  solvePartTwo() {
    const vertices: Point[] = [];
    const startY = this.data.findIndex((d) => d.includes('S'));
    const startX = this.data[startY].indexOf('S');
    let step = 0;

    let y = startY;
    let x = startX;

    let previousStep = new Pipe(this.data[y][x], x, y, 'from');

    while (true) {
      step++;
      const current = new Pipe(this.data[y][x], x, y, 'from');
      const left = new Pipe(this.data[y][x - 1] ?? '.', x - 1, y, 'left');
      const right = new Pipe(this.data[y][x + 1] ?? '.', x + 1, y, 'right');
      const top = new Pipe(this.data[y - 1] ? this.data[y - 1][x] : '.', x, y - 1, 'top');
      const bottom = new Pipe(this.data[y + 1] ? this.data[y + 1][x] : '.', x, y + 1, 'bottom');

      vertices.push({ x: x, y: y });

      if (current.isConnectedTo(left) && !left.isEqual(previousStep)) {
        x--;
      } else if (current.isConnectedTo(right) && !right.isEqual(previousStep)) {
        x++;
      } else if (current.isConnectedTo(top) && !top.isEqual(previousStep)) {
        y--;
      } else if (current.isConnectedTo(bottom) && !bottom.isEqual(previousStep)) {
        y++;
      }

      previousStep = clone(current);

      if (x === startX && y === startY) break;
    }

    const res = this.data.reduce((acc, current, idxY) => {
      const toAdd = current.split('').reduce((acc2, current2, idxX) => {
        if (vertices.every((p) => p.x !== idxX || p.y !== idxY) && this.pointInPolygon({ x: idxX, y: idxY }, vertices)) {
          return acc2 + 1;
        }
        return acc2;
      }, 0);
      return acc + toAdd;
    }, 0);

    this.result.emit(res.toString());
  }

  cross(x: Point, y: Point, z: Point): number {
    return (y.x - x.x) * (z.y - x.y) - (z.x - x.x) * (y.y - x.y);
  }

  pointInPolygon(p: Point, points: Array<Point>): boolean {
    let wn = 0; // winding number

    points.forEach((a, i) => {
      const b = points[(i + 1) % points.length];
      if (a.y <= p.y) {
        if (b.y > p.y && this.cross(a, b, p) > 0) {
          wn += 1;
        }
      } else if (b.y <= p.y && this.cross(a, b, p) < 0) {
        wn -= 1;
      }
    });

    return wn !== 0;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Point {
  x: number;
  y: number;
}

export class Pipe {
  letter: string;
  isLeft: boolean = false;
  isTop: boolean = false;
  isRight: boolean = false;
  isBottom: boolean = false;

  position: 'left' | 'right' | 'top' | 'bottom' | 'from';

  x: number;
  y: number;

  constructor(letter: string, x: number, y: number, position: 'left' | 'right' | 'top' | 'bottom' | 'from') {
    this.letter = letter;
    this.x = x;
    this.y = y;
    this.position = position;

    switch (letter) {
      case '-':
        this.isLeft = true;
        this.isRight = true;
        break;
      case '7':
        this.isLeft = true;
        this.isBottom = true;
        break;
      case 'F':
        this.isBottom = true;
        this.isRight = true;
        break;
      case 'J':
        this.isLeft = true;
        this.isTop = true;
        break;
      case 'L':
        this.isTop = true;
        this.isRight = true;
        break;
      case '|':
        this.isTop = true;
        this.isBottom = true;
        break;
      case 'S':
        this.isTop = true;
        this.isBottom = true;
        this.isRight = true;
        this.isLeft = true;
        break;
    }
  }

  isConnectedTo(pipe: Pipe) {
    switch (pipe.position) {
      case 'bottom':
        return pipe.isTop && this.isBottom;
      case 'top':
        return pipe.isBottom && this.isTop;
      case 'left':
        return pipe.isRight && this.isLeft;
      case 'right':
        return pipe.isLeft && this.isRight;
      default:
        return false;
    }
  }

  isEqual(pipe: Pipe) {
    return this.x === pipe.x && this.y === pipe.y && this.letter === pipe.letter;
  }
}
