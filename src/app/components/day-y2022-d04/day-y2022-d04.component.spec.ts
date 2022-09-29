import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D04Component } from './day-y2022-d04.component';

describe('DayY2022D04Component', () => {
  let component: DayY2022D04Component;
  let fixture: ComponentFixture<DayY2022D04Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D04Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
