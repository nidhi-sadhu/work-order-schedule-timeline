import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { WorkOrdersTimelineGridFacade } from '../../data-access/work-orders-timeline-grid.facade';
import { FormsModule } from '@angular/forms';
import { TimescaleOptions } from '../../work-orders-timeline-grid.constants';
import { Timescale } from '../../work-orders-timeline-grid.interfaces';

@Component({
  selector: 'app-timeline-filters',
  imports: [NgSelectModule, FormsModule],
  templateUrl: './timeline-filters.component.html',
  styleUrl: './timeline-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineFiltersComponent {
  workOrdersTimelineGridFacade: WorkOrdersTimelineGridFacade = inject(
    WorkOrdersTimelineGridFacade,
  );
  timescaleOptions: { label: Timescale; value: Timescale }[] = TimescaleOptions;
}
