import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DayY2022D12Component } from './day-y2022-d12.component';

describe('DayY2022D12Component', () => {
  let component: DayY2022D12Component;
  let fixture: ComponentFixture<DayY2022D12Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D12Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
