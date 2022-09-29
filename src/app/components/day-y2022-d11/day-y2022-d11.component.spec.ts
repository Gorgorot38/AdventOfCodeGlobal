import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D11Component } from './day-y2022-d11.component';

describe('DayY2022D11Component', () => {
  let component: DayY2022D11Component;
  let fixture: ComponentFixture<DayY2022D11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
