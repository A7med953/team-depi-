import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { 
  MedicalRecordsService, 
  Medication, 
  MedicalCondition, 
  Allergy 
} from '../../services/medical-records.service';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './medical-records.component.html',
  styleUrl: './medical-records.component.css'
})
export class MedicalRecordsComponent implements OnInit, OnDestroy {
  medications: Medication[] = [];
  conditions: MedicalCondition[] = [];
  allergies: Allergy[] = [];
  
  private destroy$ = new Subject<void>();
  private medicalRecordsService = inject(MedicalRecordsService);

  // Mock doctors list
  doctors: string[] = [
    'Dr. Smith',
    'Dr. Johnson',
    'Dr. Williams',
    'Dr. Brown',
    'Dr. Jones',
    'Dr. Garcia',
    'Dr. Miller',
    'Dr. Davis',
    'Dr. Rodriguez',
    'Dr. Martinez'
  ];

  // Form states
  showMedicationForm = false;
  showConditionForm = false;
  showAllergyForm = false;

  // Edit modes
  editingMedicationId: string | null = null;
  editingConditionId: string | null = null;
  editingAllergyId: string | null = null;

  // Form models
  medicationForm: Omit<Medication, 'id'> = {
    name: '',
    dosage: '',
    prescribedDate: '',
    doctor: '',
    purpose: '',
    status: 'active'
  };

  conditionForm: Omit<MedicalCondition, 'id'> = {
    name: '',
    diagnosedYear: '',
    status: '',
    lastChecked: '',
    type: 'chronic'
  };

  allergyForm: Omit<Allergy, 'id'> = {
    name: '',
    allergyType: '',
    reaction: '',
    documentedYear: '',
    severity: 'moderate'
  };

  // Helper method to format date from YYYY-MM-DD to MMM DD, YYYY
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  ngOnInit(): void {
    this.medicalRecordsService.medications$
      .pipe(takeUntil(this.destroy$))
      .subscribe(medications => {
        this.medications = medications;
      });

    this.medicalRecordsService.conditions$
      .pipe(takeUntil(this.destroy$))
      .subscribe(conditions => {
        this.conditions = conditions;
      });

    this.medicalRecordsService.allergies$
      .pipe(takeUntil(this.destroy$))
      .subscribe(allergies => {
        this.allergies = allergies;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Medication methods
  toggleMedicationForm(): void {
    this.showMedicationForm = !this.showMedicationForm;
    if (!this.showMedicationForm) {
      this.resetMedicationForm();
    }
  }

  resetMedicationForm(): void {
    this.medicationForm = {
      name: '',
      dosage: '',
      prescribedDate: '',
      doctor: '',
      purpose: '',
      status: 'active'
    };
    this.editingMedicationId = null;
  }

  saveMedication(): void {
    const formattedMedication = {
      ...this.medicationForm,
      prescribedDate: this.formatDate(this.medicationForm.prescribedDate)
    };
    
    if (this.editingMedicationId) {
      this.medicalRecordsService.updateMedication(this.editingMedicationId, formattedMedication);
    } else {
      this.medicalRecordsService.addMedication(formattedMedication);
    }
    this.showMedicationForm = false;
    this.resetMedicationForm();
  }

  editMedication(medication: Medication): void {
    this.editingMedicationId = medication.id;
    // Convert date from "MMM DD, YYYY" to "YYYY-MM-DD" for date input
    const date = new Date(medication.prescribedDate);
    const formattedDate = date.toISOString().split('T')[0];
    
    this.medicationForm = {
      name: medication.name,
      dosage: medication.dosage,
      prescribedDate: formattedDate,
      doctor: medication.doctor,
      purpose: medication.purpose,
      status: medication.status
    };
    this.showMedicationForm = true;
  }

  deleteMedication(id: string): void {
    this.medicalRecordsService.deleteMedication(id);
  }

  // Condition methods
  toggleConditionForm(): void {
    this.showConditionForm = !this.showConditionForm;
    if (!this.showConditionForm) {
      this.resetConditionForm();
    }
  }

  resetConditionForm(): void {
    this.conditionForm = {
      name: '',
      diagnosedYear: '',
      status: '',
      lastChecked: '',
      type: 'chronic'
    };
    this.editingConditionId = null;
  }

  saveCondition(): void {
       const formattedCondition = {
      ...this.conditionForm,
      prescribedDate: this.formatDate(this.conditionForm.lastChecked)
    };

    if (this.editingConditionId) {
      this.medicalRecordsService.updateCondition(this.editingConditionId, formattedCondition);
    } else {
      this.medicalRecordsService.addCondition(formattedCondition);
    }
    this.showConditionForm = false;
    this.resetConditionForm();
  }

  editCondition(condition: MedicalCondition): void {
    this.editingConditionId = condition.id;
    this.conditionForm = {
      name: condition.name,
      diagnosedYear: condition.diagnosedYear,
      status: condition.status,
      lastChecked: condition.lastChecked,
      type: condition.type
    };
    this.showConditionForm = true;
  }

  deleteCondition(id: string): void {
    this.medicalRecordsService.deleteCondition(id);
  }

  // Allergy methods
  toggleAllergyForm(): void {
    this.showAllergyForm = !this.showAllergyForm;
    if (!this.showAllergyForm) {
      this.resetAllergyForm();
    }
  }

  resetAllergyForm(): void {
    this.allergyForm = {
      name: '',
      allergyType: '',
      reaction: '',
      documentedYear: '',
      severity: 'moderate'
    };
    this.editingAllergyId = null;
  }

  saveAllergy(): void {
    if (this.editingAllergyId) {
      this.medicalRecordsService.updateAllergy(this.editingAllergyId, this.allergyForm);
    } else {
      this.medicalRecordsService.addAllergy(this.allergyForm);
    }
    this.showAllergyForm = false;
    this.resetAllergyForm();
  }

  editAllergy(allergy: Allergy): void {
    this.editingAllergyId = allergy.id;
    this.allergyForm = {
      name: allergy.name,
      allergyType: allergy.allergyType,
      reaction: allergy.reaction,
      documentedYear: allergy.documentedYear,
      severity: allergy.severity
    };
    this.showAllergyForm = true;
  }

  deleteAllergy(id: string): void {
    this.medicalRecordsService.deleteAllergy(id);
  }
}
