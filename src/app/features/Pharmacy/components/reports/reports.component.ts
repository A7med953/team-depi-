import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart } from 'chart.js/auto';
import { registerables } from 'chart.js';
import { ReportsService, Report } from './reports.service';
import { Subscription } from 'rxjs';

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
export class ReportsComponent implements OnInit, OnDestroy {
  selectedReportType: string = 'all';
  selectedDateRange: string = 'month';
  reports: Report[] = [];
  private reportsSubscription?: Subscription;
  
 
  showGenerateModal: boolean = false;
  showAlertModal: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' | 'info' = 'success';
  
  newReport = {
    title: '',
    description: '',
    category: 'sales' as 'sales' | 'prescription' | 'inventory' | 'financial',
    file: null as File | null
  };

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

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsSubscription = this.reportsService.reports$.subscribe(
      reports => this.reports = reports
    );
  }

  ngOnDestroy(): void {
    if (this.reportsSubscription) {
      this.reportsSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    setTimeout(() => {
      this.initializeCharts();
    }, 200); 
  }

  initializeCharts(): void {
    // Sales Trend Chart
    new Chart('salesTrend', {
      type: 'line',
      data: {
        labels: ['Oct 16', 'Oct 19', 'Oct 22', 'Oct 25', 'Oct 28', 'Oct 31', 'Nov 3', 'Nov 6', 'Nov 9', 'Nov 13'],
        datasets: [{
          label: 'Sales ($)',
          data: [600, 720, 800, 950, 880, 920, 970, 890, 760, 820],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 8,
          pointBackgroundColor: '#007bff',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#007bff',
          pointHoverBorderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { 
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleColor: '#fff',
            bodyColor: '#fff',
            displayColors: false
          }
        },
        scales: { 
          y: { beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.05)' } },
          x: { grid: { display: false } }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart',
          delay: (context) => context.type === 'data' && context.mode === 'default' ? context.dataIndex * 100 : 0
        }
      }
    });

    // Top Medications Chart
    new Chart('topMedications', {
      type: 'bar',
      data: {
        labels: ['Amoxicillin', 'Lisinopril', 'Metformin', 'Atorvastatin', 'Omeprazole', 'Amlodipine'],
        datasets: [{
          label: 'Units Sold',
          data: [450, 420, 390, 360, 340, 310],
          backgroundColor: [
            'rgba(0, 168, 232, 0.8)',
            'rgba(0, 168, 232, 0.75)',
            'rgba(0, 168, 232, 0.7)',
            'rgba(0, 168, 232, 0.65)',
            'rgba(0, 168, 232, 0.6)',
            'rgba(0, 168, 232, 0.55)'
          ],
          borderColor: '#00a8e8',
          borderWidth: 2,
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: { grid: { color: 'rgba(0, 0, 0, 0.05)' } },
          y: { grid: { display: false } }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            displayColors: false
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeInOutQuart',
          delay: (context) => context.type === 'data' && context.mode === 'default' ? context.dataIndex * 150 : 0
        }
      }
    });

    // Sales Category Pie Chart
    new Chart('salesCategory', {
      type: 'pie',
      data: {
        labels: ['Sales', 'Prescription', 'Inventory', 'Financial'],
        datasets: [{
          data: [31, 27, 22, 20],
          backgroundColor: [
            'rgba(0, 123, 255, 0.9)',
            'rgba(0, 191, 166, 0.9)',
            'rgba(52, 211, 153, 0.9)',
            'rgba(251, 191, 36, 0.9)'
          ],
          borderColor: '#fff',
          borderWidth: 3,
          hoverOffset: 15,
          hoverBorderWidth: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { 
            position: 'right',
            labels: {
              padding: 15,
              font: { size: 12 },
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            displayColors: true
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });

    // Inventory Trend Chart
    new Chart('inventoryTrend', {
      type: 'line',
      data: {
        labels: ['Sales', 'Prescription', 'Panadol', 'Augmentin', 'Cataflam', 'Voltaren', 'Financial'],
        datasets: [{
          label: 'Medicine Trend',
          data: [150000, 156000, 155000, 158000, 157000, 156500, 157800],
          borderColor: '#00bfa6',
          backgroundColor: 'rgba(0,191,166,0.2)',
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 9,
          pointBackgroundColor: '#00bfa6',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00bfa6',
          pointHoverBorderWidth: 3
        }]
      },
      options: { 
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { 
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            displayColors: false
          }
        },
        scales: {
          y: { grid: { color: 'rgba(0, 0, 0, 0.05)' } },
          x: { grid: { display: false } }
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart',
          delay: (context) => context.type === 'data' && context.mode === 'default' ? context.dataIndex * 120 : 0
        }
      }
    });
  }

  get filteredReports(): Report[] {
    if (this.selectedReportType === 'all') {
      return this.reports;
    }
    return this.reports.filter(r => r.category === this.selectedReportType);
  }

  filterReports(): void {
  }

  openGenerateModal(): void {
    this.showGenerateModal = true;
    this.resetForm();
  }

  closeGenerateModal(): void {
    this.showGenerateModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.newReport = {
      title: '',
      description: '',
      category: 'sales',
      file: null
    };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.newReport.file = file;
    }
  }

  generateReport(): void {
    this.openGenerateModal();
  }

  submitNewReport(): void {
    if (!this.newReport.title.trim()) {
      this.showAlert('Please enter a report title', 'error');
      return;
    }

    if (!this.newReport.description.trim()) {
      this.showAlert('Please enter a report description', 'error');
      return;
    }

    const fileSize = this.newReport.file 
      ? this.reportsService.formatFileSize(this.newReport.file.size)
      : '0 KB';

    const reportData = {
      title: this.newReport.title,
      description: this.newReport.description,
      category: this.newReport.category,
      icon: this.reportsService.getCategoryIcon(this.newReport.category),
      lastGenerated: this.reportsService.getCurrentDateTime(),
      size: fileSize,
      file: this.newReport.file || undefined,
      fileName: this.newReport.file?.name || undefined
    };

    const addedReport = this.reportsService.addReport(reportData);
    
    this.closeGenerateModal();
    this.showAlert(`Report "${addedReport.title}" has been generated successfully!`, 'success');
  }

  exportReport(): void {
    this.showAlert('Report exported successfully! The file will be downloaded shortly.', 'success');
  }

  viewReport(id: number): void {
    const report = this.reports.find(r => r.id === id);
    if (report) {
      this.showAlert(`Viewing report: "${report.title}"`, 'info');
    }
  }

  downloadReport(id: number): void {
    const report = this.reports.find(r => r.id === id);
    if (report) {
      this.showAlert(`Downloading report: "${report.title}"...`, 'success');
    }
  }

  showAlert(message: string, type: 'success' | 'error' | 'info'): void {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlertModal = true;


    setTimeout(() => {
      this.closeAlert();
    }, 3000);
  }

  closeAlert(): void {
    this.showAlertModal = false;
  }
}