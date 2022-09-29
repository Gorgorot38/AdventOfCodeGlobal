import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D08Component } from './day-y2021-d08.component';

describe('DayY2021D08Component', () => {
  let component: DayY2021D08Component;
  let fixture: ComponentFixture<DayY2021D08Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D08Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D08Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
