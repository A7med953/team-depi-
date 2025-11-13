import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment, PatientServicesService } from '../../services/patient-services.service';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css'
})
export class AppointmentComponent implements OnInit {
  constructor(private route: ActivatedRoute, private patientsService: PatientServicesService, private router: Router) {}

  appointment: Appointment | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.appointment = this.patientsService.getAppointment(Number(id));

  }

  cancelAppointment() {
    if (this.appointment) {
      this.patientsService.deleteAppointment(this.appointment.id);
      this.appointment = null;
      this.router.navigate(['/patient/my-appointments']);
    }
  }
}
