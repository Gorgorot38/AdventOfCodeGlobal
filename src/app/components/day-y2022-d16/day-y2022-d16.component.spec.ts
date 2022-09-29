import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D16Component } from './day-y2022-d16.component';

describe('DayY2022D16Component', () => {
  let component: DayY2022D16Component;
  let fixture: ComponentFixture<DayY2022D16Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});