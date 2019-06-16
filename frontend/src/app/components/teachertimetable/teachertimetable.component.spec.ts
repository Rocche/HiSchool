import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachertimetableComponent } from './teachertimetable.component';

describe('TeachertimetableComponent', () => {
  let component: TeachertimetableComponent;
  let fixture: ComponentFixture<TeachertimetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachertimetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachertimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
