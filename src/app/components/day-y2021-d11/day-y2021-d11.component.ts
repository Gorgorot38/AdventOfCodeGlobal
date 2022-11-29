import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d11',
  templateUrl: './day-y2021-d11.component.html',
  styleUrls: ['./day-y2021-d11.component.scss'],
})
export class DayY2021D11Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  octopuses: Octopus[][];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '11' && d.year === '2021'),
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
    this.octopuses = this.data.map((v) => v.split('').map((i) => new Octopus(parseInt(i))));
  }

  solvePartOne() {
    this.initVariables();

    for (let step = 0; step < 100; step++) {
      this.octopuses.forEach((line) =>
        line.forEach((o) => {
          o.flashValue++;
          o.hasFlashed = false;
        })
      );
      for (let y = 0; y < this.octopuses.length; y++) {
        for (let x = 0; x < this.octopuses[y].length; x++) {
          this.handleFlashes(y, x);
        }
      }
    }

    this.result.emit(
      this.octopuses
        .flat()
        .map((o) => o.timeFlashed)
        .reduce((prev, current) => prev + current, 0)
        .toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    let step = 0;
    while (this.octopuses.some((l) => l.some((i) => i.flashValue !== 0))) {
      this.octopuses.forEach((line) =>
        line.forEach((o) => {
          o.flashValue++;
          o.hasFlashed = false;
        })
      );
      for (let y = 0; y < this.octopuses.length; y++) {
        for (let x = 0; x < this.octopuses[y].length; x++) {
          this.handleFlashes(y, x);
        }
      }
      step++;
    }
    this.result.emit(step.toString());
  }

  private handleFlashes(y: number, x: number) {
    if (this.octopuses[y][x].flashValue > 9 && !this.octopuses[y][x].hasFlashed) {
      this.octopuses[y][x].flashValue = 0;
      this.octopuses[y][x].hasFlashed = true;
      this.octopuses[y][x].timeFlashed++;

      for (let tmpY = y - 1; tmpY <= y + 1; tmpY++) {
        for (let tmpX = x - 1; tmpX <= x + 1; tmpX++) {
          if (
            (tmpY !== y || tmpX !== x) &&
            this.octopuses[tmpY] &&
            this.octopuses[tmpY][tmpX] &&
            this.octopuses[tmpY][tmpX].flashValue <= 9 &&
            this.octopuses[tmpY][tmpX].flashValue !== 0
          ) {
            this.octopuses[tmpY][tmpX].flashValue++;
            this.handleFlashes(tmpY, tmpX);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Octopus {
  flashValue: number;
  timeFlashed = 0;
  hasFlashed = false;

  constructor(flash: number) {
    this.flashValue = flash;
  }
}
