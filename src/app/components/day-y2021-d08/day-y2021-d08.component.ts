import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d08',
  templateUrl: './day-y2021-d08.component.html',
  styleUrls: ['./day-y2021-d08.component.scss'],
})
export class DayY2021D08Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  segments: Segment[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '08' && d.year === '2021'),
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
    this.segments = this.data
      .filter((v) => v)
      .map(
        (v) =>
          new Segment(
            v
              .split(' | ')[0]
              .split(' ')
              .map((s) => s.split('').sort().join('')),
            v
              .split(' | ')[1]
              .split(' ')
              .map((s) => s.split('').sort().join(''))
          )
      );
  }

  solvePartOne() {
    this.initVariables();

    this.result.emit(
      this.segments
        .map((v) => v.outputs)
        .flat()
        .filter((v) => v.length <= 4 || v.length === 7)
        .length.toString()
    );
  }

  solvePartTwo() {
    this.initVariables();

    this.result.emit(
      this.segments
        .reduce((prev, segment) => {
          const map = new Map<string, number>();
          segment.patterns.forEach((p) => {
            [...p].forEach((c) => {
              if (map.has(c)) {
                map.set(c, map.get(c) + 1);
              } else {
                map.set(c, 1);
              }
            });
          });
          const digit = new Digit();
          digit.bottomRight = [...map.entries()].find((entry) => entry[1] === 9)?.[0];
          digit.bottomLeft = [...map.entries()].find((entry) => entry[1] === 4)?.[0];
          digit.topLeft = [...map.entries()].find((entry) => entry[1] === 6)?.[0];
          digit.topRight = [...segment.patterns.find((p) => p.length === 2)].find((c) => c !== digit.bottomRight);
          digit.top = [...map.entries()].find((entry) => entry[1] === 8 && entry[0] !== digit.topRight)?.[0];
          digit.middle = [...segment.patterns.find((p) => p.length === 4)].find((c) => c !== digit.bottomRight && c !== digit.topRight && c !== digit.topLeft);
          digit.bottom = [...map.entries()].find((entry) => entry[1] === 7 && entry[0] !== digit.middle)?.[0];

          const mapNumbers = this.mapPatternsToNumber(digit, segment);
          return prev + parseInt(segment.outputs.reduce((a, b) => a + mapNumbers.get(b), ''));
        }, 0)
        .toString()
    );
  }

  private mapPatternsToNumber(digit: Digit, segment: Segment): Map<string, string> {
    const map = new Map<string, string>();
    map.set(
      segment.patterns.find((p) => p.length === 2),
      '1'
    );
    map.set(
      segment.patterns.find((p) => p.length === 4),
      '4'
    );
    map.set(
      segment.patterns.find((p) => p.length === 7),
      '8'
    );
    map.set(
      segment.patterns.find((p) => p.length === 3),
      '7'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.middle) && p.length === 6),
      '0'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.topRight) && p.length === 6),
      '6'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.bottomLeft) && p.length === 6),
      '9'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.topLeft) && !p.includes(digit.bottomLeft) && p.length === 5),
      '3'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.topLeft) && !p.includes(digit.bottomRight) && p.length === 5),
      '2'
    );
    map.set(
      segment.patterns.find((p) => !p.includes(digit.topRight) && !p.includes(digit.bottomLeft) && p.length === 5),
      '5'
    );

    return map;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Segment {
  patterns: string[];
  outputs: string[];

  constructor(patterns: string[], outputs: string[]) {
    this.patterns = patterns;
    this.outputs = outputs;
  }
}

export class Digit {
  top = '';
  topLeft = '';
  topRight = '';
  bottom = '';
  bottomLeft = '';
  bottomRight = '';
  middle = '';
}
