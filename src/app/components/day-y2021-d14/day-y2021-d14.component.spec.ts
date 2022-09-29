import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D14Component } from './day-y2021-d14.component';

describe('DayY2021D14Component', () => {
  let component: DayY2021D14Component;
  let fixture: ComponentFixture<DayY2021D14Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
