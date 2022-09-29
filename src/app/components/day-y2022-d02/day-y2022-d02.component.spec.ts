import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D02Component } from './day-y2022-d02.component';

describe('DayY2022D02Component', () => {
  let component: DayY2022D02Component;
  let fixture: ComponentFixture<DayY2022D02Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
