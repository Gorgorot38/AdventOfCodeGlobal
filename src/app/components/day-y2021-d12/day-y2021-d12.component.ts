import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-day-y2021-d12',
  templateUrl: './day-y2021-d12.component.html',
  styleUrls: ['./day-y2021-d12.component.scss'],
})
export class DayY2021D12Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  working_data: string[];
  paths: Map<string, string[]> = new Map<string, string[]>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '12' && d.year === '2021'),
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
    this.paths.clear();
    this.working_data = _.cloneDeep(this.data);
    this.data
      .filter((i) => i)
      .forEach((i) => {
        const start = i.split('-')[0];
        const end = i.split('-')[1];
        if (this.paths.has(start)) {
          this.paths.get(start)?.push(end);
        } else {
          this.paths.set(start, [end]);
        }

        if (this.paths.has(end)) {
          this.paths.get(end)?.push(start);
        } else {
          this.paths.set(end, [start]);
        }
      });
  }

  solvePartOne() {
    this.initVariables();
    this.result.emit(this.visit('start', []).length.toString());
  }

  solvePartTwo() {
    this.initVariables();
    this.result.emit(this.visitTwice('start', []).length.toString());
  }

  visit(node: string, visitedNodes: string[]): string[][] {
    const visiting = [...visitedNodes, node];

    if (node === 'end') {
      return [visiting];
    }

    const adjacents = this.paths.get(node);
    const newPaths: string[][] = [];

    adjacents?.forEach((n) => {
      if (n.toLowerCase() === n && visitedNodes.includes(n)) {
        // We can stop
        return;
      }
      newPaths.push(...this.visit(n, visiting));
    });

    return newPaths;
  }

  visitTwice(node: string, visitedNodes: string[]): string[][] {
    const visiting = [...visitedNodes, node];

    if (node === 'end') {
      return [visiting];
    }

    const adjacents = this.paths.get(node);
    const newPaths: string[][] = [];

    adjacents?.forEach((n) => {
      if (n === 'start') {
        return;
      }

      if (n.toLowerCase() === n) {
        const visitedOnce: string[] = [];
        let visitedTwice = false;
        visiting.forEach((v) => {
          if (v === v.toLowerCase()) {
            if (visitedOnce.includes(v)) {
              visitedTwice = true;
            } else {
              visitedOnce.push(v);
            }
          }
        });

        if (visitedTwice && visitedOnce.includes(n)) {
          // Once value has been seen twice, we gucci
          return;
        }
      }
      newPaths.push(...this.visitTwice(n, visiting));
    });

    return newPaths;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
