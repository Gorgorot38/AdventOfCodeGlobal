import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d02',
  templateUrl: './day-y2021-d02.component.html',
  styleUrls: ['./day-y2021-d02.component.scss'],
})
export class DayY2021D02Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  modifiedData: string[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '02' && d.year === '2021'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.modifiedData = this.data.filter((val) => val);
    }
  }

  solvePartOne() {
    const depth = this.modifiedData
      .filter((i) => i.includes('up') || i.includes('down'))
      .map((i) => {
        if (i.includes('up')) {
          return -parseInt(i.replace(/^\D+/g, ''));
        } else {
          return parseInt(i.replace(/^\D+/g, ''));
        }
      })
      .reduce((a, b) => a + b, 0);
    const length = this.modifiedData
      .filter((i) => i.includes('forward'))
      .map((i) => parseInt(i.replace(/^\D+/g, '')))
      .reduce((a, b) => a + b, 0);

    this.result.emit((depth * length).toString());
  }

  solvePartTwo() {
    let aim = 0;
    let depth = 0;
    let length = 0;

    this.modifiedData.forEach((val) => {
      if (val.includes('up')) {
        aim -= parseFloat(val.replace(/^\D+/g, ''));
      } else if (val.includes('down')) {
        aim += parseFloat(val.replace(/^\D+/g, ''));
      } else {
        length += parseFloat(val.replace(/^\D+/g, ''));
        depth += parseFloat(val.replace(/^\D+/g, '')) * aim;
      }
    });

    this.result.emit((depth * length).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
