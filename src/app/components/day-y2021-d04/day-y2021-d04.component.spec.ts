import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D04Component } from './day-y2021-d04.component';

describe('DayY2021D04Component', () => {
  let component: DayY2021D04Component;
  let fixture: ComponentFixture<DayY2021D04Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
