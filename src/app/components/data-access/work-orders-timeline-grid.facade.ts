import { computed, Inject, inject, Injectable } from '@angular/core';
import { WorkOrdersTimelineGridStore } from './work-orders-timeline-grid.store';

@Injectable()
export class WorkOrdersTimelineGridFacade {
  private readonly store = inject(WorkOrdersTimelineGridStore);

  readonly currentString = computed(() => this.store.currentString());
}
