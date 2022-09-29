import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D15Component } from './day-y2021-d15.component';

describe('DayY2021D15Component', () => {
  let component: DayY2021D15Component;
  let fixture: ComponentFixture<DayY2021D15Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
