import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2021D12Component } from './day-y2021-d12.component';

describe('DayY2021D12Component', () => {
  let component: DayY2021D12Component;
  let fixture: ComponentFixture<DayY2021D12Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
