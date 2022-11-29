import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d19',
  templateUrl: './day-y2021-d19.component.html',
  styleUrls: ['./day-y2021-d19.component.scss'],
})
export class DayY2021D19Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  scanners: Scanner[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '19' && d.year === '2021'),
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
    let scanner = new Scanner();
    for (let line of this.data) {
      if (line.length === 0) continue;
      if (line[1] === '-') {
        scanner = new Scanner();
        this.scanners.push(scanner);
        continue;
      }
      const coord = line.split(',').map(Number);
      scanner.addBeacon(coord[0], coord[1], coord[2]);
    }
  }

  solvePartOne() {
    this.initVariables();

    this.align();
    const beacons = new Set();
    this.scanners.forEach((s) => s.beacons.forEach((b) => beacons.add(`${b.coordinates.x},${b.coordinates.y},${b.coordinates.z}`)));
    this.result.emit(beacons.size.toString());
  }

  solvePartTwo() {
    this.initVariables();

    this.align();
    let max = 0;
    this.scanners.forEach((s1) =>
      this.scanners.forEach(
        (s2) => (max = Math.max(max, Math.abs(s2.coordinates.x - s1.coordinates.x) + Math.abs(s2.coordinates.y - s1.coordinates.y) + Math.abs(s2.coordinates.z - s1.coordinates.z)))
      )
    );
    this.result.emit(max.toString());
  }

  /**
   * Aligns all scanner with one another
   * Once a scanner is locked (it is aligned with a correct one), we don't process it again
   */
  private align() {
    const locked = new Set([0]);
    this.scanners[0].coordinates = new Coordinates(0, 0, 0);
    while (locked.size < this.scanners.length) {
      for (let i = 0; i < this.scanners.length; i++) {
        for (let j = 0; j < this.scanners.length; j++) {
          if (i === j || !locked.has(i) || locked.has(j)) continue;
          const intersection = this.scanners[i].findIntersections(this.scanners[j]);
          if (!intersection) continue;
          this.scanners[i].align(this.scanners[j], intersection);
          locked.add(j);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Beacon {
  coordinates: Coordinates;
  id: number;
  relatives: string[] = [];
  constructor(coordonates: Coordinates, id: number) {
    this.coordinates = coordonates;
    this.id = id;
  }

  /**
   * Stores all relatives distances to ease the finding of potential intersections
   * @param beacon
   */
  align(beacon: Beacon) {
    const dx = Math.abs(this.coordinates.x - beacon.coordinates.x);
    const dy = Math.abs(this.coordinates.y - beacon.coordinates.y);
    const dz = Math.abs(this.coordinates.z - beacon.coordinates.z);
    this.relatives[beacon.id] = beacon.relatives[this.id] = [Math.hypot(dx, dy, dz).toFixed(5), Math.min(dx, dy, dz), Math.max(dx, dy, dz)].join(',');
  }

  /**
   * Finds / stores intersections between beacons
   * @param beacon
   * @returns compare
   */
  findsStoresIntersections(beacon: Beacon): Intersection[] {
    const result = [];
    for (let relative of this.relatives) {
      const index = beacon.relatives.indexOf(relative);
      if (index > -1) result.push(new Intersection(beacon.relatives[index], this.relatives.indexOf(relative), index));
    }
    return result;
  }
}

export class Coordinates {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Position {
  there: Beacon;
  here: Beacon;
  intersection: Intersection[];

  constructor(there: Beacon, here: Beacon, intersection: Intersection[]) {
    this.there = there;
    this.here = here;
    this.intersection = intersection;
  }
}

export class Intersection {
  relative: string;
  relativesIndex: number;
  index: number;

  constructor(relative: string, relativesIndex: number, index: number) {
    this.relative = relative;
    this.relativesIndex = relativesIndex;
    this.index = index;
  }
}

export class Scanner {
  beacons: Beacon[] = [];
  coordinates: Coordinates = new Coordinates(0, 0, 0);

  addBeacon(x: number, y: number, z: number) {
    const newBeacon = new Beacon(new Coordinates(x, y, z), this.beacons.length);
    this.beacons.forEach((b) => b.align(newBeacon));
    this.beacons.push(newBeacon);
  }

  /**
   * Finds the intersections of beacons of two scanners
   * @param scanner
   * @returns compare
   */
  findIntersections(scanner: Scanner): Position | null {
    for (let there of scanner.beacons) {
      for (let here of this.beacons) {
        const intersection = there.findsStoresIntersections(here);
        if (intersection.length >= 11) {
          return new Position(there, here, intersection);
        }
      }
    }
    return null;
  }

  /**
   * Rotates and align all intersected beacons so we can find the scanner's position
   * Readjust all beacons poositions as well
   * @param scanner
   * @param data
   */
  align(scanner: Scanner, data: Position) {
    for (let inter of data.intersection) {
      if (inter.relative.split(',')[1] === '0') continue;
      const relativeHere = this.beacons[inter.index];
      const dx0 = data.here.coordinates.x - relativeHere.coordinates.x;
      const dy0 = data.here.coordinates.y - relativeHere.coordinates.y;
      const dz0 = data.here.coordinates.z - relativeHere.coordinates.z;

      const relativeThere = scanner.beacons[inter.relativesIndex];
      const dx1 = data.there.coordinates.x - relativeThere.coordinates.x;
      const dy1 = data.there.coordinates.y - relativeThere.coordinates.y;
      const dz1 = data.there.coordinates.z - relativeThere.coordinates.z;
      if (Math.abs(dx0) === Math.abs(dy0) || Math.abs(dz0) === Math.abs(dy0) || Math.abs(dx0) === Math.abs(dz0)) continue;

      const map = [0, 0, 0, 0, 0, 0, 0, 0, 0];

      if (dx0 === dx1) map[0] = 1;
      if (dx0 === -dx1) map[0] = -1;
      if (dx0 === dy1) map[3] = 1;
      if (dx0 === -dy1) map[3] = -1;
      if (dx0 === dz1) map[6] = 1;
      if (dx0 === -dz1) map[6] = -1;
      if (dy0 === dx1) map[1] = 1;
      if (dy0 === -dx1) map[1] = -1;
      if (dy0 === dy1) map[4] = 1;
      if (dy0 === -dy1) map[4] = -1;
      if (dy0 === dz1) map[7] = 1;
      if (dy0 === -dz1) map[7] = -1;
      if (dz0 === dx1) map[2] = 1;
      if (dz0 === -dx1) map[2] = -1;
      if (dz0 === dy1) map[5] = 1;
      if (dz0 === -dy1) map[5] = -1;
      if (dz0 === dz1) map[8] = 1;
      if (dz0 === -dz1) map[8] = -1;

      scanner.beacons.forEach((b) => {
        const old = {
          x: b.coordinates.x,
          y: b.coordinates.y,
          z: b.coordinates.z,
        };
        b.coordinates.x = old.x * map[0] + old.y * map[3] + old.z * map[6];
        b.coordinates.y = old.x * map[1] + old.y * map[4] + old.z * map[7];
        b.coordinates.z = old.x * map[2] + old.y * map[5] + old.z * map[8];
      });

      scanner.coordinates = new Coordinates(
        data.here.coordinates.x - data.there.coordinates.x,
        data.here.coordinates.y - data.there.coordinates.y,
        data.here.coordinates.z - data.there.coordinates.z
      );
      scanner.beacons.forEach((b) => {
        b.coordinates.x += scanner.coordinates.x;
        b.coordinates.y += scanner.coordinates.y;
        b.coordinates.z += scanner.coordinates.z;
      });

      // Break because one readjust is enough
      break;
    }
  }
}
