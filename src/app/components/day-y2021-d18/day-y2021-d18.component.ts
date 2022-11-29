import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-day-y2021-d18',
  templateUrl: './day-y2021-d18.component.html',
  styleUrls: ['./day-y2021-d18.component.scss'],
})
export class DayY2021D18Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  input_data: string[];
  permutations: string[][] = [];

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '18' && d.year === '2021'),
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
    this.input_data = this.data.filter((i) => i);
    this.permutations = [];
  }

  solvePartOne() {
    this.initVariables();

    let lastPair = new Pair(uuidv4());
    this.input_data.forEach((i) => {
      if (lastPair.isNonExistent()) {
        lastPair = this.buildPairFromString(i, 0) as Pair;
      } else {
        lastPair = this.addPairs(lastPair, this.buildPairFromString(i, 0));
      }
      this.reducePair(lastPair);
    });
    this.result.emit(lastPair.getMagnitude().toString());
  }

  solvePartTwo() {
    this.initVariables();

    const permutations = this.input_data.flatMap((v, i) => this.input_data.slice(i + 1).map((w) => [v, w]));
    let max = 0;
    permutations.forEach((p) => {
      let pair = this.addPairs(this.buildPairFromString(p[0], 0), this.buildPairFromString(p[1], 0));
      this.reducePair(pair);
      let magnitude = pair.getMagnitude();
      if (magnitude > max) {
        max = magnitude;
      }

      pair = this.addPairs(this.buildPairFromString(p[1], 0), this.buildPairFromString(p[0], 0));
      this.reducePair(pair);
      magnitude = pair.getMagnitude();
      if (magnitude > max) {
        max = magnitude;
      }
    });
    this.result.emit(max.toString());
  }

  reducePair(pair: Pair) {
    while (true) {
      pair.resetVisitors();
      if (pair.needsToBeExploded()) {
        pair.explode();
      } else if (pair.needsToBeSplitted()) {
        pair.split();
      } else {
        break;
      }
    }
  }

  private buildPairFromString(str: string, depth: number): Pair | number {
    const newPair = new Pair(uuidv4());
    newPair.level = depth;
    let leftPar = 0;
    let rightPar = 0;
    const strAsNumbers = str
      .replace(/\D/g, ',')
      .split(',')
      .filter((i) => i)
      .map((s) => parseInt(s));
    if (strAsNumbers.length === 1) {
      return strAsNumbers[0];
    }
    for (let idx = 0; idx < str.length; idx++) {
      if (str[idx] === '[') {
        leftPar++;
      } else if (str[idx] === ']') {
        rightPar++;
      } else if (str[idx] === ',' && leftPar - 1 == rightPar) {
        newPair.left = this.buildPairFromString(str.substring(1, idx), depth + 1);
        newPair.right = this.buildPairFromString(str.substring(idx + 1), depth + 1);
        return newPair;
      }
    }
    return newPair;
  }

  private addPairs(pair1: Pair | number, pair2: Pair | number): Pair {
    const result = new Pair(uuidv4(), pair1, pair2);
    result.adjustLevel();
    return result;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class Pair {
  left: number | Pair;
  right: number | Pair;
  level = 0;
  id: string;
  rightToModify = false;
  leftToModify = false;

  constructor(id: string, left?: number | Pair, right?: number | Pair, level?: number) {
    this.left = left ?? 0;
    this.right = right ?? 0;
    this.id = id;
    this.level = level ?? 0;
  }

  adjustLevel() {
    if (typeof this.left === 'object') {
      this.left.level++;
      this.left.adjustLevel();
    }
    if (typeof this.right === 'object') {
      this.right.level++;
      this.right.adjustLevel();
    }
  }

  needsToBeExploded(): boolean {
    if (this.level >= 4 && typeof this.left === 'number' && typeof this.right === 'number') {
      return true;
    } else {
      let need = false;
      if (typeof this.left === 'object') {
        need = need || this.left.needsToBeExploded();
      }
      if (typeof this.right === 'object') {
        need = need || this.right.needsToBeExploded();
      }

      return need;
    }
  }

  needsToBeSplitted(): boolean {
    let need = false;
    if (typeof this.left === 'number') {
      need = need || this.left >= 10;
    } else {
      need = need || this.left.needsToBeSplitted();
    }
    if (typeof this.right === 'number') {
      need = need || this.right >= 10;
    } else {
      need = need || this.right.needsToBeSplitted();
    }
    return need;
  }

  findPairToExplode(): Pair {
    let pair = new Pair(uuidv4());
    if (this.level >= 4 && typeof this.left === 'number' && typeof this.right === 'number') {
      return this;
    }
    if (typeof this.right === 'object') {
      const newPair = this.right.findPairToExplode();
      if (!newPair.isNonExistent()) {
        pair = newPair;
      }
    }
    if (typeof this.left === 'object') {
      const newPair = this.left.findPairToExplode();
      if (!newPair.isNonExistent()) {
        pair = newPair;
      }
    }
    return pair;
  }

  findPairToSplit(): Pair {
    let pair = new Pair(uuidv4());
    if (typeof this.right === 'number' && this.right >= 10) {
      pair = this;
    }

    if (typeof this.left === 'number' && this.left >= 10) {
      return this;
    }

    if (typeof this.right === 'object') {
      const newPair = this.right.findPairToSplit();
      if (!newPair.isNonExistent()) pair = newPair;
    }
    if (typeof this.left === 'object') {
      const newPair = this.left.findPairToSplit();
      if (!newPair.isNonExistent()) pair = newPair;
    }

    return pair;
  }

  resetPairToExplode(id: string) {
    if (typeof this.left === 'object') {
      if (this.left.id === id) {
        this.left = 0;
      } else {
        this.left.resetPairToExplode(id);
      }
    }
    if (typeof this.right === 'object') {
      if (this.right.id === id) {
        this.right = 0;
      } else {
        this.right.resetPairToExplode(id);
      }
    }
  }

  split() {
    const toSplit = this.findPairToSplit();
    if (typeof toSplit.left === 'number' && toSplit.left >= 10) {
      const val = toSplit.left as number;
      toSplit.left = new Pair(uuidv4(), Math.floor(val / 2), Math.round(val / 2), toSplit.level + 1);
    } else {
      const val = toSplit.right as number;
      toSplit.right = new Pair(uuidv4(), Math.floor(val / 2), Math.round(val / 2), toSplit.level + 1);
    }
  }

  explode() {
    const toExplode = this.findPairToExplode();
    const left = toExplode.left as number;
    const right = toExplode.right as number;

    const closestLeft = this.findClosestLeft(toExplode.id, toExplode.id);
    if (closestLeft.leftToModify) {
      closestLeft.left = left + (closestLeft.left as number);
    } else {
      closestLeft.right = left + (closestLeft.right as number);
    }
    const closestRight = this.findClosestRight(toExplode.id, toExplode.id);
    if (closestRight.rightToModify) {
      closestRight.right = right + (closestRight.right as number);
    } else {
      closestRight.left = right + (closestRight.left as number);
    }

    this.resetPairToExplode(toExplode.id);
  }

  findParent(idToFind: string): Pair {
    let pair: Pair = new Pair(uuidv4());
    if (typeof this.left === 'object') {
      if (this.left.id == idToFind) {
        return this;
      } else {
        const newPair = this.left.findParent(idToFind);
        if (!newPair.isNonExistent()) {
          pair = newPair;
        }
      }
    }
    if (typeof this.right === 'object') {
      if (this.right.id == idToFind) {
        return this;
      } else {
        const newPair = this.right.findParent(idToFind);
        if (!newPair.isNonExistent()) {
          pair = newPair;
        }
      }
    }
    return pair;
  }

  findClosestRight(idToFind: string, initalId: string): Pair {
    const parent = this.findParent(idToFind);
    if (parent.isNonExistent()) {
      return parent;
    }
    if (typeof parent.right === 'object' && parent.right.pairHasId(initalId)) {
      // Go upper
      return this.findClosestRight(parent.id, initalId);
    } else if (typeof parent.left === 'object' && parent.left.pairHasId(initalId)) {
      if (typeof parent.right === 'number') {
        parent.rightToModify = true;
        return parent;
      } else {
        return parent.right.getDeepestLeft();
      }
    }
    return parent;
  }

  findClosestLeft(idToFind: string, initalId: string): Pair {
    const parent = this.findParent(idToFind);
    if (parent.isNonExistent()) {
      return parent;
    }
    if (typeof parent.left === 'object' && parent.left.pairHasId(initalId)) {
      // Go upper
      return this.findClosestLeft(parent.id, initalId);
    } else if (typeof parent.right === 'object' && parent.right.pairHasId(initalId)) {
      if (typeof parent.left === 'number') {
        parent.leftToModify = true;
        return parent;
      } else {
        return parent.left.getDeepestRight();
      }
    }
    return parent;
  }

  pairHasId(id: string): boolean {
    let hasId = false;
    if (this.id === id) {
      return true;
    }
    if (typeof this.left === 'object') {
      hasId = hasId || this.left.pairHasId(id);
    }
    if (typeof this.right === 'object') {
      hasId = hasId || this.right.pairHasId(id);
    }
    return hasId;
  }

  getDeepestLeft(): Pair {
    if (typeof this.left === 'number') {
      return this;
    } else {
      return this.left.getDeepestLeft();
    }
  }

  getDeepestRight(): Pair {
    if (typeof this.right === 'number') {
      return this;
    } else {
      return this.right.getDeepestRight();
    }
  }

  isNonExistent() {
    return typeof this.left === 'number' && typeof this.right === 'number' && this.left === 0 && this.right === 0 && this.level === 0;
  }

  getMagnitude(): number {
    if (typeof this.left === 'number' && typeof this.right === 'number') {
      return 3 * this.left + 2 * this.right;
    } else if (typeof this.left === 'number' && typeof this.right === 'object') {
      return 3 * this.left + 2 * this.right.getMagnitude();
    } else if (typeof this.left === 'object' && typeof this.right === 'number') {
      return 3 * this.left.getMagnitude() + 2 * this.right;
    } else {
      return 3 * (this.left as Pair).getMagnitude() + 2 * (this.right as Pair).getMagnitude();
    }
  }

  resetVisitors() {
    this.rightToModify = false;
    this.leftToModify = false;
    if (typeof this.left === 'object') {
      this.left.resetVisitors();
    }
    if (typeof this.right === 'object') {
      this.right.resetVisitors();
    }
  }

  diplayAsString(): string {
    let str = `[`;
    if (typeof this.left === 'number') {
      str += this.left + ',';
    } else {
      str += this.left.diplayAsString();
    }
    if (typeof this.right === 'number') {
      if (str.endsWith(']')) {
        str += ',';
      }
      str += this.right;
    } else {
      str += this.right.diplayAsString();
    }

    str += ']';

    str = str.replace('][', '],[');
    return str;
  }
}
