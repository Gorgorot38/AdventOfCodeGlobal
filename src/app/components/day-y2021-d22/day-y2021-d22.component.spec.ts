import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2021D22Component } from './day-y2021-d22.component';

describe('DayY2021D22Component', () => {
  let component: DayY2021D22Component;
  let fixture: ComponentFixture<DayY2021D22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2021D22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2021D22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
