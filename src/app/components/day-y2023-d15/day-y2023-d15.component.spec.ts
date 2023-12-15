import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D15Component } from './day-y2023-d15.component';

describe('DayY2023D15Component', () => {
  let component: DayY2023D15Component;
  let fixture: ComponentFixture<DayY2023D15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D15Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
