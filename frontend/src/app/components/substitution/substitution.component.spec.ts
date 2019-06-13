import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstitutionComponent } from './substitution.component';

describe('SubstitutionComponent', () => {
  let component: SubstitutionComponent;
  let fixture: ComponentFixture<SubstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
