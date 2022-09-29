import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D19Component } from './day-y2021-d19.component';

describe('DayY2021D19Component', () => {
  let component: DayY2021D19Component;
  let fixture: ComponentFixture<DayY2021D19Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D19Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
