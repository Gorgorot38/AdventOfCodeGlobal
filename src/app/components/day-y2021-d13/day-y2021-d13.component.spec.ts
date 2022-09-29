import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D13Component } from './day-y2021-d13.component';

describe('DayY2021D13Component', () => {
  let component: DayY2021D13Component;
  let fixture: ComponentFixture<DayY2021D13Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
