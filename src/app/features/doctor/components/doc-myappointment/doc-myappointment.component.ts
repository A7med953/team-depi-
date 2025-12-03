import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Appointment {
  patientId: string;
  date: string;
  time: string;
  symptoms: string;
  diagnosis: string;
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
      date: 'Thu, Nov 6, 2025',
      time: '10:00 AM - 10:30 AM',
      symptoms: 'Headache, Fever',
      diagnosis: '',
      status: 'pending'
    },
    {
      patientId: 'P-102',
      date: 'Thu, Nov 6, 2025',
      time: '11:00 AM - 11:30 AM',
      symptoms: 'Cough, Fatigue',
      diagnosis: 'Suspected flu',
      status: 'pending'
    },
    {
      patientId: 'P-103',
      date: 'Thu, Nov 10, 2025',
      time: '12:00 PM - 12:45 PM',
      symptoms: 'Back pain',
      diagnosis: 'Muscle strain',
      status: 'pending'
    },
    {
      patientId: 'P-104',
      date: 'Thu, Nov 12, 2025',
      time: '2:00 PM - 2:30 PM',
      symptoms: 'Sore throat',
      diagnosis: '',
      status: 'pending'
    }
  ];

  filteredAppointments: Appointment[] = [... this.appointments];
  searchTerm: string = '';
  showCalendar = false;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  daysInMonth: number[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth). toLocaleString('default', { month: 'long' });
  }

  filterPatients() {
    const term = this.searchTerm.toLowerCase();
    this.filteredAppointments = this.appointments.filter(a =>
      a.patientId. toLowerCase().includes(term) || 
      a.symptoms.toLowerCase(). includes(term)
    );
  }

  ngOnInit() {
    this. generateCalendar();
    this.filteredAppointments = [...this. appointments];
  }

  generateCalendar() {
    const daysCount = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
  }

  openCalendar() {
    this.showCalendar = true;
  }

  closeCalendar() {
    this.showCalendar = false;
  }

  prevMonth() {
    this.currentMonth--;
    if (this. currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  isAppointmentDay(day: number): boolean {
    const dateString = `${this.monthName. slice(0, 3)}, ${this.monthName.slice(0, 3)} ${day}, ${this.currentYear}`;
    return this.appointments.some(app => app.date. includes(`${day}, ${this.currentYear}`));
  }

  acceptAppointment(appointment: Appointment) {
    appointment.status = 'accepted';
    console.log(`Appointment ${appointment.patientId} accepted`);
    // Here you can add API call to update the backend
  }

  rejectAppointment(appointment: Appointment) {
    appointment.status = 'rejected';
    console.log(`Appointment ${appointment.patientId} rejected`);
    // Here you can add API call to update the backend
  }
}