import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayY2023D02Component } from './day-y2023-d02.component';

describe('DayY2023D02Component', () => {
  let component: DayY2023D02Component;
  let fixture: ComponentFixture<DayY2023D02Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayY2023D02Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayY2023D02Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
