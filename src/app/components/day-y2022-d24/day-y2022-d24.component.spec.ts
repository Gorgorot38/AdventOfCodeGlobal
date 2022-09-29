import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D24Component } from './day-y2022-d24.component';

describe('DayY2022D24Component', () => {
  let component: DayY2022D24Component;
  let fixture: ComponentFixture<DayY2022D24Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D24Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
