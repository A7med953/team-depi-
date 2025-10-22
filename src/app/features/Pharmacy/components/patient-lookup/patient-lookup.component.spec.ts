import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientLookupComponent } from './patient-lookup.component';

describe('PatientLookupComponent', () => {
  let component: PatientLookupComponent;
  let fixture: ComponentFixture<PatientLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientLookupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
