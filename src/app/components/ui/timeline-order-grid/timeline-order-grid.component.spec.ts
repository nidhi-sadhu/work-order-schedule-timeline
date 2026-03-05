import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineOrderGridComponent } from './timeline-order-grid.component';

describe('TimelineOrderGridComponent', () => {
  let component: TimelineOrderGridComponent;
  let fixture: ComponentFixture<TimelineOrderGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineOrderGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineOrderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
