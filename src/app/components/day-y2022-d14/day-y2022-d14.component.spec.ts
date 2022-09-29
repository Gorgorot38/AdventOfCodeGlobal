import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D14Component } from './day-y2022-d14.component';

describe('DayY2022D14Component', () => {
  let component: DayY2022D14Component;
  let fixture: ComponentFixture<DayY2022D14Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D14Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
