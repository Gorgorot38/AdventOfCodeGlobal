import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2022D22Component } from './day-y2022-d22.component';

describe('DayY2022D22Component', () => {
  let component: DayY2022D22Component;
  let fixture: ComponentFixture<DayY2022D22Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayY2022D22Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayY2022D22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
