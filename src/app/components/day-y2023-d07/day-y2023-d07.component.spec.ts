import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D07Component } from './day-y2023-d07.component';

describe('DayY2023D07Component', () => {
  let component: DayY2023D07Component;
  let fixture: ComponentFixture<DayY2023D07Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D07Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D07Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
