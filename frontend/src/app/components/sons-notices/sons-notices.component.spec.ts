import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonsNoticesComponent } from './sons-notices.component';

describe('SonsNoticesComponent', () => {
  let component: SonsNoticesComponent;
  let fixture: ComponentFixture<SonsNoticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonsNoticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonsNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
