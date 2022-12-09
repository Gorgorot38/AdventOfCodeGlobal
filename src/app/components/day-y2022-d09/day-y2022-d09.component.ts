import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { onlyUnique } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2022-d09',
  templateUrl: './day-y2022-d09.component.html',
  styleUrls: ['./day-y2022-d09.component.scss'],
})
export class DayY2022D09Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  head: Coordinates;
  tail: Coordinates;
  visited: Coordinates[] = [];
  part2Ropes: Coordinates[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '09' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.head = new Coordinates(0, 0);
    this.tail = new Coordinates(0, 0);
    this.visited = [_.cloneDeep(this.tail)];

    this.part2Ropes = [];
    for (let i = 1; i <= 9; i++) {
      this.part2Ropes.push(new Coordinates(0, 0));
    }
  }

  solvePartOne() {
    this.initVariables();

    this.data
      .filter((d) => d)
      .forEach((inst) => {
        const direction = inst.split(' ')[0];
        const moves = Number(inst.split(' ')[1]);

        for (let i = 0; i < moves; i++) {
          this.moveInDirection(direction);
          this.tail.catchUp(this.head);
          this.visited.push(_.cloneDeep(this.tail));
        }
      });
    this.result.emit(
      this.visited
        .map((c) => `x=${c.x}y=${c.y}`)
        .filter(onlyUnique)
        .length.toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    this.data
      .filter((d) => d)
      .forEach((inst) => {
        const direction = inst.split(' ')[0];
        const moves = Number(inst.split(' ')[1]);

        for (let i = 0; i < moves; i++) {
          this.moveInDirection(direction);
          this.part2Ropes[0].catchUp(this.head);
          for (let i = 1; i < this.part2Ropes.length; i++) {
            this.part2Ropes[i].catchUp(this.part2Ropes[i - 1]);
          }
          this.visited.push(_.cloneDeep(this.part2Ropes[this.part2Ropes.length - 1]));
        }
      });
    this.result.emit(
      this.visited
        .map((c) => `x=${c.x}y=${c.y}`)
        .filter(onlyUnique)
        .length.toString()
    );

    return '';
  }

  private moveInDirection(direction: string) {
    switch (direction) {
      case 'R':
        this.head.moveRight();
        break;
      case 'L':
        this.head.moveLeft();
        break;
      case 'U':
        this.head.moveUp();
        break;
      case 'D':
        this.head.moveDown();
        break;
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Coordinates {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  moveUp() {
    this.y++;
  }

  moveDown() {
    this.y--;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  catchUp(c: Coordinates) {
    if (this.areAdjacent(c)) return;
    if (this.x < c.x) {
      this.x++;
    } else if (this.x > c.x) {
      this.x--;
    }
    if (this.y < c.y) {
      this.y++;
    } else if (this.y > c.y) {
      this.y--;
    }
  }

  areAdjacent(c: Coordinates): boolean {
    return Math.abs(c.x - this.x) <= 1 && Math.abs(c.y - this.y) <= 1;
  }
}
