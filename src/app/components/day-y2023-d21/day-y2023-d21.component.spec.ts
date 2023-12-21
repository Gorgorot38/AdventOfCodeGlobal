import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D21Component } from './day-y2023-d21.component';

describe('DayY2023D21Component', () => {
  let component: DayY2023D21Component;
  let fixture: ComponentFixture<DayY2023D21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D21Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
