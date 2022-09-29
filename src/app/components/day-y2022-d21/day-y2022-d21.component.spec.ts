import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D21Component } from './day-y2022-d21.component';

describe('DayY2022D21Component', () => {
  let component: DayY2022D21Component;
  let fixture: ComponentFixture<DayY2022D21Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
