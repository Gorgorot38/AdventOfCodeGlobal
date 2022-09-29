import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D03Component } from './day-y2021-d03.component';

describe('DayY2021D03Component', () => {
  let component: DayY2021D03Component;
  let fixture: ComponentFixture<DayY2021D03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
