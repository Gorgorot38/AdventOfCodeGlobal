import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D23Component } from './day-y2022-d23.component';

describe('DayY2022D23Component', () => {
  let component: DayY2022D23Component;
  let fixture: ComponentFixture<DayY2022D23Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D23Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
