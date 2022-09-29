import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D20Component } from './day-y2022-d20.component';

describe('DayY2022D20Component', () => {
  let component: DayY2022D20Component;
  let fixture: ComponentFixture<DayY2022D20Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
