import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D09Component } from './day-y2023-d09.component';

describe('DayY2023D09Component', () => {
  let component: DayY2023D09Component;
  let fixture: ComponentFixture<DayY2023D09Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D09Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D09Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
