import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ضروري لـ *ngFor و [ngClass]
import { FormsModule } from '@angular/forms'; // إذا كنتِ تريدين استخدام [(ngModel)]

// تعريف الواجهة (Interface) لتنظيم البيانات
interface Prescription {
  id: string;
  medication: string;
  patientName: string;
  date: string;
  dosage: string;
  duration: string;
  frequency: string;
  quantity: number;
  prescribedBy: string;
  instructions: string;
  status: 'pending' | 'dispensed' | 'cancelled';
}

@Component({
  selector: 'app-prescriptions',
  imports: [CommonModule, FormsModule],
  templateUrl: './prescriptions.component.html',
  styleUrl: './prescriptions.component.css'
})
export class PrescriptionsComponent implements OnInit  {
 // البيانات الأصلية (Mock Data)
  allPrescriptions: Prescription[] = [
    {
      id: 'P001',
      medication: 'Lisinopril',
      patientName: 'Alice Brown',
      date: '12/15/2024',
      dosage: '10mg',
      duration: '30 days',
      frequency: 'Once daily',
      quantity: 30,
      prescribedBy: 'Dr. John Smith',
      instructions: 'Take with food in the morning',
      status: 'pending',
    },
    {
      id: 'P002',
      medication: 'Metformin',
      patientName: 'Alice Brown',
      date: '12/10/2024',
      dosage: '500mg',
      duration: '60 days',
      frequency: 'Twice daily',
      quantity: 120,
      prescribedBy: 'Dr. Emily White',
      instructions: 'Take with meals to reduce stomach upset',
      status: 'dispensed',
    },
    {
      id: 'P003',
      medication: 'Amoxicillin',
      patientName: 'Bob Johnson',
      date: '12/01/2024',
      dosage: '250mg',
      duration: '7 days',
      frequency: 'Three times daily',
      quantity: 21,
      prescribedBy: 'Dr. Sarah Green',
      instructions: 'Finish all medication even if you feel better',
      status: 'cancelled',
    },
    {
      id: 'P004',
      medication: 'Simvastatin',
      patientName: 'Charlie Davis',
      date: '11/20/2024',
      dosage: '20mg',
      duration: '90 days',
      frequency: 'Once daily (bedtime)',
      quantity: 90,
      prescribedBy: 'Dr. John Smith',
      instructions: 'Avoid grapefruit juice',
      status: 'pending',
    },
  ];

  filteredPrescriptions: Prescription[] = [];
  currentFilterStatus: 'all' | 'pending' | 'dispensed' | 'cancelled' = 'all';
  currentSearchTerm = '';

  ngOnInit(): void {
    // عرض الكل عند تحميل المكون لأول مرة
    this.applyFilters();
  }

  /**
   * يقوم بتطبيق التصفية بناءً على الحالة الحالية وشريط البحث.
   */
  applyFilters(): void {
    let filtered = [...this.allPrescriptions];

    // 1. تصفية الحالة
    if (this.currentFilterStatus !== 'all') {
      filtered = filtered.filter((p) => p.status === this.currentFilterStatus);
    }

    // 2. تصفية البحث
    if (this.currentSearchTerm) {
      const searchTermLower = this.currentSearchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.medication.toLowerCase().includes(searchTermLower) ||
          p.patientName.toLowerCase().includes(searchTermLower) ||
          p.prescribedBy.toLowerCase().includes(searchTermLower)
      );
    }

    this.filteredPrescriptions = filtered;
  }

  /**
   * تغيير حالة التصفية وإعادة تطبيق الفلاتر.
   */
  handleFilterChange(status: 'all' | 'pending' | 'dispensed' | 'cancelled') {
    this.currentFilterStatus = status;
    this.applyFilters();
  }

  /**
   * تحديث مصطلح البحث وإعادة تطبيق الفلاتر.
   */
  handleSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    this.currentSearchTerm = inputElement?.value.trim() || '';
    this.applyFilters();
  }

  /**
   * معالجة إجراءات صرف أو إلغاء الوصفة.
   */
  handleAction(prescriptionId: string, actionType: 'dispense' | 'cancel') {
    const prescription = this.allPrescriptions.find((p) => p.id === prescriptionId);
    if (!prescription) return;

    if (actionType === 'dispense') {
      prescription.status = 'dispensed';
      alert(`Prescription for ${prescription.medication} dispensed!`);
    } else {
      prescription.status = 'cancelled';
      alert(`Prescription for ${prescription.medication} cancelled.`);
    }

    // مهم: إعادة تطبيق التصفية لتحديث عرض القائمة فوريًا
    this.applyFilters();
  }

  /**
   * خاصية Getter لحساب عدد الوصفات المعلقة ديناميكيًا.
   */
  get pendingCount(): number {
    return this.allPrescriptions.filter((p) => p.status === 'pending').length;
  }
}
