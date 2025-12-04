import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  prescribedDate: string;
  doctor: string;
  purpose: string;
  status: 'active' | 'inactive';
}

export interface MedicalCondition {
  id: string;
  name: string;
  diagnosedYear: string;
  status: string;
  lastChecked: string;
  type: 'chronic' | 'acute';
}

export interface Allergy {
  id: string;
  name: string;
  allergyType: string;
  reaction: string;
  documentedYear: string;
  severity: 'severe' | 'moderate' | 'mild';
}

export interface MedicalRecords {
  medications: Medication[];
  conditions: MedicalCondition[];
  allergies: Allergy[];
}

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordsService {
  private medicationsSubject = new BehaviorSubject<Medication[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg daily',
      prescribedDate: 'Jan 15, 2024',
      doctor: 'Dr. Smith',
      purpose: 'Blood pressure control',
      status: 'active'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg twice daily',
      prescribedDate: 'Mar 10, 2024',
      doctor: 'Dr. Johnson',
      purpose: 'Diabetes management',
      status: 'active'
    }
  ]);

  private conditionsSubject = new BehaviorSubject<MedicalCondition[]>([
    {
      id: '1',
      name: 'Hypertension',
      diagnosedYear: '2020',
      status: 'Under control',
      lastChecked: 'Sep 10, 2024',
      type: 'chronic'
    },
    {
      id: '2',
      name: 'Type 2 Diabetes',
      diagnosedYear: '2022',
      status: 'Managed with medication',
      lastChecked: 'Aug 20, 2024',
      type: 'chronic'
    }
  ]);

  private allergiesSubject = new BehaviorSubject<Allergy[]>([
    {
      id: '1',
      name: 'Penicillin',
      allergyType: 'Drug allergy',
      reaction: 'Anaphylaxis',
      documentedYear: '2015',
      severity: 'severe'
    },
    {
      id: '2',
      name: 'Peanuts',
      allergyType: 'Food allergy',
      reaction: 'Hives, swelling',
      documentedYear: '2010',
      severity: 'moderate'
    }
  ]);

  public medications$: Observable<Medication[]> = this.medicationsSubject.asObservable();
  public conditions$: Observable<MedicalCondition[]> = this.conditionsSubject.asObservable();
  public allergies$: Observable<Allergy[]> = this.allergiesSubject.asObservable();

  constructor() { }

  // Medication CRUD operations
  getMedications(): Medication[] {
    return this.medicationsSubject.value;
  }

  addMedication(medication: Omit<Medication, 'id'>): void {
    const newMedication: Medication = {
      ...medication,
      id: this.generateId()
    };
    const currentMedications = this.medicationsSubject.value;
    this.medicationsSubject.next([...currentMedications, newMedication]);
  }

  updateMedication(id: string, medication: Partial<Medication>): void {
    const currentMedications = this.medicationsSubject.value;
    const updatedMedications = currentMedications.map(med =>
      med.id === id ? { ...med, ...medication } : med
    );
    this.medicationsSubject.next(updatedMedications);
  }

  deleteMedication(id: string): void {
    const currentMedications = this.medicationsSubject.value;
    const filteredMedications = currentMedications.filter(med => med.id !== id);
    this.medicationsSubject.next(filteredMedications);
  }

  // Medical Condition CRUD operations
  getConditions(): MedicalCondition[] {
    return this.conditionsSubject.value;
  }

  addCondition(condition: Omit<MedicalCondition, 'id'>): void {
    const newCondition: MedicalCondition = {
      ...condition,
      id: this.generateId()
    };
    const currentConditions = this.conditionsSubject.value;
    this.conditionsSubject.next([...currentConditions, newCondition]);
  }

  updateCondition(id: string, condition: Partial<MedicalCondition>): void {
    const currentConditions = this.conditionsSubject.value;
    const updatedConditions = currentConditions.map(cond =>
      cond.id === id ? { ...cond, ...condition } : cond
    );
    this.conditionsSubject.next(updatedConditions);
  }

  deleteCondition(id: string): void {
    const currentConditions = this.conditionsSubject.value;
    const filteredConditions = currentConditions.filter(cond => cond.id !== id);
    this.conditionsSubject.next(filteredConditions);
  }

  // Allergy CRUD operations
  getAllergies(): Allergy[] {
    return this.allergiesSubject.value;
  }

  addAllergy(allergy: Omit<Allergy, 'id'>): void {
    const newAllergy: Allergy = {
      ...allergy,
      id: this.generateId()
    };
    const currentAllergies = this.allergiesSubject.value;
    this.allergiesSubject.next([...currentAllergies, newAllergy]);
  }

  updateAllergy(id: string, allergy: Partial<Allergy>): void {
    const currentAllergies = this.allergiesSubject.value;
    const updatedAllergies = currentAllergies.map(alg =>
      alg.id === id ? { ...alg, ...allergy } : alg
    );
    this.allergiesSubject.next(updatedAllergies);
  }

  deleteAllergy(id: string): void {
    const currentAllergies = this.allergiesSubject.value;
    const filteredAllergies = currentAllergies.filter(alg => alg.id !== id);
    this.allergiesSubject.next(filteredAllergies);
  }

  // Utility method to generate unique IDs
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
