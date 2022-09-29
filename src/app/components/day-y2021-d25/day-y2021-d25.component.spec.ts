import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D25Component } from './day-y2021-d25.component';

describe('DayY2021D25Component', () => {
  let component: DayY2021D25Component;
  let fixture: ComponentFixture<DayY2021D25Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
