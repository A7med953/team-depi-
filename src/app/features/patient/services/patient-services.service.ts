import { Injectable } from '@angular/core';

export interface Appointment {
  id: number;
    date: string;
    timeStart: string;
    timeEnd: string;
    doctor: string;
    status: string;
    reason: string;
}

@Injectable({
  providedIn: 'root'
})


export class PatientServicesService {
  appointmentsMock: Appointment[] = [
  {
    id:0, date: '2025-12-01', timeStart: '10:00 AM', timeEnd: '10:30 AM', doctor: 'Dr. Smith', status: 'Confirmed', reason: "Chest pain"
  },
  { id: 1, date: '2025-07-03', timeStart: '10:00 AM', timeEnd: '10:30 AM', doctor: 'Dr. Mark', status: 'Confirmed', reason: "Chest pain" },
]

  getAppointments(): Appointment[] {
    return this.appointmentsMock;
  }

  getAppointment(index: number): Appointment | null {
    return this.appointmentsMock.find(app => app.id === index) || null;
  }

  addAppointment(appointment: Appointment): void {
    this.appointmentsMock.push(appointment);
  }

  editAppointment(index: number, updatedAppointment: Appointment): void {
    if (this.appointmentsMock.find(app => app.id === index)) {
      this.appointmentsMock = this.appointmentsMock.map(app => app.id === index ? updatedAppointment : app);
    }
  }

  deleteAppointment(index: number): void {
    this.appointmentsMock = this.appointmentsMock.filter(app => app.id !== index);
  }
}
