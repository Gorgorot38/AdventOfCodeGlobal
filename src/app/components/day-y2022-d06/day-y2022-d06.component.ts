import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d06',
  templateUrl: './day-y2022-d06.component.html',
  styleUrls: ['./day-y2022-d06.component.scss'],
})
export class DayY2022D06Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  marker: string[] = [];
  packet: string;

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '06' && d.year === '2022'),
        takeUntil(this._destroying),
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.marker = [];
    this.packet = this.data[0];
  }

  solvePartOne() {
    this.initVariables();

    this.result.emit(this.getLetterNumber(4).toString());
  }

  solvePartTwo() {
    this.initVariables();

    this.result.emit(this.getLetterNumber(14).toString());
  }

  private getLetterNumber(uniqueNum: number) {
    let letterNum = 1;
    for (const letter of this.packet.split('')) {
      this.marker.push(letter);
      if (this.marker.length > uniqueNum) {
        this.marker.shift();
      }

      if (this.marker.length === uniqueNum && this.marker.filter(this.onlyUnique).length === uniqueNum) {
        break;
      }

      letterNum++;
    }
    return letterNum;
  }

  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
