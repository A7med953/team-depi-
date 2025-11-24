import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MedicalInfo {
  bloodType: string;
  allergies: string;
  currentMedications: string;
  medicalConditions: string;
}

interface FamilyHistory {
  father: string;
  mother: string;
  siblings: string;
}

interface GeneralHealth {
  height: string;
  weight: string;
  smokingStatus: string;
  alcoholConsumption: string;
}

interface Investigations {
  lastBloodTest: string;
  imagingStudies: string;
  otherTests: string;
}

interface TestResults {
  bloodSugar: string;
  cholesterol: string;
  otherTests: string;
}

interface Patient {
  name: string;
  id: string;
  dob: Date | string;
  gender: string;
  contactNumber: string;
  email: string;
  address: string;
  image?: string;
  medicalInfo: MedicalInfo;
  familyHistory: FamilyHistory;
  generalHealth: GeneralHealth;
  investigations: Investigations;
  testResults: TestResults;
  hospitalization?: {
    lastHospitalization: string;
    reason: string;
    treatment: string;
  };
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  isEditingPersonal = false;

  editedPatient: Patient = this.createEmptyPatient();

  patient: Patient = this.createEmptyPatient();

  constructor() {}

  ngOnInit(): void {
    this.loadPatientData();
  }

  private createEmptyPatient(): Patient {
    return {
      name: '',
      id: '',
      dob: new Date(),
      gender: '',
      contactNumber: '',
      email: '',
      address: '',
      image: '',
      medicalInfo: {
        bloodType: '',
        allergies: '',
        currentMedications: '',
        medicalConditions: ''
      },
      familyHistory: {
        father: '',
        mother: '',
        siblings: ''
      },
      generalHealth: {
        height: '',
        weight: '',
        smokingStatus: '',
        alcoholConsumption: ''
      },
      investigations: {
        lastBloodTest: '',
        imagingStudies: '',
        otherTests: ''
      },
      testResults: {
        bloodSugar: '',
        cholesterol: '',
        otherTests: ''
      },
      hospitalization: {
        lastHospitalization: '',
        reason: '',
        treatment: ''
      }
    };
  }

  loadPatientData(): void {
    this.patient = {
      image: 'Images/Patient-image.png',
      name: 'John Doe',
      id: '1234-5678-9101-1121',
      dob: new Date('1990-01-01'),
      gender: 'Male',
      contactNumber: '(123) 456-7890',
      email: 'johndoe@example.com',
      address: '123 Main St, Anytown, USA',
      medicalInfo: {
        bloodType: 'O+',
        allergies: 'None',
        currentMedications: 'None',
        medicalConditions: 'None'
      },
      familyHistory: {
        father: 'Hypertension',
        mother: 'Diabetes',
        siblings: 'None'
      },
      generalHealth: {
        height: "5'6\"",
        weight: '150 lbs',
        smokingStatus: 'Non-smoker',
        alcoholConsumption: 'Occasional'
      },
      investigations: {
        lastBloodTest: 'January 2024 - Normal',
        imagingStudies: 'Ultrasound - Normal',
        otherTests: 'None'
      },
      testResults: {
        bloodSugar: '90 mg/dL - Normal',
        cholesterol: '180 mg/dL - Normal',
        otherTests: 'None'
      },
      hospitalization: {
        lastHospitalization: 'March 2024 - City Hospital',
        reason: 'Appendectomy',
        treatment: 'Surgery and follow-up'
      }
    };
  }

  toggleEditPersonal(): void {
    this.isEditingPersonal = true;
    this.editedPatient = JSON.parse(JSON.stringify(this.patient));
  }

  savePersonalInfo(): void {
    this.patient = JSON.parse(JSON.stringify(this.editedPatient));
    this.isEditingPersonal = false;
    console.log('Patient information saved:', this.patient);
  }

  cancelEditPersonal(): void {
    this.isEditingPersonal = false;
    this.editedPatient = JSON.parse(JSON.stringify(this.patient));
  }
}
