import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D23Component } from './day-y2021-d23.component';

describe('DayY2021D23Component', () => {
  let component: DayY2021D23Component;
  let fixture: ComponentFixture<DayY2021D23Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D23Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
