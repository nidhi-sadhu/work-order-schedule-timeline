import {
  Component,
  computed,
  inject,
  effect,
  AfterViewInit,
  ElementRef,
  Signal,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TimelineOrderBarComponent } from '../timeline-order-bar/timeline-order-bar.component';
import { WorkOrdersTimelineGridFacade } from '../../data-access/work-orders-timeline-grid.facade';
import {
  BarPosition,
  Timescale,
  WorkCenterDocument,
  WorkOrderDocument,
} from '../../work-orders-timeline-grid.interfaces';

const MS_PER_DAY: number = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-timeline-order-grid',
  imports: [TimelineOrderBarComponent],
  templateUrl: './timeline-order-grid.component.html',
  styleUrl: './timeline-order-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineOrderGridComponent implements AfterViewInit {
  readonly timelineScroll =
    viewChild<ElementRef<HTMLDivElement>>('timelineScroll');

  readonly workOrdersTimelineGridFacade: WorkOrdersTimelineGridFacade = inject(
    WorkOrdersTimelineGridFacade,
  );

  readonly cellWidth: number = 150;
  readonly today: Date = new Date();

  readonly workCenters: Signal<WorkCenterDocument[]> = computed(
    (): WorkCenterDocument[] => this.workOrdersTimelineGridFacade.workCenters(),
  );

  readonly workOrders: Signal<WorkOrderDocument[]> = computed(
    (): WorkOrderDocument[] => this.workOrdersTimelineGridFacade.workOrders(),
  );

  readonly timeLineHeaders: Signal<string[]> = computed((): string[] => {
    switch (this.workOrdersTimelineGridFacade.selectedTimescale()) {
      case Timescale.Day:
        return this.generateDayHeaders();
      case Timescale.Week:
        return this.generateWeekHeaders();
      case Timescale.Month:
        return this.generateMonthHeaders();
    }
  });

  readonly currentIndex: Signal<number> = computed((): number => {
    switch (this.workOrdersTimelineGridFacade.selectedTimescale()) {
      case Timescale.Day:
        return 14;
      case Timescale.Week:
        return 8;
      case Timescale.Month:
        return 6;
    }
  });

  readonly timelineStart: Signal<Date> = computed((): Date => {
    switch (this.workOrdersTimelineGridFacade.selectedTimescale()) {
      case Timescale.Day: {
        const start: Date = new Date(this.today);
        start.setDate(start.getDate() - 14);
        return start;
      }
      case Timescale.Week: {
        const start: Date = new Date(this.today);
        start.setDate(start.getDate() - start.getDay() + 1 - 8 * 7);
        return start;
      }
      case Timescale.Month: {
        return new Date(this.today.getFullYear(), this.today.getMonth() - 6, 1);
      }
    }
  });

  readonly timelineEnd: Signal<Date> = computed((): Date => {
    switch (this.workOrdersTimelineGridFacade.selectedTimescale()) {
      case Timescale.Day: {
        const end: Date = new Date(this.today);
        end.setDate(end.getDate() + 15);
        return end;
      }
      case Timescale.Week: {
        const end: Date = new Date(this.today);
        end.setDate(end.getDate() - end.getDay() + 1 + 9 * 7);
        return end;
      }
      case Timescale.Month: {
        return new Date(this.today.getFullYear(), this.today.getMonth() + 7, 1);
      }
    }
  });

  readonly totalDays: Signal<number> = computed((): number => {
    const start: Date = this.timelineStart();
    const end: Date = this.timelineEnd();
    return (end.getTime() - start.getTime()) / MS_PER_DAY;
  });

  readonly totalWidth: Signal<number> = computed((): number => {
    return this.timeLineHeaders().length * this.cellWidth;
  });

  constructor() {
    effect((): void => {
      this.workOrdersTimelineGridFacade.selectedTimescale();
      this.scrollToCurrentPeriod();
    });
  }

  ngAfterViewInit(): void {
    this.scrollToCurrentPeriod();
  }

  scrollToCurrentPeriod(): void {
    setTimeout((): void => {
      const scrollEl: HTMLDivElement | undefined =
        this.timelineScroll()?.nativeElement;
      if (scrollEl) {
        const visibleWidth: number = scrollEl.clientWidth;
        const visibleCells: number = Math.floor(visibleWidth / this.cellWidth);
        const centerOffset: number = Math.floor(visibleCells / 2);
        const scrollTo: number =
          (this.currentIndex() - centerOffset) * this.cellWidth;
        scrollEl.scrollLeft = Math.max(0, scrollTo);
      }
    });
  }

  getOrdersForWorkCenter(workCenterId: string): BarPosition[] {
    const orders: WorkOrderDocument[] = this.workOrders().filter(
      (wo: WorkOrderDocument): boolean => wo.data.workCenterId === workCenterId,
    );
    const start: Date = this.timelineStart();
    const end: Date = this.timelineEnd();
    const timescale: Timescale =
      this.workOrdersTimelineGridFacade.selectedTimescale();
    const total: number = this.totalDays();
    const width: number = this.totalWidth();

    return orders
      .filter((wo: WorkOrderDocument): boolean => {
        const woStart: Date = new Date(wo.data.startDate);
        const woEnd: Date = new Date(wo.data.endDate);
        return woStart < end && woEnd > start;
      })
      .map((wo: WorkOrderDocument): BarPosition => {
        const woStart: Date = new Date(wo.data.startDate);
        const woEnd: Date = new Date(wo.data.endDate);

        let clampedStart: Date;
        let clampedEnd: Date;

        if (timescale === Timescale.Month) {
          clampedStart = new Date(
            Math.max(
              new Date(woStart.getFullYear(), woStart.getMonth(), 1).getTime(),
              start.getTime(),
            ),
          );
          clampedEnd = new Date(
            Math.min(
              new Date(woEnd.getFullYear(), woEnd.getMonth() + 1, 1).getTime(),
              end.getTime(),
            ),
          );
        } else if (timescale === Timescale.Week) {
          const woStartDay: number = woStart.getDay();
          const weekStart: Date = new Date(woStart);
          weekStart.setDate(
            woStart.getDate() - woStartDay + (woStartDay === 0 ? -6 : 1),
          );

          const woEndDay: number = woEnd.getDay();
          const weekEnd: Date = new Date(woEnd);
          weekEnd.setDate(
            woEnd.getDate() + (woEndDay === 0 ? 0 : 7 - woEndDay) + 1,
          );

          clampedStart = new Date(
            Math.max(weekStart.getTime(), start.getTime()),
          );
          clampedEnd = new Date(Math.min(weekEnd.getTime(), end.getTime()));
        } else {
          clampedStart = woStart < start ? start : woStart;
          clampedEnd = woEnd > end ? end : woEnd;
        }

        const startDays: number =
          (clampedStart.getTime() - start.getTime()) / MS_PER_DAY;
        const endDays: number =
          (clampedEnd.getTime() - start.getTime()) / MS_PER_DAY;

        const leftPx: number = (startDays / total) * width;
        const barWidth: number = ((endDays - startDays) / total) * width;

        return {
          workOrder: wo,
          leftPx: leftPx,
          widthPx: Math.max(barWidth, 40),
        };
      });
  }

  generateDayHeaders(): string[] {
    const headers: string[] = [];
    const start: Date = new Date(this.today);
    start.setDate(start.getDate() - 14);

    for (let i: number = 0; i < 29; i++) {
      const date: Date = new Date(start);
      date.setDate(date.getDate() + i);
      headers.push(
        date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      );
    }
    return headers;
  }

  generateWeekHeaders(): string[] {
    const headers: string[] = [];
    const start: Date = new Date(this.today);
    start.setDate(start.getDate() - start.getDay() + 1 - 8 * 7);

    for (let i: number = 0; i < 17; i++) {
      const weekStart: Date = new Date(start);
      weekStart.setDate(start.getDate() + i * 7);
      const weekEnd: Date = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const startStr: string = weekStart.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      const endStr: string = weekEnd.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      headers.push(`${startStr} - ${endStr}`);
    }
    return headers;
  }

  generateMonthHeaders(): string[] {
    const headers: string[] = [];
    const startMonth: number = this.today.getMonth() - 6;
    const startYear: number = this.today.getFullYear();

    for (let i: number = 0; i < 13; i++) {
      const date: Date = new Date(startYear, startMonth + i, 1);
      headers.push(
        date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      );
    }
    return headers;
  }

  onCellClick(workCenterId: string, cellIndex: number): void {
    const start: Date = this.timelineStart();
    const totalDays: number = this.totalDays();
    const headerCount: number = this.timeLineHeaders().length;
    const daysPerCell: number = totalDays / headerCount;
    const clickDate: Date = new Date(
      start.getTime() + cellIndex * daysPerCell * MS_PER_DAY,
    );
    const dateStr: string = clickDate.toISOString().split('T')[0];
    this.workOrdersTimelineGridFacade.openCreatePanel(workCenterId, dateStr);
  }
}
