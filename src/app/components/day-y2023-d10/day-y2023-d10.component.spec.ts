import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D10Component } from './day-y2023-d10.component';

describe('DayY2023D10Component', () => {
  let component: DayY2023D10Component;
  let fixture: ComponentFixture<DayY2023D10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D10Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
