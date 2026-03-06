import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineWorkcenterComponent } from './timeline-workcenter.component';

describe('TimelineWorkcenterComponent', () => {
  let component: TimelineWorkcenterComponent;
  let fixture: ComponentFixture<TimelineWorkcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineWorkcenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineWorkcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
