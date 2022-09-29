import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D07Component } from './day-y2021-d07.component';

describe('DayY2021D07Component', () => {
  let component: DayY2021D07Component;
  let fixture: ComponentFixture<DayY2021D07Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D07Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
