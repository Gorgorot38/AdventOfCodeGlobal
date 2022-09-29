import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D07Component } from './day-y2022-d07.component';

describe('DayY2022D07Component', () => {
  let component: DayY2022D07Component;
  let fixture: ComponentFixture<DayY2022D07Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
