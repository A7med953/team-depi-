import { Component } from '@angular/core';
import { not } from 'rxjs/internal/util/not';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';  

@Component({
  selector: 'app-notifications',
  imports: [NgIf, NgFor],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  notifications = [
    {
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM.',
      time: 'Just now',
      icon: 'fa-regular fa-calendar',
      read: false
    },
    {
      title: 'Prescription Ready',
      message: 'Your prescription for Lisinopril is ready for pickup at City Pharmacy.',
      time: '2h ago',
      icon: 'fa-solid fa-capsules',
      read: false
    }
  ];

  clearNotification(index: number): void {
    this.notifications.splice(index, 1);
  }

  markAsRead(index: number): void {
    this.notifications[index].read = true;
  }

}
