import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Day } from '../models/day';

@Injectable({ providedIn: 'root' })
export class SolverService {
  private readonly _daySelect = new Subject<Day>();
  daySelect$ = this._daySelect.asObservable();

  sendSelectedDay(selectedDay: Day) {
    this._daySelect.next(selectedDay);
  }
}
