import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D17Component } from './day-y2021-d17.component';

describe('DayY2021D17Component', () => {
  let component: DayY2021D17Component;
  let fixture: ComponentFixture<DayY2021D17Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
