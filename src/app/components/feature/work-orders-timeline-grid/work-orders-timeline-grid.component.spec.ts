import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkOrdersTimelineGridComponent } from './work-orders-timeline-grid.component';

describe('WorkOrdersTimelineGridComponent', () => {
  let component: WorkOrdersTimelineGridComponent;
  let fixture: ComponentFixture<WorkOrdersTimelineGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkOrdersTimelineGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkOrdersTimelineGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
