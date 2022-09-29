import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D11Component } from './day-y2021-d11.component';

describe('DayY2021D11Component', () => {
  let component: DayY2021D11Component;
  let fixture: ComponentFixture<DayY2021D11Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
