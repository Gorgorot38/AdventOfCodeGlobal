import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D01Component } from './day-y2021-d01.component';

describe('DayY2021D01Component', () => {
  let component: DayY2021D01Component;
  let fixture: ComponentFixture<DayY2021D01Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D01Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
