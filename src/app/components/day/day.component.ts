import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { SolverService } from 'src/app/services/solver.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit, OnDestroy {
  @Input() day: string;
  @Input() year: string;

  data: Observable<string[]> = EMPTY;
  result = '';
  currentPart = '';

  private readonly _destroying = new Subject<void>();

  constructor(private readonly httpClient: HttpClient, private readonly _solverService: SolverService) {}

  ngOnInit() {
    this.data = this.httpClient.get(this.buildFilePath(), { responseType: 'text' }).pipe(
      map((f) => f.split('\n')),
      takeUntil(this._destroying)
    );
  }

  buildFilePath(): string {
    return `assets/inputs/${this.year}/input_day${this.day}.txt`;
  }

  solvePartOne() {
    this._solverService.sendSelectedDay({ day: this.day, year: this.year, isPart1: true });
    this.currentPart = 'one';
  }

  solvePartTwo() {
    this._solverService.sendSelectedDay({ day: this.day, year: this.year, isPart1: false });
    this.currentPart = 'two';
  }

  catchResult(res: string) {
    this.result = res;
  }

  ngOnDestroy(): void {
    this._destroying.next();
    this._destroying.complete();
  }
}
