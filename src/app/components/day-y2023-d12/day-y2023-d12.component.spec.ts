import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D12Component } from './day-y2023-d12.component';

describe('DayY2023D12Component', () => {
  let component: DayY2023D12Component;
  let fixture: ComponentFixture<DayY2023D12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D12Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
