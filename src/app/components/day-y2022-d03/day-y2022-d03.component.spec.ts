import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D03Component } from './day-y2022-d03.component';

describe('DayY2022D03Component', () => {
  let component: DayY2022D03Component;
  let fixture: ComponentFixture<DayY2022D03Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D03Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
