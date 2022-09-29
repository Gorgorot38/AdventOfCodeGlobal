import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D20Component } from './day-y2021-d20.component';

describe('DayY2021D20Component', () => {
  let component: DayY2021D20Component;
  let fixture: ComponentFixture<DayY2021D20Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D20Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
