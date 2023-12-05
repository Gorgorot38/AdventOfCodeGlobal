import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D05Component } from './day-y2023-d05.component';

describe('DayY2023D05Component', () => {
  let component: DayY2023D05Component;
  let fixture: ComponentFixture<DayY2023D05Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D05Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D05Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
