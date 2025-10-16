import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PatientServicesService } from '../../services/patient-services.service';
import { Appointment } from '../../services/patient-services.service';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})

export class MyAppointmentsComponent implements OnInit {

  constructor(
    private patientService: PatientServicesService,
    private router: Router
  ) {}

  appointments: Appointment[] = [];

  pastAppointments: Appointment[] = [];

  ngOnInit() {
    const fetchedAppointments = this.patientService.getAppointments();
    const currentDate = new Date();

    this.appointments = fetchedAppointments.filter(appointment => new Date(appointment.date) >= currentDate);
    this.pastAppointments = fetchedAppointments.filter(appointment => new Date(appointment.date) < currentDate);
  }

  viewDetails(appointmentId: number) {
    this.router.navigate(['/patient/appointment', appointmentId]);
  }
}
