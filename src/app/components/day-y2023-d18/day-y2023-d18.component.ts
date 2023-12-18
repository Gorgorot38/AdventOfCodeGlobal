import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { calculatePolygonArea } from 'src/app/utils/utils';
import { Point } from '../day-y2021-d13/day-y2021-d13.component';

@Component({
  selector: 'app-day-y2023-d18',
  templateUrl: './day-y2023-d18.component.html',
  styleUrl: './day-y2023-d18.component.scss',
})
export class DayY2023D18Component implements OnInit, OnChanges, OnDestroy {
  @Component({
    selector: 'app-day-y2023-d17',
    templateUrl: './day-y2023-d17.component.html',
    styleUrl: './day-y2023-d17.component.scss',
  })
  @Input()
  data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visitedFaster = new Set<string>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '18' && d.year === '2023'),
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
    const points: Point[] = [];
    this.buildPoints(points, 0, 0);

    const { inside, onEdges } = countPointsInPolygon(points);

    this.result.emit((inside + onEdges).toString());
  }

  private buildPoints(points: Point[], startingX: number, startingY: number, isPart2?: boolean) {
    let x = startingX;
    let y = startingY;
    points.push({ x: startingX, y: startingY });
    this.data.forEach((line) => {
      const { dir, steps } = isPart2 ? this.computeDirectionAndStepsPart2(line) : this.computeDirectionAndStepsPart1(line);
      if (dir === Direction.R) {
        x += steps;
      } else if (dir === Direction.L) {
        x -= steps;
      } else if (dir === Direction.U) {
        y += steps;
      } else if (dir === Direction.D) {
        y -= steps;
      }

      points.push({ x, y });
    });
  }

  private computeDirectionAndStepsPart2(line: string) {
    const hex = /#([a-z\d]{5})(\d)/.exec(line);
    const dir: Direction = Number(hex[2]);
    const steps = parseInt(hex[1], 16);
    return { dir, steps };
  }

  private computeDirectionAndStepsPart1(line: string) {
    let dir: Direction;
    switch (line[0]) {
      case 'R':
        dir = Direction.R;
        break;
      case 'L':
        dir = Direction.L;
        break;
      case 'U':
        dir = Direction.U;
        break;
      case 'D':
        dir = Direction.D;
        break;
    }
    return { dir, steps: Number(/\d+/.exec(line)[0]) };
  }

  solvePartTwo() {
    const points: Point[] = [];
    this.buildPoints(points, 0, 0, true);

    const { inside, onEdges } = countPointsInPolygon(points);

    this.result.emit((inside + onEdges).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

enum Direction {
  R = 0,
  D = 1,
  L = 2,
  U = 3,
}

// Function to calculate the number of points inside the polygon and on its edges
function countPointsInPolygon(vertices: Point[]): { inside: number; onEdges: number } {
  let inside = 0;
  let onEdges = 0;

  const n = vertices.length;

  // Calculate the area using Pick's Theorem
  const area = calculatePolygonArea(vertices);

  // Calculate the number of lattice points on the boundary
  for (let i = 0; i < n - 1; i++) {
    onEdges += Math.abs(vertices[i + 1].x - vertices[i].x) + Math.abs(vertices[i + 1].y - vertices[i].y);
  }
  onEdges += Math.abs(vertices[n - 1].x - vertices[0].x) + Math.abs(vertices[n - 1].y - vertices[0].y);

  // Calculate the number of interior lattice points
  inside = area - onEdges / 2 + 1;

  return { inside, onEdges };
}
