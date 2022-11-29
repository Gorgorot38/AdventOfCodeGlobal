import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d17',
  templateUrl: './day-y2021-d17.component.html',
  styleUrls: ['./day-y2021-d17.component.scss'],
})
export class DayY2021D17Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  target: Area;
  workingVelocities: Point[] = [];
  maxes: number[] = [];
  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '17' && d.year === '2021'),
        takeUntil(this._destroying)
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

  initVariables() {
    const regex = new RegExp('^target area: x=([0-9-]{1,5})..([0-9-]{1,5}), y=([0-9-]{1,5})..([0-9-]{1,5})$').exec(this.data[0]);
    this.target = new Area(parseInt(regex[1]), parseInt(regex[2]), parseInt(regex[3]), parseInt(regex[4]));

    this.workingVelocities = [];
    this.maxes = [];
  }

  solvePartOne() {
    this.initVariables();

    for (let y = 0; y < 1000; y++) {
      for (let x = 0; x < 1000; x++) {
        this.buildVelocityStuff(x, y);
      }
    }
    this.result.emit(Math.max(...this.maxes).toString());
  }

  solvePartTwo() {
    this.initVariables();

    for (let y = -1000; y < 1000; y++) {
      for (let x = -1000; x < 1000; x++) {
        this.buildVelocityStuff(x, y);
      }
    }
    this.result.emit(this.workingVelocities.length.toString());
  }

  buildVelocityStuff(x: number, y: number) {
    const startPoint = new Point(0, 0);
    const startingVelocity = new Point(x, y);
    const velocity = new Point(x, y);
    let maxY = 0;

    while (!startPoint.isInTarget(this.target)) {
      startPoint.x += velocity.x;
      startPoint.y += velocity.y;

      if (startPoint.y > maxY) {
        maxY = startPoint.y;
      }

      if (startPoint.isOutOfTarget(this.target)) {
        break;
      }
      if (startPoint.isInTarget(this.target)) {
        this.workingVelocities.push(startingVelocity);
        this.maxes.push(maxY);
        break;
      }

      if (velocity.x > 0) {
        velocity.x -= 1;
      } else if (velocity.x < 0) {
        velocity.x += 1;
      }
      velocity.y -= 1;
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Area {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.minX = minX;
    this.maxX = maxX;
    this.minY = minY;
    this.maxY = maxY;
  }
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  isInTarget(area: Area) {
    return this.x >= area.minX && this.x <= area.maxX && this.y >= area.minY && this.y <= area.maxY;
  }

  isOutOfTarget(area: Area) {
    return this.x > area.maxX || this.y < area.minY;
  }
}
