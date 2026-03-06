import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WORK_CENTERS } from '../../work-orders-timeline-grid.constants';
import { WorkCenterDocument } from '../../work-orders-timeline-grid.interfaces';

@Component({
  selector: 'app-timeline-workcenter',
  imports: [],
  templateUrl: './timeline-workcenter.component.html',
  styleUrl: './timeline-workcenter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineWorkcenterComponent {
  workCenters: WorkCenterDocument[] = WORK_CENTERS;
}
