import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D02Component } from './day-y2021-d02.component';

describe('DayY2021D02Component', () => {
  let component: DayY2021D02Component;
  let fixture: ComponentFixture<DayY2021D02Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D02Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
