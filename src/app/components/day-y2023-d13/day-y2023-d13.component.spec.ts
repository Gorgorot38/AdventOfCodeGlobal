import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D13Component } from './day-y2023-d13.component';

describe('DayY2023D13Component', () => {
  let component: DayY2023D13Component;
  let fixture: ComponentFixture<DayY2023D13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D13Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
