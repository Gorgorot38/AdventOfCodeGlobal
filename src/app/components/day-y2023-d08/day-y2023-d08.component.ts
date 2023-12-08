import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import * as lcm from 'compute-lcm';

@Component({
  selector: 'app-day-y2023-d08',
  templateUrl: './day-y2023-d08.component.html',
  styleUrl: './day-y2023-d08.component.scss',
})
export class DayY2023D08Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '08' && d.year === '2023'),
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
    const instructions = this.data[0].split('');
    const map = this.data.slice(2).reduce((acc, current) => {
      const match = /\(([A-Z]{3}), ([A-Z]{3})\)/.exec(current.split(' = ')[1]);
      acc.set(current.split(' = ')[0], { left: match[1], right: match[2] });
      return acc;
    }, new Map<string, { left: string; right: string }>());

    let step = 0;
    let currentNode = 'AAA';
    while (currentNode !== 'ZZZ') {
      currentNode = instructions[step % instructions.length] === 'L' ? map.get(currentNode).left : map.get(currentNode).right;
      step++;
    }
    this.result.emit(step.toString());
  }

  solvePartTwo() {
    const instructions = this.data[0].split('');
    const map = this.data.slice(2).reduce((acc, current) => {
      const match = /\(([1-9A-Z]{3}), ([1-9A-Z]{3})\)/.exec(current.split(' = ')[1]);
      acc.set(current.split(' = ')[0], { left: match[1], right: match[2] });
      return acc;
    }, new Map<string, { left: string; right: string }>());

    const startingNodes = Array.from(map.keys())
      .filter((k) => k.endsWith('A'))
      .reduce((acc, node) => {
        let step = 0;
        let currentNode = node;
        while (!currentNode.endsWith('Z')) {
          currentNode = instructions[step % instructions.length] === 'L' ? map.get(currentNode).left : map.get(currentNode).right;
          step++;
        }
        acc.push(step);
        return acc;
      }, [] as number[]);
    this.result.emit(lcm(startingNodes));
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
