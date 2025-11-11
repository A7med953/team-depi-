import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-patient',
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-patient.component.html',
  styleUrl: './doc-patient.component.css'
})
export class DocPatientComponent {
  searchTerm: string = '';
  selectedPatient: any = null;
  backupPatient: any = null;
  isEditing: boolean = false;

  Patients = [
    {
      name: 'Ahmed Elsayed',
      id: 'P-101',
      date: 'Thu, Nov 6, 2025',
      time: '11:00 AM',
      description: 'Patient complains of chest pain and shortness of breath.',
      bloodType: 'A+',
      disease: 'Asthma',
      tests: 'Chest X-Ray, ECG',
      medication: 'Inhaler, Vitamin D',
      history: 'Previous diagnosis: mild asthma.\nLast visit: 3 months ago.'
    },
    {
      name: 'Sara Mahmoud',
      id: 'P-102',
      date: 'Thu, Nov 6, 2025',
      time: '12:30 PM',
      description: 'Complains of severe headache and dizziness.',
      bloodType: 'B-',
      disease: 'Migraine',
      tests: 'CT scan, Blood pressure test',
      medication: 'Paracetamol, Ibuprofen',
      history: 'History of migraines since 2023.\nMedications: Paracetamol.'
    },
    {
      name: 'Mohamed Ali',
      id: 'P-103',
      date: 'Thu, Nov 6, 2025',
      time: '2:00 PM',
      description: 'Follow-up for diabetes management.',
      bloodType: 'O+',
      disease: 'Type 2 Diabetes',
      tests: 'HbA1c, Fasting glucose',
      medication: 'Metformin 500mg',
      history: 'Type 2 diabetes since 2019.\nBlood sugar stable.'
    }
  ];

  filteredPatients = [...this.Patients];

  filterPatients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.Patients.filter(a =>
      a.name.toLowerCase().includes(term) || a.id.toLowerCase().includes(term)
    );
  }

  openHistory(patient: any) {
    this.selectedPatient = { ...patient };
    this.backupPatient = { ...patient };
    this.isEditing = false;
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.selectedPatient = { ...this.backupPatient };
    this.isEditing = false;
  }

  saveHistory() {
    const index = this.Patients.findIndex(p => p.id === this.selectedPatient.id);
    if (index !== -1) {
      this.Patients[index] = { ...this.selectedPatient };
      this.filterPatients();
    }
    this.isEditing = false;
  }

  closeHistory() {
    this.selectedPatient = null;
  }


  confirmDelete(patient: any) {
    const confirmDelete = confirm(`Are you sure you want to delete ${patient.name}?`);
    if (confirmDelete) {
      this.Patients = this.Patients.filter(p => p.id !== patient.id);
      this.filterPatients();
    }
  }
}
