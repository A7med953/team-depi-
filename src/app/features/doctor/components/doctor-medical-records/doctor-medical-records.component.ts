import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-medical-records',
  imports: [CommonModule,FormsModule],
  templateUrl: './doctor-medical-records.component.html',
  styleUrl: './doctor-medical-records.component.css'
})
export class DoctorMedicalRecordsComponent {
   records = [
    { title: 'Lisinopril', type: 'Medication', details: '10mg daily - For blood pressure control' },
    { title: 'Type 2 Diabetes', type: 'Condition', details: 'Managed with Metformin 500mg' },
    { title: 'Peanut Allergy', type: 'Allergy', details: 'Moderate - causes hives and swelling' }
  ];

  newRecord = { title: '', type: '', details: '' };
  editedRecordIndex: number | null = null;
  editedRecord = { title: '', type: '', details: '' };

  addRecord() {
    if (this.newRecord.title && this.newRecord.type && this.newRecord.details) {
      this.records.push({ ...this.newRecord });
      this.newRecord = { title: '', type: '', details: '' };
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
