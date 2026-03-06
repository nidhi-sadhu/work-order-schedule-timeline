import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  EventMode,
  Timescale,
  WorkOrderDocument,
  WorkOrdersTimelineGridState,
} from '../work-orders-timeline-grid.interfaces';
import { withLoadingStatus } from '../../shared/store-features/loading-status.feature';
import { setProp } from '../../shared/store-features/state-updater';
import { computed, Signal } from '@angular/core';
import {
  WORK_CENTERS,
  WORK_ORDERS,
} from '../work-orders-timeline-grid.constants';

const state: WorkOrdersTimelineGridState = {
  currentString: '',
  selectedTimescale: Timescale.Day,
  currentView: Timescale.Day,
  workOrders: WORK_ORDERS,
  workCenters: WORK_CENTERS,
  panelOpen: false,
  panelMode: EventMode.Create,
  editingWorkOrder: null,
  createContext: null,
};

export const WorkOrdersTimelineGridStore = signalStore(
  withState<WorkOrdersTimelineGridState>(state),
  withLoadingStatus(),
  withComputed((store): { currentView: Signal<string> } => ({
    currentView: computed((): string => {
      const scale: Timescale = store.selectedTimescale();
      if (scale === Timescale.Day) return 'Current Day';
      if (scale === Timescale.Week) return 'Current Week';
      return 'Current Month';
    }),
  })),
  withMethods((store) => {
    return {
      setSelectedTimescale: (timescale: Timescale) =>
        patchState(store, setProp('selectedTimescale', timescale)),
      openCreatePanel: (workCenterId: string, startDate: string) =>
        patchState(
          store,
          setProp('panelOpen', true),
          setProp('panelMode', EventMode.Create),
          setProp('editingWorkOrder', null),
          setProp('createContext', { workCenterId, startDate }),
        ),
      openEditPanel: (workOrder: WorkOrderDocument) =>
        patchState(
          store,
          setProp('panelOpen', true),
          setProp('panelMode', EventMode.Edit),
          setProp('editingWorkOrder', workOrder),
          setProp('createContext', null),
        ),
      closePanel: () =>
        patchState(
          store,
          setProp('panelOpen', false),
          setProp('editingWorkOrder', null),
          setProp('createContext', null),
        ),
      createWorkOrder: (workOrder: WorkOrderDocument) =>
        patchState(
          store,
          setProp('workOrders', [...store.workOrders(), workOrder]),
          setProp('panelOpen', false),
          setProp('createContext', null),
        ),
      updateWorkOrder: (updated: WorkOrderDocument) =>
        patchState(
          store,
          setProp(
            'workOrders',
            store
              .workOrders()
              .map(
                (wo: WorkOrderDocument): WorkOrderDocument =>
                  wo.docId === updated.docId ? updated : wo,
              ),
          ),
          setProp('panelOpen', false),
          setProp('editingWorkOrder', null),
        ),
      deleteWorkOrder: (docId: string) =>
        patchState(
          store,
          setProp(
            'workOrders',
            store
              .workOrders()
              .filter((wo: WorkOrderDocument): boolean => wo.docId !== docId),
          ),
        ),
    };
  }),
  withHooks({
    onInit: ({}): void => {},
  }),
);
