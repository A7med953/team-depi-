import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-medical-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-medical-records.component.html',
  styleUrls: ['./doctor-medical-records.component.css']
})
export class DoctorMedicalRecordsComponent {

  searchTerm: string = '';

  patients = [
    {
      id: 'P-101',
      name: 'Ahmed Elsayed',
      history: [
        { title: 'Lisinopril', type: 'Medication', details: '10mg daily - For blood pressure control' },
        { title: 'Type 2 Diabetes', type: 'Condition', details: 'Managed with Metformin 500mg' },
      ]
    },
    {
      id: 'P-102',
      name: 'Sara Mahmoud',
      history: [
        { title: 'Peanut Allergy', type: 'Allergy', details: 'Moderate - causes hives and swelling' },
        { title: 'Migraine', type: 'Condition', details: 'Managed with Paracetamol' }
      ]
    },
    {
      id: 'P-103',
      name: 'Mohamed Ali',
      history: [
        { title: 'Diabetes Checkup', type: 'Condition', details: 'Blood sugar stable' }
      ]
    }
  ];

  records: any[] = [];
  newRecord = { title: '', type: '', details: '', name: '', id: '' };
  editedRecordIndex: number | null = null;
  editedRecord = { title: '', type: '', details: '', name: '', id: '' };

  constructor() {
    this.loadAllRecords();
  }

  loadAllRecords() {
    this.records = [];
    for (let patient of this.patients) {
      for (let rec of patient.history) {
        this.records.push({ ...rec, name: patient.name, id: patient.id });
      }
    }
  }

  get filteredRecords() {
    if (!this.searchTerm) return this.records;
    const term = this.searchTerm.toLowerCase();
    return this.records.filter(r =>
      r.name.toLowerCase().includes(term) ||
      r.id.toLowerCase().includes(term)
    );
  }

  addRecord() {
    if (this.newRecord.title && this.newRecord.type && this.newRecord.details && this.newRecord.name && this.newRecord.id) {
      this.records.push({ ...this.newRecord });
      this.newRecord = { title: '', type: '', details: '', name: '', id: '' };
    }
  }

  deleteRecord(index: number) {
    this.records.splice(index, 1);
  }

  editRecord(index: number) {
    this.editedRecordIndex = index;
    this.editedRecord = { ...this.records[index] };
  }

  saveRecord(index: number) {
    this.records[index] = { ...this.editedRecord };
    this.editedRecordIndex = null;
  }

  cancelEdit() {
    this.editedRecordIndex = null;
  }
}
