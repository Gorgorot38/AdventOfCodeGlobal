import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D08Component } from './day-y2022-d08.component';

describe('DayY2022D08Component', () => {
  let component: DayY2022D08Component;
  let fixture: ComponentFixture<DayY2022D08Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D08Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
