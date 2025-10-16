import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment, PatientServicesService } from '../../services/patient-services.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private patientsService: PatientServicesService) {}

  appointment: Appointment | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointment = this.patientsService.getAppointment(Number(id));

  }
}
