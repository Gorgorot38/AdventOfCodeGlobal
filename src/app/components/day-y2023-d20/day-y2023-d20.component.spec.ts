import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D20Component } from './day-y2023-d20.component';

describe('DayY2023D20Component', () => {
  let component: DayY2023D20Component;
  let fixture: ComponentFixture<DayY2023D20Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D20Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
