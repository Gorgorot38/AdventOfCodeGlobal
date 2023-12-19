import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D19Component } from './day-y2023-d19.component';

describe('DayY2023D19Component', () => {
  let component: DayY2023D19Component;
  let fixture: ComponentFixture<DayY2023D19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D19Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
