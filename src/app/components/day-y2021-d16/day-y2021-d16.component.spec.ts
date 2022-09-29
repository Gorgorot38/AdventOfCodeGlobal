import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D16Component } from './day-y2021-d16.component';

describe('DayY2021D16Component', () => {
  let component: DayY2021D16Component;
  let fixture: ComponentFixture<DayY2021D16Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D16Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
