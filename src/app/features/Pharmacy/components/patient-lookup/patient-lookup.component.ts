import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Prescription {
  date: string;
  doctor: string;
  diagnosis: string;
  status: string;
}

interface Patient {
  name: string;
  phone: string;
  age: number;
  address: string;
  doctor: string;
  lastVisit: string;
  prescriptions: Prescription[];
}

@Component({
  selector: 'app-patient-lookup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patient-lookup.component.html',
  styleUrls: ['./patient-lookup.component.css']
})
export class PatientLookupComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient?: Patient;

  ngOnInit(): void {
    this.patients = [
      {
        name: "Sarah Ahmed",
        phone: "01023456789",
        age: 28,
        address: "Cairo, Egypt",
        doctor: "Dr. Omar Khaled",
        lastVisit: "12 Nov 2025",
        prescriptions: [
          { date: "12 Nov 2025", doctor: "Dr. Omar Khaled", diagnosis: "Flu & Fever", status: "Dispensed" },
          { date: "02 Nov 2025", doctor: "Dr. Omar Khaled", diagnosis: "Headache", status: "Dispensed" }
        ]
      },
      {
        name: "Mohamed Ali",
        phone: "01198765432",
        age: 35,
        address: "Giza, Egypt",
        doctor: "Dr. Laila Hussein",
        lastVisit: "10 Nov 2025",
        prescriptions: [
          { date: "10 Nov 2025", doctor: "Dr. Laila Hussein", diagnosis: "Diabetes Follow-up", status: "Pending" }
        ]
      },
      {
        name: "Amira Hassan",
        phone: "01234567890",
        age: 24,
        address: "Alexandria, Egypt",
        doctor: "Dr. Hany Adel",
        lastVisit: "09 Nov 2025",
        prescriptions: [
          { date: "09 Nov 2025", doctor: "Dr. Hany Adel", diagnosis: "Allergy", status: "Dispensed" }
        ]
      }
    ];

    this.filteredPatients = this.patients;
  }

  filterPatients(query: string): void {
    const q = query.toLowerCase();
    this.filteredPatients = this.patients.filter(
      p => p.name.toLowerCase().includes(q) || p.phone.includes(q)
    );
  }

  viewPatient(p: Patient): void {
    this.selectedPatient = p;
    setTimeout(() => {
      const el = document.getElementById('patient-details');
      if (el) {
        el.classList.add('active');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  }

  closeDetails(): void {
    const el = document.getElementById('patient-details');
    if (el) {
      el.classList.remove('active');
    }
    this.selectedPatient = undefined;
  }
}
