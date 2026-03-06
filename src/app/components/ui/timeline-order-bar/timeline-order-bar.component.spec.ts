import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineOrderBarComponent } from './timeline-order-bar.component';

describe('TimelineOrderBarComponent', () => {
  let component: TimelineOrderBarComponent;
  let fixture: ComponentFixture<TimelineOrderBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineOrderBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelineOrderBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
