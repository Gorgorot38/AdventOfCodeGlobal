import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2022-d07',
  templateUrl: './day-y2022-d07.component.html',
  styleUrls: ['./day-y2022-d07.component.scss'],
})
export class DayY2022D07Component implements OnInit, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  tree: TreeNode<number>;

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '07' && d.year === '2022'),
        takeUntil(this._destroying),
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne();
        else this.solvePartTwo();
      });
  }

  initVariables() {
    this.tree = new TreeNode<number>('/');
    let currentTree: TreeNode<number> = this.tree.find('/');

    this.data
      .filter((d) => d)
      .forEach((c, idx) => {
        if (c.startsWith('$ cd')) {
          const dir = c.split(' ')[2];
          if (dir == '..') {
            currentTree = currentTree.parent;
          } else if (dir !== '/') {
            currentTree = currentTree.findInChildren(dir);
          }
        } else if (c.startsWith('$ ls')) {
          const files = this.getListedFiles(idx);
          files.forEach((f) => {
            if (f.startsWith('dir')) {
              const dir = f.split(' ')[1];
              currentTree.addChild(dir);
            } else {
              const fileName = f.split(' ')[1];
              const filesize = Number(f.split(' ')[0]);
              currentTree.addChild(fileName, filesize);
            }
          });
        }
      });
  }

  private getListedFiles(idx: number): string[] {
    const files: string[] = [];
    let inst = this.data[idx + 1];
    let instIdx = idx + 1;
    while (inst && !inst.startsWith('$')) {
      files.push(inst);
      instIdx++;
      inst = this.data[instIdx];
    }
    return files;
  }

  solvePartOne() {
    this.initVariables();

    const map = this.getSizeMap();

    this.result.emit(
      Array.from(map.values())
        .filter((v) => v <= 100000)
        .reduce((prev, curr) => prev + curr, 0)
        .toString(),
    );
  }

  private getSizeMap() {
    const map = new Map<string, number>();
    this.tree.forEach((node: TreeNode<number>) => {
      if (node.children && node.children.length > 0) {
        map.set(
          node.getFullName(),
          node.getValues().reduce((prev, curr) => prev + curr, 0),
        );
      }
    });
    return map;
  }

  solvePartTwo() {
    this.initVariables();

    const map = this.getSizeMap();

    const spaceToFree = 30000000 - (70000000 - this.tree.getValues().reduce((prev, curr) => prev + curr, 0));

    this.result.emit(
      Array.from(map.values())
        .filter((v) => v >= spaceToFree)
        .sort((a, b) => a - b)[0]
        .toString(),
    );
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

export class TreeNode<T> {
  parent: TreeNode<T>;
  children: TreeNode<T>[];
  name: string;
  value: T;

  constructor(name: string, parent?: TreeNode<T>, value?: T) {
    this.name = name;
    this.parent = parent;
    this.value = value;
  }

  addChild(name: string, value?: T): TreeNode<T> {
    const child = new TreeNode<T>(name, this, value);
    if (!this.children) this.children = [];
    this.children.push(child);
    return child;
  }

  find(name: string): TreeNode<T> | null {
    if (name === this.name) return this;
    if (this.children) {
      for (const child of this.children) {
        const target = child.find(name);
        if (target) return target;
      }
    }

    return null;
  }

  findInChildren(name: string): TreeNode<T> | null {
    if (this.children) {
      const target = this.children.find((c) => c.name === name);
      if (target) return target;
    }

    return null;
  }

  root(): TreeNode<T> {
    if (!this.parent) {
      return this;
    }
    return this.parent.root();
  }

  getValues(): T[] {
    let values = [];
    if (this.children && this.children.length > 0) {
      for (const child of this.children) {
        child.getValues().forEach((v) => values.push(v));
      }
    } else if (this.value) {
      values.push(this.value);
    }
    return values;
  }

  forEach(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('forEach() callback must be a function');
    }

    // run this node through function
    callback(this);

    // do the same for all children
    if (this.children) {
      for (const child of this.children) {
        child.forEach(callback);
      }
    }

    return this;
  }

  getFullName() {
    if (this.parent) {
      return this.parent.getFullName() + this.name;
    }
    return this.name;
  }
}
