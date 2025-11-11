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
      date: 'Thu, Nov 10, 2025',
      time: '12:00 PM - 12:45 PM',
      status: 'Completed',
      symptoms: 'Back pain',
      diagnosis: 'Muscle strain'
    },
    {
      patientId: 'P-104',
      date: 'Thu, Nov 12, 2025',
      time: '2:00 PM - 2:30 PM',
      status: 'Scheduled',
      symptoms: 'Sore throat',
      diagnosis: ''
    }
  ];

  showCalendar = false;
  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  daysInMonth: number[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get monthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }

  ngOnInit() {
    this.generateCalendar();
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
    if (this.currentMonth < 0) {
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
    const dateString = `${this.monthName.slice(0, 3)}, ${this.monthName.slice(0, 3)} ${day}, ${this.currentYear}`;
    return this.appointments.some(app => app.date.includes(`${day}, ${this.currentYear}`));
  }
}
