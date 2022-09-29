import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D18Component } from './day-y2022-d18.component';

describe('DayY2022D18Component', () => {
  let component: DayY2022D18Component;
  let fixture: ComponentFixture<DayY2022D18Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D18Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D18Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
