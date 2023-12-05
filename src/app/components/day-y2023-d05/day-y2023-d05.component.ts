import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { range } from 'src/app/utils/utils';

@Component({
  selector: 'app-day-y2023-d05',
  templateUrl: './day-y2023-d05.component.html',
  styleUrl: './day-y2023-d05.component.scss',
})
export class DayY2023D05Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '05' && d.year === '2023'),
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
    const seeds = this.data[0].match(/\d+/g).map((v) => Number(v));
    const maps = this.buildMaps();

    const result = seeds.reduce((lowest, seed) => {
      let newSeed = seed;
      maps.forEach((map) => (newSeed = map.getConvertedSeed(newSeed)));
      return newSeed < lowest ? newSeed : lowest;
    }, Number.MAX_SAFE_INTEGER);

    this.result.emit(result.toString());
  }

  solvePartTwo() {
    const maps = this.buildMaps();
    const arr = this.data[0].match(/\d+/g).map((v) => Number(v));
    let result = Number.MAX_SAFE_INTEGER;
    for (let idx = 0; idx < arr.length; idx = idx + 2) {
      for (let god = arr[idx]; god < arr[idx] + arr[idx + 1]; god++) {
        let newSeed = god;
        maps.forEach((map) => (newSeed = map.getConvertedSeed(newSeed)));
        if (newSeed < result) result = newSeed;
      }
    }

    this.result.emit(result.toString());
  }

  buildMaps() {
    const maps: SeedMap[] = [];
    let lastName: string;
    for (const line of this.data.slice(2).filter((d) => d)) {
      if (line.includes('map')) {
        const name = /([a-z-]*) map:/.exec(line)[1];
        maps.push(new SeedMap(name));
        lastName = name;
      } else {
        const range = line.match(/\d+/g).map((v) => Number(v));
        maps.find((m) => m.name === lastName).ranges.push({ destination: range[0], source: range[1], range: range[2] });
      }
    }
    return maps;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class SeedMap {
  name: string;
  source: string;
  destination: string;
  ranges: Range[];

  constructor(name: string, ranges?: Range[]) {
    this.name = name;
    this.source = name.split('-to-')[0];
    this.destination = name.split('-to-')[1];
    this.ranges = ranges ?? [];
  }

  getConvertedSeed(seed: number): number {
    for (const range of this.ranges) {
      if (seed >= range.source && seed < range.source + range.range) {
        return seed - range.source + range.destination;
      }
    }
    return seed;
  }
}

export interface Range {
  source: number;
  destination: number;
  range: number;
}
