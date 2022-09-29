import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D09Component } from './day-y2022-d09.component';

describe('DayY2022D09Component', () => {
  let component: DayY2022D09Component;
  let fixture: ComponentFixture<DayY2022D09Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
