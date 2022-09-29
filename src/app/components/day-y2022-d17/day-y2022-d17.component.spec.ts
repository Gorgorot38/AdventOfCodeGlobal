import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D17Component } from './day-y2022-d17.component';

describe('DayY2022D17Component', () => {
  let component: DayY2022D17Component;
  let fixture: ComponentFixture<DayY2022D17Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D17Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
