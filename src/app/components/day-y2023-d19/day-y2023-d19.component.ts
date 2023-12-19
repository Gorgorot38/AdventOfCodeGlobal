import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import clone from 'just-clone';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2023-d19',
  templateUrl: './day-y2023-d19.component.html',
  styleUrl: './day-y2023-d19.component.scss',
})
export class DayY2023D19Component implements OnInit, OnChanges, OnDestroy {
  @Input()
  data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  visitedFaster = new Set<string>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '19' && d.year === '2023'),
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
    const stacks = new Map<string, Instruction[]>();
    const workflows: Instruction[][] = [];
    this.buildDataPart1(stacks, workflows);

    const res = workflows.reduce((acc, workflow) => acc + (this.isValidInstruction(workflow, stacks) ? 1 : 0), 0);
    this.result.emit(res.toString());
  }

  private isValidInstruction(workflow: Instruction[], stacks: Map<string, Instruction[]>) {
    let instructions = clone(stacks.get('in'));
    let letter = '';
    while (letter !== 'A' && letter !== 'R') {
      for (const tmpInst of instructions) {
        if (!tmpInst.variable) {
          letter = tmpInst.goTo;
          instructions = clone(stacks.get(letter));
          break;
        }
        const val = workflow.find((w) => w.variable === tmpInst.variable).value;
        const condition = tmpInst.instruction === '<' ? val < tmpInst.value : val > tmpInst.value;
        if (condition) {
          letter = tmpInst.goTo;
          instructions = clone(stacks.get(letter));
          break;
        }
      }
    }

    return letter === 'A';
  }

  private buildDataPart1(stacks: Map<string, Instruction[]>, workflows: Instruction[][]) {
    this.data.forEach((l) => {
      const regexInstruction = /^([a-z]+){(.+)}$/;
      if (regexInstruction.test(l)) {
        const matches = regexInstruction.exec(l);
        const intsructions: Instruction[] = matches[2].split(',').map((inst) => {
          const regex = /^([a-zA-Z])([><])(\d+):([a-zA-Z]+)$/;
          if (regex.test(inst)) {
            const match = regex.exec(inst);
            return { goTo: match[4], instruction: match[2], variable: match[1], value: Number(match[3]) };
          }
          return { goTo: inst };
        });
        stacks.set(matches[1], intsructions);
      } else if (/^{(.*)}$/.test(l)) {
        const regex = /^{(.*)}$/;
        const matches = regex.exec(l);
        workflows.push(matches[1].split(',').map((m) => ({ variable: m.split('=')[0], value: Number(m.split('=')[1]) } as Instruction)));
      }
    });
  }

  solvePartTwo() {
    const stacks = new Map<string, Instruction[]>();
    const workflows: Instruction[][] = [];
    this.buildDataPart1(stacks, workflows);
    const upperLimit = 4000;
    let validCombinations = 0;

    for (let x = 0; x <= upperLimit; x++) {
      for (let m = 0; m <= upperLimit; m++) {
        for (let a = 0; a <= upperLimit; a++) {
          for (let s = 0; s <= upperLimit; s++) {
            const isValid = this.isValidInstruction(
              [
                { variable: 'x', value: x },
                { variable: 'm', value: m },
                { variable: 'a', value: a },
                { variable: 's', value: s },
              ],
              stacks,
            );

            if (isValid) {
              validCombinations++;
            }
          }
        }
      }

      this.result.emit(validCombinations.toString());
    }
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}

interface Instruction {
  variable?: string;
  instruction?: string;
  value?: number;
  goTo?: string;
}
