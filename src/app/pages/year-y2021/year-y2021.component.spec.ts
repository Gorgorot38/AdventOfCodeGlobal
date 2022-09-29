import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearY2021Component } from './year-y2021.component';

describe('YearY2021Component', () => {
  let component: YearY2021Component;
  let fixture: ComponentFixture<YearY2021Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearY2021Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearY2021Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
