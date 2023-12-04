import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D04Component } from './day-y2023-d04.component';

describe('DayY2023D04Component', () => {
  let component: DayY2023D04Component;
  let fixture: ComponentFixture<DayY2023D04Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D04Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D04Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
