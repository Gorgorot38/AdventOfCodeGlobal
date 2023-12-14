import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D14Component } from './day-y2023-d14.component';

describe('DayY2023D14Component', () => {
  let component: DayY2023D14Component;
  let fixture: ComponentFixture<DayY2023D14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D14Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
