import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WorkOrdersTimelineGridComponent } from './components/feature/work-orders-timeline-grid/work-orders-timeline-grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WorkOrdersTimelineGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
