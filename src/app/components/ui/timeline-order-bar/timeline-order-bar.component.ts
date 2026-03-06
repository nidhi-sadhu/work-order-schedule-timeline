import {
  Component,
  inject,
  input,
  computed,
  ChangeDetectionStrategy,
  InputSignal,
} from '@angular/core';
import {
  WorkCenterDocument,
  WorkOrderDocument,
  WorkOrderStatus,
} from '../../work-orders-timeline-grid.interfaces';
import { WorkOrdersTimelineGridFacade } from '../../data-access/work-orders-timeline-grid.facade';

@Component({
  selector: 'app-timeline-order-bar',
  imports: [],
  templateUrl: './timeline-order-bar.component.html',
  styleUrl: './timeline-order-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineOrderBarComponent {
  readonly workOrdersTimelineGridFacade: WorkOrdersTimelineGridFacade = inject(
    WorkOrdersTimelineGridFacade,
  );

  readonly workOrder: InputSignal<WorkOrderDocument> =
    input.required<WorkOrderDocument>();
  readonly leftPx: InputSignal<number> = input.required<number>();
  readonly widthPx: InputSignal<number> = input.required<number>();

  showMenu: boolean = false;
  hovered: boolean = false;

  readonly workCenterName = computed((): string => {
    const wc: WorkCenterDocument | undefined = this.workOrdersTimelineGridFacade
      .workCenters()
      .find(
        (wc: WorkCenterDocument): boolean =>
          wc.docId === this.workOrder().data.workCenterId,
      );
    return wc?.data.name || '';
  });

  readonly statusLabel = computed((): string => {
    const labels: Record<WorkOrderStatus, string> = {
      open: 'Open',
      'in-progress': 'In progress',
      complete: 'Complete',
      blocked: 'Blocked',
    };
    return labels[this.workOrder().data.status];
  });

  readonly statusClass = computed((): string => {
    return this.workOrder().data.status;
  });

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  onEdit(): void {
    this.showMenu = false;
    this.workOrdersTimelineGridFacade.openEditPanel(this.workOrder());
  }

  onDelete(): void {
    this.showMenu = false;
    this.workOrdersTimelineGridFacade.deleteWorkOrder(this.workOrder().docId);
  }
}
