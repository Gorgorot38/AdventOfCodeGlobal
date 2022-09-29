import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D06Component } from './day-y2022-d06.component';

describe('DayY2022D06Component', () => {
  let component: DayY2022D06Component;
  let fixture: ComponentFixture<DayY2022D06Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
