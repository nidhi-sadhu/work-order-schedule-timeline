import { Component } from '@angular/core';
import { TimelineWorkcenterComponent } from '../timeline-workcenter/timeline-workcenter.component';
import { TimelineOrderGridComponent } from '../timeline-order-grid/timeline-order-grid.component';

@Component({
  selector: 'app-timeline-body',
  imports: [TimelineWorkcenterComponent, TimelineOrderGridComponent],
  templateUrl: './timeline-body.component.html',
  styleUrl: './timeline-body.component.scss',
})
export class TimelineBodyComponent {}
