import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d13',
  templateUrl: './day-y2022-d13.component.html',
  styleUrls: ['./day-y2022-d13.component.scss'],
})
export class DayY2022D13Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  packets: Packets[] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '13' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.packets = [];
    const filteredData = this.data.filter((d) => d);
    for (let idx = 0; idx < filteredData.length; idx = idx + 2) {
      this.packets.push(new Packets(JSON.parse(filteredData[idx]), JSON.parse(filteredData[idx + 1])));
    }
  }

  solvePartOne() {
    this.initVariables();

    let sum = 0;
    this.packets.forEach((p, idx) => {
      if (p.compare()) {
        sum += idx + 1;
      }
    });

    this.result.emit(sum.toString());
  }

  solvePartTwo() {
    const modifiedData = this.data.filter((d) => d).map((d) => JSON.parse(d));

    modifiedData.push([[2]]);
    modifiedData.push([[6]]);

    const sorted = modifiedData.sort((a, b) => {
      const comp = new Packets(b, a).compare();
      if (comp) {
        return 1;
      } else if (comp === false) {
        return -1;
      } else {
        return 0;
      }
    });

    console.log(sorted);

    this.result.emit(((sorted.findIndex((p) => _.isEqual(p, [[2]])) + 1) * (sorted.findIndex((p) => _.isEqual(p, [[6]])) + 1)).toString());
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Packets {
  leftPacket: Array<unknown>;
  rightPacket: Array<unknown>;

  constructor(leftPacket: Array<unknown>, rightPacket: Array<unknown>) {
    this.leftPacket = leftPacket;
    this.rightPacket = rightPacket;
  }

  compare(): boolean | undefined {
    let comp: boolean | undefined = undefined;
    for (let idx = 0; idx < this.getBiggerLength(); idx++) {
      if (!_.isNil(this.leftPacket[idx]) && _.isNil(this.rightPacket[idx])) {
        return false;
      } else if (_.isNil(this.leftPacket[idx]) && !_.isNil(this.rightPacket[idx])) {
        return true;
      } else if (Array.isArray(this.leftPacket[idx]) && Array.isArray(this.rightPacket[idx])) {
        comp = new Packets(this.leftPacket[idx] as Array<unknown>, this.rightPacket[idx] as Array<unknown>).compare();
      } else if (Array.isArray(this.leftPacket[idx]) && !Array.isArray(this.rightPacket[idx])) {
        comp = new Packets(this.leftPacket[idx] as Array<unknown>, [this.rightPacket[idx]]).compare();
      } else if (!Array.isArray(this.leftPacket[idx]) && Array.isArray(this.rightPacket[idx])) {
        comp = new Packets([this.leftPacket[idx]], this.rightPacket[idx] as Array<unknown>).compare();
      } else if ((this.leftPacket[idx] as number) < (this.rightPacket[idx] as number)) {
        return true;
      } else if ((this.leftPacket[idx] as number) > (this.rightPacket[idx] as number)) {
        return false;
      }

      if (comp === false || comp === true) break;
    }
    return comp;
  }

  getBiggerLength() {
    if (this.leftPacket.length > this.rightPacket.length) return this.leftPacket.length;
    return this.rightPacket.length;
  }
}
