import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D11Component } from './day-y2023-d11.component';

describe('DayY2023D11Component', () => {
  let component: DayY2023D11Component;
  let fixture: ComponentFixture<DayY2023D11Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D11Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
