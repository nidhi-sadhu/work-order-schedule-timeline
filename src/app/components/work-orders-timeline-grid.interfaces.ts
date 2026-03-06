// State
export interface WorkOrdersTimelineGridState {
  currentString: string;
  selectedTimescale: Timescale;
  currentView: string;
  workOrders: WorkOrderDocument[];
  workCenters: WorkCenterDocument[];
  panelOpen: boolean;
  panelMode: EventMode;
  editingWorkOrder: WorkOrderDocument | null;
  createContext: { workCenterId: string; startDate: string } | null;
}

// Enums
export enum Timescale {
  Day = 'Day',
  Week = 'Week',
  Month = 'Month',
}

export enum WorkOrderStatus {
  Open = 'open',
  InProgress = 'in-progress',
  Complete = 'complete',
  Blocked = 'blocked',
}

export enum EventMode {
  Create = 'create',
  Edit = 'edit',
}

export interface WorkCenterDocument {
  docId: string;
  docType: 'workCenter';
  data: {
    name: string;
  };
}

// Interfaces
export interface WorkOrderDocument {
  docId: string;
  docType: 'workOrder';
  data: {
    name: string;
    workCenterId: string; // References WorkCenterDocument.docId
    status: WorkOrderStatus;
    startDate: string; // ISO format (e.g., "2025-01-15")
    endDate: string; // ISO format
  };
}

export interface SelectOption<T> {
  label: string;
  value: T;
}

export interface BarPosition {
  workOrder: WorkOrderDocument;
  leftPx: number;
  widthPx: number;
}
