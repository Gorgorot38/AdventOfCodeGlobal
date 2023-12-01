import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D01Component } from './day-y2023-d01.component';

describe('DayY2023D01Component', () => {
  let component: DayY2023D01Component;
  let fixture: ComponentFixture<DayY2023D01Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayY2023D01Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayY2023D01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
