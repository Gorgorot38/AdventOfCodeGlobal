import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D13Component } from './day-y2022-d13.component';

describe('DayY2022D13Component', () => {
  let component: DayY2022D13Component;
  let fixture: ComponentFixture<DayY2022D13Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D13Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
