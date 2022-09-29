import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D15Component } from './day-y2022-d15.component';

describe('DayY2022D15Component', () => {
  let component: DayY2022D15Component;
  let fixture: ComponentFixture<DayY2022D15Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D15Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
