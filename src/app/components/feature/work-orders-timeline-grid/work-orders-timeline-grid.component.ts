import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TimelineHeaderComponent } from '../../ui/timeline-header/timeline-header.component';
import { TimelineBodyComponent } from '../../ui/timeline-body/timeline-body.component';
import { TimelineFiltersComponent } from '../../ui/timeline-filters/timeline-filters.component';
import { WorkOrdersTimelineGridStore } from '../../data-access/work-orders-timeline-grid.store';
import { WorkOrdersTimelineGridFacade } from '../../data-access/work-orders-timeline-grid.facade';

@Component({
  selector: 'app-work-orders-timeline-grid',
  imports: [
    TimelineHeaderComponent,
    TimelineBodyComponent,
    TimelineFiltersComponent,
  ],
  templateUrl: './work-orders-timeline-grid.component.html',
  styleUrl: './work-orders-timeline-grid.component.scss',
  providers: [WorkOrdersTimelineGridFacade, WorkOrdersTimelineGridStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkOrdersTimelineGridComponent {
  workOrdersTimelineGridFacade: WorkOrdersTimelineGridFacade = inject(
    WorkOrdersTimelineGridFacade,
  );
}
