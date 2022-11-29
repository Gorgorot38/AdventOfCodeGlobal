import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d13',
  templateUrl: './day-y2021-d13.component.html',
  styleUrls: ['./day-y2021-d13.component.scss'],
})
export class DayY2021D13Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  working_data: Point[] = [];
  folds: Fold[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '13' && d.year === '2021'),
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
    this.working_data = [];
    this.folds = [];
    this.data.forEach((i) => {
      if (new RegExp('^([0-9]{1,4}),([0-9]{1,4})$').test(i)) {
        const match = new RegExp('^([0-9]{1,4}),([0-9]{1,4})$').exec(i);
        this.working_data.push(new Point(parseInt(match[1]), parseInt(match[2])));
      } else if (new RegExp('^fold along ([a-z])=([0-9]{1,4})$').test(i)) {
        const match = new RegExp('^fold along ([a-z])=([0-9]{1,4})$').exec(i);
        this.folds.push(new Fold(match[1], parseInt(match[2])));
      }
    });
  }

  solvePartOne() {
    this.initVariables();

    this.fold(this.folds[0].axis, this.folds[0].position);

    this.result.emit([...new Set(this.working_data.map((i) => `x=${i.x}y=${i.y}`))].length.toString());
  }

  solvePartTwo() {
    this.initVariables();

    this.folds.forEach((f, i) => {
      this.fold(f.axis, f.position);
      if (i === this.folds.length - 1) this.printFoldedFile();
    });

    this.result.emit('Look at printed file located at: ');
  }

  private fold(axis: string, position: number) {
    if (axis === 'x') {
      this.working_data.filter((p) => p.x > position).forEach((p) => (p.x -= (p.x - position) * 2));
      this.working_data = this.working_data.filter((p) => p.x !== position);
    } else {
      this.working_data.filter((p) => p.y > position).forEach((p) => (p.y -= (p.y - position) * 2));
      this.working_data = this.working_data.filter((p) => p.y !== position);
    }
  }

  printFoldedFile() {
    // const tmpArray: string[][] = [];
    // const ys = this.working_data.map((i) => i.y);
    // const xs = this.working_data.map((i) => i.x);
    // ys.sort((a, b) => b - a);
    // xs.sort((a, b) => b - a);
    // const maxY = ys[0];
    // const maxX = xs[0];
    // for (let idx = 0; idx <= maxY; idx++) {
    //   tmpArray.push([]);
    // }
    // for (let y = 0; y <= maxY; y++) {
    //   for (let x = 0; x <= maxX; x++) {
    //     const point = this.working_data.find((i) => i.x === x && i.y === y);
    //     if (point) {
    //       tmpArray[y][x] = '#';
    //     } else {
    //       tmpArray[y][x] = '.';
    //     }
    //   }
    // }
    // let file = fs.createWriteStream(`prints/folds.txt`);
    // file.on('error', function (err) {
    //   /* error handling */
    // });
    // tmpArray.forEach(function (v) {
    //   file.write(v.join('') + '\n');
    // });
    // file.end();
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Fold {
  axis: string;
  position: number;
  constructor(axis: string, position: number) {
    this.axis = axis;
    this.position = position;
  }
}
