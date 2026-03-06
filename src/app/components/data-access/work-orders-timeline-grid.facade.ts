import { computed, inject, Injectable, Signal } from '@angular/core';
import { WorkOrdersTimelineGridStore } from './work-orders-timeline-grid.store';
import {
  Timescale,
  WorkCenterDocument,
  WorkOrderDocument,
} from '../work-orders-timeline-grid.interfaces';

@Injectable()
export class WorkOrdersTimelineGridFacade {
  private readonly store = inject(WorkOrdersTimelineGridStore);

  readonly currentString: Signal<string> = computed(() =>
    this.store.currentString(),
  );
  readonly selectedTimescale: Signal<Timescale> = computed(() =>
    this.store.selectedTimescale(),
  );
  readonly currentView: Signal<string> = computed(() =>
    this.store.currentView(),
  );
  readonly workOrders: Signal<WorkOrderDocument[]> = computed(() =>
    this.store.workOrders(),
  );
  readonly workCenters: Signal<WorkCenterDocument[]> = computed(() =>
    this.store.workCenters(),
  );
  readonly panelOpen: Signal<boolean> = computed(() => this.store.panelOpen());
  readonly panelMode = computed(() => this.store.panelMode());
  readonly editingWorkOrder: Signal<WorkOrderDocument | null> = computed(() =>
    this.store.editingWorkOrder(),
  );
  readonly createContext: Signal<{
    workCenterId: string;
    startDate: string;
  } | null> = computed(() => this.store.createContext());

  openCreatePanel(workCenterId: string, startDate: string): void {
    this.store.openCreatePanel(workCenterId, startDate);
  }

  openEditPanel(workOrder: WorkOrderDocument): void {
    this.store.openEditPanel(workOrder);
  }

  closePanel(): void {
    this.store.closePanel();
  }

  createWorkOrder(workOrder: WorkOrderDocument): void {
    this.store.createWorkOrder(workOrder);
  }

  updateWorkOrder(workOrder: WorkOrderDocument): void {
    this.store.updateWorkOrder(workOrder);
  }

  deleteWorkOrder(docId: string): void {
    this.store.deleteWorkOrder(docId);
  }

  hasOverlap(
    workCenterId: string,
    startDate: string,
    endDate: string,
    excludeDocId?: string,
  ): boolean {
    if (!workCenterId || !startDate || !endDate) return false;

    const orders: WorkOrderDocument[] = this.store
      .workOrders()
      .filter(
        (wo: WorkOrderDocument): boolean =>
          wo.data.workCenterId === workCenterId && wo.docId !== excludeDocId,
      );

    const newStart: number = new Date(startDate).getTime();
    const newEnd: number = new Date(endDate).getTime();

    if (newEnd <= newStart) return false;

    return orders.some((wo: WorkOrderDocument): boolean => {
      const woStart: number = new Date(wo.data.startDate).getTime();
      const woEnd: number = new Date(wo.data.endDate).getTime();
      return newStart < woEnd && newEnd > woStart;
    });
  }

  setSelectedTimescale(timescale: Timescale): void {
    this.store.setSelectedTimescale(timescale);
  }
}
