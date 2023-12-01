import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core'
import { Subject } from 'rxjs'
import { filter, takeUntil } from 'rxjs/operators'
import { SolverService } from 'src/app/services/solver.service'

@Component({
  selector: 'app-day-y2023-d01',
  templateUrl: './day-y2023-d01.component.html',
  styleUrls: ['./day-y2023-d01.component.scss'],
})
export class DayY2023D01Component implements OnInit, OnChanges, OnDestroy {
  @Input() data: string[] = []

  @Output() result: EventEmitter<string> = new EventEmitter<string>()

  private readonly _destroying = new Subject<void>()

  constructor(private readonly _solverService: SolverService) {}

  ngOnInit() {
    this._solverService.daySelect$
      .pipe(
        filter((d) => d.day === '22' && d.year === '2022'),
        takeUntil(this._destroying)
      )
      .subscribe((d) => {
        if (d.isPart1) this.solvePartOne()
        else this.solvePartTwo()
      })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      //do stuff
    }
  }

  solvePartOne() {
    return ''
  }

  solvePartTwo() {
    return ''
  }

  ngOnDestroy(): void {
    this._destroying.next()
    this._destroying.complete()
  }
}
