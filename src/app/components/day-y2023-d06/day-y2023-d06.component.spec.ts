import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D06Component } from './day-y2023-d06.component';

describe('DayY2023D06Component', () => {
  let component: DayY2023D06Component;
  let fixture: ComponentFixture<DayY2023D06Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D06Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D06Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
