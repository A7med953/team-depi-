import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notification {
  id: number;
  type: 'prescription' | 'inventory' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: string;
  details?: string[];
  actionLabel?: string;
  actions?: {
    label: string;
    type: 'primary' | 'secondary' | 'danger';
    icon?: string;
    handler: () => void;
  }[];
}

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationComponent {
  notifications: Notification[] = [
    {
      id: 1,
      type: 'prescription',
      title: 'New Prescription Received',
      message: 'Dr. Smith has sent a prescription for Alice Brown - Lisinopril 10mg',
      time: 'Just now',
      read: false,
      icon: 'fas fa-pills',
      details: ['Alice Brown', 'Lisinopril 10mg'],
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Metformin 500mg is running low (25 units remaining)',
      time: '1h ago',
      read: false,
      icon: 'fas fa-bell',
      details: ['Metformin 500mg', '25 units left'],
    },
    {
      id: 3,
      type: 'prescription',
      title: 'Prescription Dispatched',
      message: 'Prescription #PR-2024-002 for Sarah Johnson has been successfully dispatched.',
      time: '2 hours ago',
      read: true,
      icon: 'fas fa-check-circle',
      details: ['Sarah Johnson', 'Dispensed']
    },
    {
      id: 4,
      type: 'inventory',
      title: 'Expiry Warning',
      message: 'Lisinopril 10mg will expire on 6/15/2025. Consider using it soon.',
      time: '3 hours ago',
      read: false,
      icon: 'fas fa-calendar-times',
      details: ['Lisinopril 10mg', 'Expires: 6/15/2025'],
    },
    {
      id: 5,
      type: 'system',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance will occur on Saturday, January 18th from 2:00 AM to 4:00 AM.',
      time: '1 day ago',
      read: true,
      icon: 'fas fa-tools'
    },
    {
      id: 6,
      type: 'prescription',
      title: 'Prescription Cancelled',
      message: 'Prescription #PR-2024-003 for Michael Brown has been cancelled by the doctor.',
      time: '1 day ago',
      read: true,
      icon: 'fas fa-times-circle',
      details: ['Michael Brown', 'Cancelled']
    },
    {
      id: 7,
      type: 'inventory',
      title: 'New Stock Arrived',
      message: 'New stock for Amoxicillin 250mg has been received. Quantity: 500 units.',
      time: '2 days ago',
      read: true,
      icon: 'fas fa-box',
      details: ['Amoxicillin 250mg', '500 units'],
      actionLabel: 'View Inventory'
    },
    {
      id: 8,
      type: 'prescription',
      title: 'Urgent Prescription',
      message: 'Urgent prescription #PR-2024-004 for Emily Davis requires immediate attention.',
      time: '2 days ago',
      read: false,
      icon: 'fas fa-exclamation-circle',
      details: ['Emily Davis', 'Urgent'],
    },
    {
      id: 9,
      type: 'system',
      title: 'Software Update Available',
      message: 'A new version of the pharmacy management system is available. Update recommended.',
      time: '3 days ago',
      read: true,
      icon: 'fas fa-download',
      actionLabel: 'Update Now'
    },
    {
      id: 10,
      type: 'inventory',
      title: 'Stock Level Normal',
      message: 'All medications are within normal stock levels. No action required.',
      time: '4 days ago',
      read: true,
      icon: 'fas fa-check-circle'
    }
  ];

  get unreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(id: number, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  }

  dismissNotification(id: number, event: Event): void {
    event.stopPropagation();
    this.notifications = this.notifications.filter(n => n.id !== id);
  }


}
