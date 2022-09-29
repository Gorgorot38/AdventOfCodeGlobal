import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D10Component } from './day-y2021-d10.component';

describe('DayY2021D10Component', () => {
  let component: DayY2021D10Component;
  let fixture: ComponentFixture<DayY2021D10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
