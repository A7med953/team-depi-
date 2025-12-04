import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Appointment {
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  patientPhone: string;
  date: string;
  time: string;
  symptoms: string;

  diseaseDescription: string;
  status?: 'pending' | 'accepted' | 'rejected';
}

@Component({
  selector: 'app-doc-myappointment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doc-myappointment.component.html',
  styleUrls: ['./doc-myappointment.component.css']
})
export class DocMyappointmentComponent {
  appointments: Appointment[] = [
    {
      patientId: 'P-101',
      patientName: 'John Doe',
      patientAge: 35,
      patientGender: 'Male',
      patientPhone: '+1 234-567-8901',
      date: 'Thu, Nov 6, 2025',
      time: '10:00 AM - 10:30 AM',
      symptoms: 'Headache, Fever',
 
      diseaseDescription: 'The common cold is a viral infection of the upper respiratory tract.  Rest, fluids, and over-the-counter medications can help relieve symptoms.',
      status: 'pending'
    },
    {
      patientId: 'P-102',
      patientName: 'Jane Smith',
      patientAge: 28,
      patientGender: 'Female',
      patientPhone: '+1 234-567-8902',
      date: 'Thu, Nov 6, 2025',
      time: '11:00 AM - 11:30 AM',
      symptoms: 'Cough, Fatigue',
      diseaseDescription: 'Influenza is a respiratory illness caused by influenza viruses. It can cause mild to severe illness.  Antiviral medications may be prescribed.',
      status: 'pending'
    },
    {
      patientId: 'P-103',
      patientName: 'Mike Johnson',
      patientAge: 42,
      patientGender: 'Male',
      patientPhone: '+1 234-567-8903',
      date: 'Thu, Nov 10, 2025',
      time: '12:00 PM - 12:45 PM',
      symptoms: 'Back pain',
      diseaseDescription: 'Muscle strain occurs when muscle fibers are overstretched or torn. Treatment includes rest, ice, compression, and physical therapy.',
      status: 'pending'
    },
    {
      patientId: 'P-104',
      patientName: 'Sarah Williams',
      patientAge: 31,
      patientGender: 'Female',
      patientPhone: '+1 234-567-8904',
      date: 'Thu, Nov 12, 2025',
      time: '2:00 PM - 2:30 PM',
      symptoms: 'Sore throat',
      diseaseDescription: 'Pharyngitis is inflammation of the pharynx, resulting in a sore throat. Treatment depends on the cause but often includes pain relievers and throat lozenges.',
      status: 'pending'
    }
  ];

  filteredAppointments: Appointment[] = [... this.appointments];
  searchTerm: string = '';
  showCalendar = false;
  showDetailsModal = false;
  selectedAppointment: Appointment | null = null;




  filterPatients() {
    const term = this. searchTerm.toLowerCase();
    this.filteredAppointments = this.appointments.filter(a =>
      a.patientId. toLowerCase().includes(term) || 
      a.symptoms.toLowerCase(). includes(term)
    );
  }

  ngOnInit() {
    this.filteredAppointments = [...this.appointments];
  }



  openDetailsModal(appointment: Appointment) {
    this.selectedAppointment = appointment;
    this. showDetailsModal = true;
  }

  closeDetailsModal() {
    this.showDetailsModal = false;
    this.selectedAppointment = null;
  }






  acceptAppointment(appointment: Appointment) {
    appointment.status = 'accepted';
    console. log(`Appointment ${appointment.patientId} accepted`);
  }

  rejectAppointment(appointment: Appointment) {
    appointment.status = 'rejected';
    console.log(`Appointment ${appointment.patientId} rejected`);
  }
}