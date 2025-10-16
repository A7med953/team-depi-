import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientServicesService, Appointment } from '../../services/patient-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-appointment',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-appointment.component.html',
  styleUrl: './book-appointment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  constructor (
    private patientService: PatientServicesService,
    private router: Router
  ) { }

  //TODO: this should come from doctors service
  doctors: {name: string, specialty: string, yoe: number, fees: number}[] = [ 
    { name: 'Dr. John Smith', specialty: 'Cardiologist', yoe: 10, fees: 150 },
    { name: 'Dr. Emily Johnson', specialty: 'Dermatologist', yoe: 7, fees: 120 },
    { name: 'Dr. Michael Brown', specialty: 'Pediatrician', yoe: 5, fees: 100 },
    { name: 'Dr. Sarah Davis', specialty: 'Neurologist', yoe: 12, fees: 200 },
    { name: 'Dr. David Wilson', specialty: 'Orthopedic Surgeon', yoe: 8, fees: 180 }
  ]

  // Form fields
  selectedDoctor: string = '';
  appointmentDate: string = '';
  selectedTimeSlot: string = '';
  symptoms: string = '';

  // Error handling
  errors: {[key: string]: string} = {};
  showError: boolean = false;

  ngOnInit(): void {
      
  }

  selectDoctor(doctor: string): void {
    this.selectedDoctor = doctor;
    this.errors['doctor'] = '';
  }

  selectTimeSlot(time: string): void {
    this.selectedTimeSlot = time;
    this.errors['time'] = '';
  }

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.selectedDoctor) {
      this.errors['doctor'] = 'Please select a doctor';
      isValid = false;
    }

    if (!this.appointmentDate) {
      this.errors['date'] = 'Please select a date';
      isValid = false;
    } else {
      const selectedDate = new Date(this.appointmentDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        this.errors['date'] = 'Date cannot be in the past';
        isValid = false;
      }
    }

    if (!this.selectedTimeSlot) {
      this.errors['time'] = 'Please select a time slot';
      isValid = false;
    }

    if (!this.symptoms || this.symptoms.trim() === '') {
      this.errors['symptoms'] = 'Please describe your symptoms';
      isValid = false;
    }

    return isValid;
  }

  submitAppointment(): void {
    if (!this.validateForm()) {
      this.showError = true;
      return;
    }

    // Generate new appointment ID
    const existingAppointments = this.patientService.getAppointments();
    const newId = existingAppointments.length > 0 
      ? Math.max(...existingAppointments.map(a => a.id)) + 1 
      : 0;

    // Parse time slot to get start and end times
    const timeStart = this.selectedTimeSlot;
    const timeEnd = this.calculateEndTime(this.selectedTimeSlot);

    const newAppointment: Appointment = {
      id: newId,
      date: this.appointmentDate,
      timeStart: timeStart,
      timeEnd: timeEnd,
      doctor: this.selectedDoctor,
      status: 'Pending',
      reason: this.symptoms
    };

    this.patientService.addAppointment(newAppointment);
    
    // Reset form
    this.resetForm();
    
    // Navigate to my appointments
    this.router.navigate(['/patient/my-appointments']);
  }

  calculateEndTime(startTime: string): string {
    // Assuming 30-minute appointments
    const [time, period] = startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    let endHours = hours;
    let endMinutes = minutes + 30;
    
    if (endMinutes >= 60) {
      endMinutes -= 60;
      endHours += 1;
    }
    
    const endTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')} ${period}`;
    return endTime;
  }

  resetForm(): void {
    this.selectedDoctor = '';
    this.appointmentDate = '';
    this.selectedTimeSlot = '';
    this.symptoms = '';
    this.errors = {};
    this.showError = false;
  }

}
