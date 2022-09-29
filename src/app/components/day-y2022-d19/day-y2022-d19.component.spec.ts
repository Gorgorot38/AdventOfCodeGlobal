import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D19Component } from './day-y2022-d19.component';

describe('DayY2022D19Component', () => {
  let component: DayY2022D19Component;
  let fixture: ComponentFixture<DayY2022D19Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D19Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
