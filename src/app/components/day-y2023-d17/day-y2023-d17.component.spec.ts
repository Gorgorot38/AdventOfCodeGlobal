import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D17Component } from './day-y2023-d17.component';

describe('DayY2023D17Component', () => {
  let component: DayY2023D17Component;
  let fixture: ComponentFixture<DayY2023D17Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D17Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D17Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
