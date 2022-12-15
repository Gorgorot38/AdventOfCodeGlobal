import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { indexOf } from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d15',
  templateUrl: './day-y2022-d15.component.html',
  styleUrls: ['./day-y2022-d15.component.scss'],
})
export class DayY2022D15Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  coordinates: Map<Coordinates, Coordinates> = new Map();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '15' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVarialbes() {
    this.coordinates.clear();
    this.data
      .filter((d) => d)
      .forEach((line) => {
        const match = new RegExp('Sensor at x=(-{0,1}[0-9]+), y=(-{0,1}[0-9]+): closest beacon is at x=(-{0,1}[0-9]+), y=(-{0,1}[0-9]+)').exec(line);
        this.coordinates.set(new Coordinates(Number(match[1]), Number(match[2])), new Coordinates(Number(match[3]), Number(match[4])));
      });
  }

  solvePartOne() {
    this.initVarialbes();

    this.result.emit(this.countNoBeaconSpotsClever(10, true).toString());
  }

  private countNoBeaconSpotsClever(lineNum: number, part1: boolean): number | Range[] {
    let count = 0;

    const ranges: Range[] = [];
    for (const entry of this.coordinates) {
      const manhattan = entry[0].computeManathan(entry[1]);
      const min = entry[0].x - manhattan + Math.abs(entry[0].y - lineNum);
      const max = entry[0].x + manhattan - Math.abs(entry[0].y - lineNum);
      if (min > max) {
        continue;
      }

      ranges.push(new Range(min, max));
    }

    const newRanges = this.combineAllRanges(ranges);

    count += _.sum(newRanges.map((r) => r.end - r.start + 1));

    const array = _.flatten(Array.from(this.coordinates).map((e) => [e[0], e[1]])).filter((c) => newRanges.some((r) => c.isXInRange(r.start, r.end, lineNum)));
    const filtered = [...new Map(array.map((item) => [`x=${item.x}y=${item.y}`, item])).values()];
    count -= filtered.length;

    if (part1) return count;
    return ranges;
  }

  private combineAllRanges(ranges: Range[]): Range[] {
    while (this.areSomeOverlapping(ranges)) {
      for (let range of ranges) {
        if (ranges.filter((r) => r !== range).some((r) => r.areOverlapping(range))) {
          const newRange = range.combineRanges(ranges.filter((r) => r !== range).find((r) => r.areOverlapping(range)));
          ranges.splice(ranges.indexOf(ranges.filter((r) => r !== range).find((r) => r.areOverlapping(range))), 1);
          ranges.splice(ranges.indexOf(range), 1);
          ranges.push(newRange);
        }
      }
    }

    return ranges;
  }

  areSomeOverlapping(ranges: Range[]): boolean {
    for (let range of ranges) {
      if (ranges.filter((r) => r !== range).some((r) => r.areOverlapping(range))) {
        return true;
      }
    }
    return false;
  }

  solvePartTwo() {
    this.initVarialbes();

    let idx1 = 2000000;
    let idx2 = 2000000;
    while (true) {
      idx1++;
      idx2--;
      const ranges1 = (this.countNoBeaconSpotsClever(idx1, false) as Range[]).filter((r) => r.end >= 0 && r.start <= 4000000);
      const ranges2 = (this.countNoBeaconSpotsClever(idx2, false) as Range[]).filter((r) => r.end >= 0 && r.start <= 4000000);

      if (ranges1.length > 1) {
        if (ranges1[0].start < ranges1[1].start) {
          this.result.emit(((ranges1[1].start - 1) * 4000000 + idx1).toString());
        } else {
          this.result.emit(((ranges1[0].start - 1) * 4000000 + idx1).toString());
        }

        break;
      }

      if (ranges2.length > 1) {
        if (ranges2[0].start < ranges2[1].start) {
          this.result.emit(((ranges2[1].start - 1) * 4000000 + idx2).toString());
        } else {
          this.result.emit(((ranges2[0].start - 1) * 4000000 + idx2).toString());
        }

        break;
      }
    }

    return '';
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

  computeManathan(toCompare: Coordinates): number {
    return Math.abs(this.x - toCompare.x) + Math.abs(this.y - toCompare.y);
  }

  equals(toCompare: Coordinates): boolean {
    return this.x === toCompare.x && this.y === toCompare.y;
  }

  isXInRange(min: number, max: number, line: number) {
    return this.x >= min && this.x <= max && this.y === line;
  }
}

export class Range {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  areOverlapping(toCompare: Range): boolean {
    if (this.start <= toCompare.start) {
      return toCompare.start <= this.end;
    } else {
      return this.start <= toCompare.end;
    }
  }

  combineRanges(toCombine: Range): Range {
    return new Range(Math.min(this.start, toCombine.start), Math.max(this.end, toCombine.end));
  }
}
