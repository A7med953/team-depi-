import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Report {
  id: number;
  title: string;
  description: string;
  category: 'sales' | 'prescription' | 'inventory' | 'financial';
  icon: string;
  lastGenerated: string;
  size: string;
  file?: File;
  fileName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private reportsSubject = new BehaviorSubject<Report[]>([
    {
      id: 1,
      title: 'Daily Sales Report',
      description: 'Complete breakdown of daily sales including medications sold, revenue, and transaction details.',
      category: 'sales',
      icon: 'fas fa-chart-line',
      lastGenerated: 'Today, 9:00 AM',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'Monthly Prescription Summary',
      description: 'Detailed monthly prescription report with patient information and medication dispensing data.',
      category: 'prescription',
      icon: 'fas fa-prescription-bottle-alt',
      lastGenerated: 'Yesterday, 11:30 PM',
      size: '5.1 MB'
    },
    {
      id: 3,
      title: 'Inventory Stock Report',
      description: 'Current inventory levels, low stock alerts, and expiry date tracking for all medications.',
      category: 'inventory',
      icon: 'fas fa-boxes',
      lastGenerated: 'Today, 8:00 AM',
      size: '3.8 MB'
    },
    {
      id: 4,
      title: 'Financial Statement',
      description: 'Comprehensive financial overview including revenue, expenses, profit margins, and tax information.',
      category: 'financial',
      icon: 'fas fa-file-invoice-dollar',
      lastGenerated: '3 days ago',
      size: '8.2 MB'
    },
    {
      id: 5,
      title: 'Top Selling Medications',
      description: 'Analysis of best-selling medications with quantity sold, revenue generated, and trends.',
      category: 'sales',
      icon: 'fas fa-star',
      lastGenerated: 'Yesterday, 6:00 PM',
      size: '1.9 MB'
    },
    {
      id: 6,
      title: 'Prescription Status Report',
      description: 'Overview of prescription statuses including pending, dispensed, and cancelled prescriptions.',
      category: 'prescription',
      icon: 'fas fa-clipboard-list',
      lastGenerated: 'Today, 10:15 AM',
      size: '2.7 MB'
    },
    {
      id: 7,
      title: 'Expiry Date Report',
      description: 'List of medications approaching expiry dates with remaining shelf life and recommendations.',
      category: 'inventory',
      icon: 'fas fa-calendar-times',
      lastGenerated: 'Today, 7:00 AM',
      size: '1.5 MB'
    },
    {
      id: 8,
      title: 'Revenue Analysis',
      description: 'Detailed revenue analysis by category, time period, and payment method breakdown.',
      category: 'financial',
      icon: 'fas fa-chart-pie',
      lastGenerated: '2 days ago',
      size: '4.3 MB'
    },
    {
      id: 9,
      title: 'Patient Prescription History',
      description: 'Complete prescription history for all patients including refill patterns and medication adherence.',
      category: 'prescription',
      icon: 'fas fa-user-md',
      lastGenerated: 'Yesterday, 3:45 PM',
      size: '12.6 MB'
    },
    {
      id: 10,
      title: 'Quarterly Performance',
      description: 'Quarterly performance metrics including sales growth, inventory turnover, and operational efficiency.',
      category: 'financial',
      icon: 'fas fa-trophy',
      lastGenerated: '5 days ago',
      size: '6.8 MB'
    }
  ]);

  public reports$: Observable<Report[]> = this.reportsSubject.asObservable();

  constructor() { }

  getReports(): Report[] {
    return this.reportsSubject.value;
  }

  addReport(report: Omit<Report, 'id'>): Report {
    const currentReports = this.reportsSubject.value;
    const newId = Math.max(...currentReports.map(r => r.id), 0) + 1;
    
    const newReport: Report = {
      ...report,
      id: newId
    };

    this.reportsSubject.next([...currentReports, newReport]);
    return newReport;
  }

  getReportById(id: number): Report | undefined {
    return this.reportsSubject.value.find(r => r.id === id);
  }

  deleteReport(id: number): boolean {
    const currentReports = this.reportsSubject.value;
    const filteredReports = currentReports.filter(r => r.id !== id);
    
    if (filteredReports.length < currentReports.length) {
      this.reportsSubject.next(filteredReports);
      return true;
    }
    return false;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    };
    return 'Today, ' + now.toLocaleTimeString('en-US', options);
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'sales': 'fas fa-chart-line',
      'prescription': 'fas fa-prescription-bottle-alt',
      'inventory': 'fas fa-boxes',
      'financial': 'fas fa-file-invoice-dollar'
    };
    return icons[category] || 'fas fa-file-alt';
  }
}