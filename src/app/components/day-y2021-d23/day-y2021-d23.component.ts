import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day-y2021-d23',
  templateUrl: './day-y2021-d23.component.html',
  styleUrls: ['./day-y2021-d23.component.scss'],
})
export class DayY2021D23Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = [];

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  private readonly _destroying = new Subject<void>();

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '23' && d.year === '2021'),
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

  solvePartOne() {
    this.result.emit(`
    #############
    #...........#
    ###D#C#A#B###
      #D#C#B#A#
      #########
      
      
    #############
    #.A.B.......# 6 + 5*10
    ###D#C#.#B###
      #D#C#.#A#
      #########
      
      
    #############
    #.A.B.......# 6 + 5*10 + 2 *5*100
    ###D#.#C#B###
      #D#.#C#A#
      #########
      
      
    #############
    #.A.......A.# 6 + 5*10 + 2 *5*100 + 3*10 + 6*10 + 3
    ###D#B#C#.###
      #D#B#C#.#
      #########
    
    #############
    #...........# 6 + 5*10 + 2 *5*100 + 3*10 + 6*10 + 3 + 1000*9*2 + 3 + 8
    ###A#B#C#D###
      #A#B#C#D#
      #########
    `);
  }

  solvePartTwo() {
    this.result.emit(`
    #############
    #...........#
    ###D#C#A#B###
      #D#C#B#A#
      #D#B#A#C#
      #D#C#B#A#
      #########
      
    #############
    #AA.....B.B.# 7 + 5*10 + 8 + 5*10
    ###D#C#.#B###
      #D#C#.#A#
      #D#B#.#C#
      #D#C#.#A#
      #########
    
    #############
    #AA.....B.B.# 7 + 5*10 + 8 + 5*10 + 2*7*100
    ###D#.#.#B###
      #D#.#.#A#
      #D#B#C#C#
      #D#C#C#A#
      #########
      
    #############
    #AA.B...B.B.# 7 + 5*10 + 8 + 5*10 + 2*7*100 + 4*10 + 8*100
    ###D#.#.#B###
      #D#.#C#A#
      #D#.#C#C#
      #D#.#C#A#
      #########
    
    #############
    #AA.........# 7 + 5*10 + 8 + 5*10 + 2*7*100 + 4*10 + 8*100 + 5*10 + 6*10 + 7*10 + 6*10
    ###D#B#.#.###
      #D#B#C#A#
      #D#B#C#C#
      #D#B#C#A#
      #########
      
    #############
    #AA.......AA# 7 + 5*10 + 8 + 5*10 + 2*7*100 + 4*10 + 8*100 + 5*10 + 6*10 + 7*10 + 6*10 + 4 + 6*100 + 5
    ###D#B#C#.###
      #D#B#C#.#
      #D#B#C#.#
      #D#B#C#.#
      #########
    
    #############
    #AA.......AA# 7 + 5*10 + 8 + 5*10 + 2*7*100 + 4*10 + 8*100 + 5*10 + 6*10 + 7*10 + 6*10 + 4 + 6*100 + 5 + 4*11*1000
    ###.#B#C#D###
      #.#B#C#D#
      #.#B#C#D#
      #.#B#C#D#
      #########
      
    #############
    #...........# 7 + 5*10 + 8 + 5*10 + 2*7*100 + 4*10 + 8*100 + 5*10 + 6*10 + 7*10 + 6*10 + 4 + 6*100 + 5 + 4*11*1000 + 5*2 + 9*2
    ###A#B#C#D###
      #A#B#C#D#
      #A#B#C#D#
      #A#B#C#D#
      #########
    `);
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
