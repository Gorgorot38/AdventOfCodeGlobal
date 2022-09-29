import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D21Component } from './day-y2021-d21.component';

describe('DayY2021D21Component', () => {
  let component: DayY2021D21Component;
  let fixture: ComponentFixture<DayY2021D21Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D21Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
