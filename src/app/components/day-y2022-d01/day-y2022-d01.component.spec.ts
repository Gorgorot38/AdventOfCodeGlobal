import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D01Component } from './day-y2022-d01.component';

describe('DayY2022D01Component', () => {
  let component: DayY2022D01Component;
  let fixture: ComponentFixture<DayY2022D01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
