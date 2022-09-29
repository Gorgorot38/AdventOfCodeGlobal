import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D09Component } from './day-y2021-d09.component';

describe('DayY2021D09Component', () => {
  let component: DayY2021D09Component;
  let fixture: ComponentFixture<DayY2021D09Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D09Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
