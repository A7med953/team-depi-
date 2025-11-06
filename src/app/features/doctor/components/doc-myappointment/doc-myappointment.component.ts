import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Appointment {
  patientId: string;
  date: string;
  time: string;
  status: string;
  symptoms: string;
  diagnosis: string;
}

@Component({
  selector: 'app-doc-myappointment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-myappointment.component.html',
  styleUrls: ['./doc-myappointment.component.css']
})
export class DocMyappointmentComponent {
  appointments: Appointment[] = [
 {
    patientId: 'P-101',
    date: 'Thu, Nov 6, 2025',
    time: '10:00 AM - 10:30 AM',
    status: 'Scheduled',
    symptoms: 'Headache, Fever',
    diagnosis: ''
  },
  {
    patientId: 'P-102',
    date: 'Thu, Nov 6, 2025',
    time: '11:00 AM - 11:30 AM',
    status: 'In Progress',
    symptoms: 'Cough, Fatigue',
    diagnosis: 'Suspected flu'
  },
  {
    patientId: 'P-103',
    date: 'Thu, Nov 6, 2025',
    time: '12:00 PM - 12:45 PM',
    status: 'Completed',
    symptoms: 'Back pain',
    diagnosis: 'Muscle strain'
  },
  {
    patientId: 'P-104',
    date: 'Thu, Nov 6, 2025',
    time: '2:00 PM - 2:30 PM',
    status: 'Scheduled',
    symptoms: 'Sore throat',
    diagnosis: ''
  }
  ];
}
