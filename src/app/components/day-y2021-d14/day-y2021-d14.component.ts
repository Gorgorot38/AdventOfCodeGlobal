import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d14',
  templateUrl: './day-y2021-d14.component.html',
  styleUrls: ['./day-y2021-d14.component.scss'],
})
export class DayY2021D14Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  startingStr: string;
  mapping: Map<string, string> = new Map();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '14' && d.year === '2021'),
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
    this.startingStr = this.data[0];
    this.mapping.clear();
    this.data.forEach((i) => {
      if (i.includes('->')) {
        this.mapping.set(i.split(' -> ')[0], i.split(' -> ')[1]);
      }
    });
  }

  solvePartOne() {
    this.initVariables();
    for (let idx = 0; idx < 10; idx++) {
      this.startingStr = this.naiveWay(this.startingStr, this.mapping);
    }
    const mapStr = new Map<string, number>();
    this.startingStr.split('').forEach((c) => mapStr.set(c, (mapStr.get(c) ?? 0) + 1));
    this.result.emit((Math.max(...mapStr.values()) - Math.min(...mapStr.values())).toString());
  }

  solvePartTwo() {
    this.initVariables();
    // Build the first occurences
    const occurences = new Map<string, number>();
    const pattern = /(?=(\w{2}))\w/g;
    let match;
    while ((match = pattern.exec(this.startingStr)) != null) {
      occurences.set(match[1], (occurences.get(match[1]) ?? 0) + 1);
    }

    for (let idx = 0; idx < 40; idx++) {
      this.smartWay(occurences, this.mapping);
    }

    // Build the map of separted letters from couples
    const letterMap = new Map<string, number>();
    [...occurences.entries()]
      .filter((e) => e[1] > 0)
      .forEach((e) => {
        letterMap.set(e[0].split('')[0], (letterMap.get(e[0].split('')[0]) ?? 0) + e[1]);
        letterMap.set(e[0].split('')[1], (letterMap.get(e[0].split('')[1]) ?? 0) + e[1]);
      });

    // Divide all by 2 because each letter is doubled (except for first and last letter --> which explains the round())
    [...letterMap.entries()].forEach((e) => letterMap.set(e[0], Math.round((letterMap.get(e[0]) ?? 0) / 2)));

    this.result.emit((Math.max(...letterMap.values()) - Math.min(...letterMap.values())).toString());
  }

  private smartWay(occurences: Map<string, number>, map: Map<string, string>) {
    // The thing to realize is that order does not matter
    // Filter out entries that are 0 or less because they do not exist anymore
    [...occurences.entries()]
      .filter((e) => e[1] > 0)
      .forEach((e) => {
        const newEntry = e[0].split('')[0] + map.get(e[0]) + e[0].split('')[1];
        // Add both new entries (the number of times needed)
        occurences.set(newEntry.substring(0, 2), (occurences.get(newEntry.substring(0, 2)) ?? 0) + e[1]);
        occurences.set(newEntry.substring(1), (occurences.get(newEntry.substring(1)) ?? 0) + e[1]);

        // Remove the old entry as it does not exist anymore
        occurences.set(e[0], (occurences.get(e[0]) ?? 0) - e[1]);
      });
  }

  private naiveWay(str: string, map: Map<string, string>): string {
    const pattern = /(?=(\w{2}))\w/g;
    const results: string[] = [];
    let match;
    while ((match = pattern.exec(str)) != null) {
      if (map.has(match[1])) {
        results.push(match[1].split('')[0] + map.get(match[1]) + match[1].split('')[1]);
      }
    }

    return results
      .map((w, i) => {
        if (i === 0) {
          return w;
        } else {
          return w.substring(1);
        }
      })
      .join('');
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
