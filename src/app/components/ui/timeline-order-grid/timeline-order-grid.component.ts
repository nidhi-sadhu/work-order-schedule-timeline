import { Component } from '@angular/core';
import { TimelineOrderBarComponent } from '../timeline-order-bar/timeline-order-bar.component';

@Component({
  selector: 'app-timeline-order-grid',
  imports: [TimelineOrderBarComponent],
  templateUrl: './timeline-order-grid.component.html',
  styleUrl: './timeline-order-grid.component.scss',
})
export class TimelineOrderGridComponent {}
