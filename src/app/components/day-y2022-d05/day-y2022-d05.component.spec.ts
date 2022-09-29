import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D05Component } from './day-y2022-d05.component';

describe('DayY2022D05Component', () => {
  let component: DayY2022D05Component;
  let fixture: ComponentFixture<DayY2022D05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
