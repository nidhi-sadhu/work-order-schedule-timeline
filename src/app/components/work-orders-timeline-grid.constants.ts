import {
  Timescale,
  WorkCenterDocument,
  WorkOrderDocument,
  WorkOrderStatus,
} from './work-orders-timeline-grid.interfaces';

export const TimescaleOptions: { label: Timescale; value: Timescale }[] = [
  { label: Timescale.Day, value: Timescale.Day },
  { label: Timescale.Week, value: Timescale.Week },
  { label: Timescale.Month, value: Timescale.Month },
];

export const WORK_CENTERS: WorkCenterDocument[] = [
  {
    docId: 'wc-001',
    docType: 'workCenter',
    data: {
      name: 'Extrusion Line A',
    },
  },
  {
    docId: 'wc-002',
    docType: 'workCenter',
    data: {
      name: 'CNC Machine 1',
    },
  },
  {
    docId: 'wc-003',
    docType: 'workCenter',
    data: {
      name: 'Assembly Station',
    },
  },
  {
    docId: 'wc-004',
    docType: 'workCenter',
    data: {
      name: 'Quality Control',
    },
  },
  {
    docId: 'wc-005',
    docType: 'workCenter',
    data: {
      name: 'Packaging Line',
    },
  },
  {
    docId: 'wc-006',
    docType: 'workCenter',
    data: {
      name: 'Welding Bay 2',
    },
  },
];

export const WORK_ORDERS: WorkOrderDocument[] = [
  {
    docId: 'wo-001',
    docType: 'workOrder',
    data: {
      name: 'Aluminum Frame Batch #412',
      workCenterId: 'wc-001',
      status: WorkOrderStatus.Complete,
      startDate: '2026-01-10',
      endDate: '2026-02-05',
    },
  },
  {
    docId: 'wo-002',
    docType: 'workOrder',
    data: {
      name: 'Steel Rod Production',
      workCenterId: 'wc-001',
      status: WorkOrderStatus.InProgress,
      startDate: '2026-02-20',
      endDate: '2026-03-15',
    },
  },
  {
    docId: 'wo-003',
    docType: 'workOrder',
    data: {
      name: 'Precision Gear Set #87',
      workCenterId: 'wc-002',
      status: WorkOrderStatus.InProgress,
      startDate: '2026-02-10',
      endDate: '2026-03-08',
    },
  },
  {
    docId: 'wo-004',
    docType: 'workOrder',
    data: {
      name: 'Motor Housing Assembly',
      workCenterId: 'wc-003',
      status: WorkOrderStatus.Open,
      startDate: '2026-03-10',
      endDate: '2026-04-25',
    },
  },
  {
    docId: 'wo-005',
    docType: 'workOrder',
    data: {
      name: 'Circuit Board Inspection',
      workCenterId: 'wc-004',
      status: WorkOrderStatus.Blocked,
      startDate: '2026-02-15',
      endDate: '2026-03-20',
    },
  },
  {
    docId: 'wo-006',
    docType: 'workOrder',
    data: {
      name: 'Final Product Packaging',
      workCenterId: 'wc-005',
      status: WorkOrderStatus.Open,
      startDate: '2026-04-01',
      endDate: '2026-04-28',
    },
  },
  {
    docId: 'wo-007',
    docType: 'workOrder',
    data: {
      name: 'Exhaust Manifold Weld',
      workCenterId: 'wc-006',
      status: WorkOrderStatus.Complete,
      startDate: '2026-01-05',
      endDate: '2026-01-25',
    },
  },
  {
    docId: 'wo-008',
    docType: 'workOrder',
    data: {
      name: 'Chassis Frame Weld #55',
      workCenterId: 'wc-006',
      status: WorkOrderStatus.InProgress,
      startDate: '2026-02-15',
      endDate: '2026-03-05',
    },
  },
  {
    docId: 'wo-009',
    docType: 'workOrder',
    data: {
      name: 'Copper Wire Extrusion',
      workCenterId: 'wc-001',
      status: WorkOrderStatus.Open,
      startDate: '2026-05-01',
      endDate: '2026-05-20',
    },
  },
  {
    docId: 'wo-010',
    docType: 'workOrder',
    data: {
      name: 'Bearing Tolerance Check',
      workCenterId: 'wc-004',
      status: WorkOrderStatus.Complete,
      startDate: '2026-06-01',
      endDate: '2026-06-18',
    },
  },
];
