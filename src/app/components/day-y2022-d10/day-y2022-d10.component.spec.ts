import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D10Component } from './day-y2022-d10.component';

describe('DayY2022D10Component', () => {
  let component: DayY2022D10Component;
  let fixture: ComponentFixture<DayY2022D10Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
