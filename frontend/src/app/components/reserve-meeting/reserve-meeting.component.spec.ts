import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveMeetingComponent } from './reserve-meeting.component';

describe('ReserveMeetingComponent', () => {
  let component: ReserveMeetingComponent;
  let fixture: ComponentFixture<ReserveMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
