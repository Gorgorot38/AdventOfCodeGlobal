import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D18Component } from './day-y2021-d18.component';

describe('DayY2021D18Component', () => {
  let component: DayY2021D18Component;
  let fixture: ComponentFixture<DayY2021D18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
