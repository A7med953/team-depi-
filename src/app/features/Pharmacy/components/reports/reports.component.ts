import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { registerables } from 'chart.js';

interface Activity {
  date: string;
  time: string;
  description: string;
  type: 'sales' | 'prescription' | 'inventory' | 'system' | 'financial';
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-reports',
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {


  recentActivities: Activity[] = [
    {
      date: 'Today',
      time: '9:00 AM',
      description: 'Daily Sales Report generated successfully',
      type: 'sales',
      status: 'completed'
    },
    {
      date: 'Today',
      time: '8:00 AM',
      description: 'Inventory Stock Report updated',
      type: 'inventory',
      status: 'completed'
    },
    {
      date: 'Yesterday',
      time: '11:30 PM',
      description: 'Monthly Prescription Summary generated',
      type: 'prescription',
      status: 'completed'
    },
    {
      date: 'Yesterday',
      time: '6:00 PM',
      description: 'Top Selling Medications report created',
      type: 'sales',
      status: 'completed'
    },
    {
      date: 'Yesterday',
      time: '3:45 PM',
      description: 'Patient Prescription History report processing',
      type: 'prescription',
      status: 'pending'
    },
    {
      date: '2 days ago',
      time: '2:30 PM',
      description: 'Revenue Analysis report failed to generate',
      type: 'system',
      status: 'failed'
    },
    {
      date: '3 days ago',
      time: '4:20 PM',
      description: 'Financial Statement exported',
      type: 'financial',
      status: 'completed'
    }
  ];

 
   ngAfterViewInit(): void {
    Chart.register(...registerables);
  setTimeout(() => {

   new Chart('salesTrend', {
  type: 'line',
  data: {
    labels: ['Oct 16', 'Oct 19', 'Oct 22', 'Oct 25', 'Oct 28', 'Oct 31', 'Nov 3', 'Nov 6', 'Nov 9', 'Nov 13'],
    datasets: [{
      label: 'Sales ($)',
      data: [600, 720, 800, 950, 880, 920, 970, 890, 760, 820],
      borderColor: '#007bff',
      fill: false,
      tension: 0.3
    }]
  },
  options: {
    plugins: { 
      legend: { display: false } 
    },

    scales: { 
      y: { beginAtZero: true } 
    }
  }
});

 new Chart('topMedications', {
  type: 'bar',
  data: {
    labels: ['Amoxicillin', 'Lisinopril', 'Metformin', 'Atorvastatin', 'Omeprazole', 'Amlodipine'],
    datasets: [{
      label: 'Units Sold',
      data: [450, 420, 390, 360, 340, 310],
      backgroundColor: '#00a8e8'
    }]
  },
  options: {
     responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
      }
    },

    plugins: {
      legend: { display: false }
    }
  }
});
    new Chart('salesCategory', {
      type: 'pie',
      data: {
        labels: ['Sales', 'Prescription', 'Inventory', 'Financial'],
        datasets: [{
          data: [31, 27, 22, 20],
          backgroundColor: ['#007bff', '#00bfa6', '#34d399', '#fbbf24']
        }]
      },
      options: {plugins: { legend: { position:'right' } } }
    });
    new Chart('inventoryTrend', {
  type: 'line',
  data: {
    labels: ['Sales', 'Prescription', 'Panadol', 'Augmentin', 'Cataflam', 'Voltaren', 'Financial'],
    datasets: [{
      label: 'Medicine Trend',
      data: [150000, 156000, 155000, 158000, 157000, 156500, 157800],
      borderColor: '#00bfa6',
      backgroundColor: 'rgba(0,191,166,0.1)',
      fill: true,
      tension: 0.3
    }]
  },
  options: { 
     responsive: true,
    plugins: { 
      legend: { display: false } 
    } 
  }
});


  }, 200); 

}
}