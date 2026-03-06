import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineFiltersComponent } from './timeline-filters.component';

describe('TimelineFiltersComponent', () => {
  let component: TimelineFiltersComponent;
  let fixture: ComponentFixture<TimelineFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
