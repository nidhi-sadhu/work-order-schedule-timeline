import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineBodyComponent } from './timeline-body.component';

describe('TimelineBodyComponent', () => {
  let component: TimelineBodyComponent;
  let fixture: ComponentFixture<TimelineBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineBodyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
