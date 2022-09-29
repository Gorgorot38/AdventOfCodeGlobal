import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D24Component } from './day-y2021-d24.component';

describe('DayY2021D24Component', () => {
  let component: DayY2021D24Component;
  let fixture: ComponentFixture<DayY2021D24Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D24Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
