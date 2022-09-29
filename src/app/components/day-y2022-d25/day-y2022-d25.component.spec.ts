import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D25Component } from './day-y2022-d25.component';

describe('DayY2022D25Component', () => {
  let component: DayY2022D25Component;
  let fixture: ComponentFixture<DayY2022D25Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D25Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
