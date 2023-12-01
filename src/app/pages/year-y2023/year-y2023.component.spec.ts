import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearY2023Component } from './year-y2023.component';

describe('YearY2023Component', () => {
  let component: YearY2023Component;
  let fixture: ComponentFixture<YearY2023Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearY2023Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearY2023Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
