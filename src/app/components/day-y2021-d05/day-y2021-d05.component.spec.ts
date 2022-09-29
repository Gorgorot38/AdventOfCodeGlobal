import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D05Component } from './day-y2021-d05.component';

describe('DayY2021D05Component', () => {
  let component: DayY2021D05Component;
  let fixture: ComponentFixture<DayY2021D05Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D05Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
