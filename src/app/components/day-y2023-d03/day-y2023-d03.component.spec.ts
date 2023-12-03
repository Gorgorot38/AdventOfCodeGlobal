import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D03Component } from './day-y2023-d03.component';

describe('DayY2023D03Component', () => {
  let component: DayY2023D03Component;
  let fixture: ComponentFixture<DayY2023D03Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D03Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D03Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
