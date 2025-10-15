import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-appointments',
  imports: [CommonModule],
  templateUrl: './my-appointments.component.html',
  styleUrl: './my-appointments.component.css'
})

export class MyAppointmentsComponent implements OnInit {

  appointments: {
    date: string;
    timeStart: string;
    timeEnd: string;
    doctor: string;
    status: string;
    reason: string;
  }[] = [
    { date: '2024-07-01', timeStart: '10:00 AM', timeEnd: '10:30 AM', doctor: 'Dr. Smith', status: 'Confirmed', reason: "Chest pain" },
    { date: '2024-07-03', timeStart: '10:00 AM', timeEnd: '10:30 AM', doctor: 'Dr. Mark', status: 'Confirmed', reason: "Chest pain" },
  ];

  pastAppointments: {
    date: string;
    timeStart: string;
    timeEnd: string;
    doctor: string;
    status: string;
    reason: string;
  }[]  = [
];

  ngOnInit() {
    console.log('Component initialized');
    console.log('Appointments:', this.appointments);
    console.log('Past Appointments:', this.pastAppointments);
  }
}
