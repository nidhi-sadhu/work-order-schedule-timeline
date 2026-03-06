import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { WorkOrdersTimelineGridFacade } from '../../data-access/work-orders-timeline-grid.facade';
import {
  WorkOrderStatus,
  WorkOrderDocument,
  WorkCenterDocument,
  SelectOption,
  EventMode,
} from '../../work-orders-timeline-grid.interfaces';

@Component({
  selector: 'app-timeline-event',
  imports: [ReactiveFormsModule],
  templateUrl: './timeline-event.component.html',
  styleUrl: './timeline-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineEventComponent {
  readonly facade: WorkOrdersTimelineGridFacade = inject(
    WorkOrdersTimelineGridFacade,
  );
  private readonly fb: FormBuilder = inject(FormBuilder);

  form!: FormGroup;
  overlapError: boolean = false;

  readonly statusOptions: SelectOption<WorkOrderStatus>[] = [
    { label: 'Open', value: WorkOrderStatus.Open },
    { label: 'In Progress', value: WorkOrderStatus.InProgress },
    { label: 'Complete', value: WorkOrderStatus.Complete },
    { label: 'Blocked', value: WorkOrderStatus.Blocked },
  ];

  readonly workCenterOptions: Signal<SelectOption<string>[]> = computed(
    (): SelectOption<string>[] =>
      this.facade.workCenters().map(
        (wc: WorkCenterDocument): SelectOption<string> => ({
          label: wc.data.name,
          value: wc.docId,
        }),
      ),
  );

  constructor() {
    this.buildForm();

    this.form.valueChanges.subscribe((): void => {
      this.overlapError = false;
    });

    effect((): void => {
      const isOpen: boolean = this.facade.panelOpen();
      if (isOpen) {
        this.initForm();
      }
    });
  }
  private buildForm(): void {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        workCenterId: ['', Validators.required],
        status: [WorkOrderStatus.Open, Validators.required],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      },
      { validators: this.dateRangeValidator },
    );
  }

  private dateRangeValidator(group: AbstractControl): ValidationErrors | null {
    const startDate: string = group.get('startDate')?.value;
    const endDate: string = group.get('endDate')?.value;

    if (!startDate || !endDate) return null;

    const start: number = new Date(startDate).getTime();
    const end: number = new Date(endDate).getTime();

    if (end <= start) {
      return { dateRange: 'End date must be after start date' };
    }
    return null;
  }

  initForm(): void {
    const mode: EventMode = this.facade.panelMode();
    const editing: WorkOrderDocument | null = this.facade.editingWorkOrder();
    const context: { workCenterId: string; startDate: string } | null =
      this.facade.createContext();

    this.overlapError = false;

    if (mode === EventMode.Edit && editing) {
      this.form.patchValue({
        name: editing.data.name,
        workCenterId: editing.data.workCenterId,
        status: editing.data.status,
        startDate: editing.data.startDate,
        endDate: editing.data.endDate,
      });
    } else {
      const startDate: string =
        context?.startDate || new Date().toISOString().split('T')[0];
      const endDate: string = new Date(
        new Date(startDate).getTime() + 7 * 24 * 60 * 60 * 1000,
      )
        .toISOString()
        .split('T')[0];

      this.form.reset({
        name: '',
        workCenterId: context?.workCenterId || '',
        status: WorkOrderStatus.Open,
        startDate: startDate,
        endDate: endDate,
      });
    }

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const val: {
      name: string;
      workCenterId: string;
      status: WorkOrderStatus;
      startDate: string;
      endDate: string;
    } = this.form.value;

    const editing: WorkOrderDocument | null = this.facade.editingWorkOrder();
    const excludeId: string | undefined = editing?.docId;

    if (
      this.facade.hasOverlap(
        val.workCenterId,
        val.startDate,
        val.endDate,
        excludeId,
      )
    ) {
      this.overlapError = true;
      return;
    }

    this.overlapError = false;

    if (this.facade.panelMode() === EventMode.Edit && editing) {
      const updated: WorkOrderDocument = {
        ...editing,
        data: { ...val },
      };
      this.facade.updateWorkOrder(updated);
    } else {
      const newOrder: WorkOrderDocument = {
        docId: 'wo-' + Date.now(),
        docType: 'workOrder',
        data: { ...val },
      };
      this.facade.createWorkOrder(newOrder);
    }

    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset({
      name: '',
      workCenterId: '',
      status: WorkOrderStatus.Open,
      startDate: '',
      endDate: '',
    });
    this.overlapError = false;
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  onCancel(): void {
    this.resetForm();
    this.facade.closePanel();
  }

  onBackdropClick(): void {
    this.resetForm();
    this.facade.closePanel();
  }
}
