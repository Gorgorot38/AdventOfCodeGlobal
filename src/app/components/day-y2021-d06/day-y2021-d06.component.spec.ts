import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D06Component } from './day-y2021-d06.component';

describe('DayY2021D06Component', () => {
  let component: DayY2021D06Component;
  let fixture: ComponentFixture<DayY2021D06Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D06Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
