import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearY2022Component } from './year-y2022.component';

describe('YearY2022Component', () => {
  let component: YearY2022Component;
  let fixture: ComponentFixture<YearY2022Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearY2022Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearY2022Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
