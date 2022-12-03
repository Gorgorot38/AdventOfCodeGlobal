import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d03',
  templateUrl: './day-y2022-d03.component.html',
  styleUrls: ['./day-y2022-d03.component.scss'],
})
export class DayY2022D03Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  backPacks: string[][] = [];
  groupedBackPacks: string[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '03' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.backPacks = this.data
      .filter((d) => d)
      .map((d) => {
        const middleIndex = Math.ceil(d.length / 2);
        return [d.slice(0, middleIndex), d.slice(middleIndex)];
      });

    this.groupedBackPacks = [];
    for (let idx = 0; idx < this.data.filter((d) => d).length; idx = idx + 3) {
      this.groupedBackPacks.push([this.data[idx], this.data[idx + 1], this.data[idx + 2]]);
    }
  }

  solvePartOne() {
    this.initVariables();

    this.result.emit(
      this.backPacks
        .reduce((prev, curr) => {
          const commonChar = this.getCommonCharacter(curr[0], curr[1]);
          return prev + this.getCharValue(commonChar);
        }, 0)
        .toString()
    );
  }

  private getCharValue(c: string): number {
    if (c.toLocaleLowerCase() === c) return c.charCodeAt(0) - 96;
    return c.charCodeAt(0) - 38;
  }

  private getCommonCharacterMultiple(s1: string, s2: string, s3: string): string {
    const firstCommon = this.getCommonCharacters(s1, s2);
    return this.getCommonCharacter(firstCommon, s3);
  }

  private getCommonCharacter(s1: string, s2: string): string {
    for (const c of s1) {
      if (s2.includes(c)) return c;
    }
  }

  private getCommonCharacters(s1: string, s2: string): string {
    let chars = '';
    for (const c of s1) {
      if (s2.includes(c)) chars += c;
    }
    return chars;
  }

  solvePartTwo() {
    this.initVariables();

    this.result.emit(
      this.groupedBackPacks
        .reduce((prev, curr) => {
          const commonChar = this.getCommonCharacterMultiple(curr[0], curr[1], curr[2]);
          return prev + this.getCharValue(commonChar);
        }, 0)
        .toString()
    );
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
