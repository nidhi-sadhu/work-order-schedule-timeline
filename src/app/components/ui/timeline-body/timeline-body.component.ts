import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TimelineWorkcenterComponent } from '../timeline-workcenter/timeline-workcenter.component';
import { TimelineOrderGridComponent } from '../timeline-order-grid/timeline-order-grid.component';
import { TimelineEventComponent } from '../timeline-event/timeline-event.component';

@Component({
  selector: 'app-timeline-body',
  imports: [
    TimelineWorkcenterComponent,
    TimelineOrderGridComponent,
    TimelineEventComponent,
  ],
  templateUrl: './timeline-body.component.html',
  styleUrl: './timeline-body.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineBodyComponent {}
