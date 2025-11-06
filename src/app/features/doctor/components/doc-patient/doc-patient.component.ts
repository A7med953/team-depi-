import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-patient',
  imports: [CommonModule,FormsModule],
  templateUrl: './doc-patient.component.html',
  styleUrl: './doc-patient.component.css'
})
export class DocPatientComponent {
searchTerm: string = '';

  Patients = [
    {
      name: 'Ahmed Elsayed',
      id: 'P-101',
      date: 'Thu, Nov 6, 2025',
      time: '11:00 AM',
      description: 'Patient complains of chest pain and shortness of breath.'
    },
    {
      name: 'Sara Mahmoud',
      id: 'P-102',
      date: 'Thu, Nov 6, 2025',
      time: '12:30 PM',
      description: 'Complains of severe headache and dizziness.'
    },
    {
      name: 'Mohamed Ali',
      id: 'P-103',
      date: 'Thu, Nov 6, 2025',
      time: '2:00 PM',
      description: 'Follow-up for diabetes management.'
    }
  ];

  filteredPatients = [...this.Patients];

  filterPatients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.Patients.filter(a =>
      a.name.toLowerCase().includes(term) || 
      a.id.toLowerCase().includes(term)
    );
  }
}
