import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingtableComponent } from './meetingtable.component';

describe('MeetingtableComponent', () => {
  let component: MeetingtableComponent;
  let fixture: ComponentFixture<MeetingtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
