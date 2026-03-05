import { Component } from '@angular/core';
import { TimelineHeaderComponent } from '../../ui/timeline-header/timeline-header.component';
import { TimelineBodyComponent } from '../../ui/timeline-body/timeline-body.component';
import { TimelineFiltersComponent } from '../../ui/timeline-filters/timeline-filters.component';

@Component({
  selector: 'app-work-orders-timeline-grid',
  imports: [
    TimelineHeaderComponent,
    TimelineBodyComponent,
    TimelineFiltersComponent,
  ],
  templateUrl: './work-orders-timeline-grid.component.html',
  styleUrl: './work-orders-timeline-grid.component.scss',
})
export class WorkOrdersTimelineGridComponent {}
