import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {
  medications: any[] = [];
  selectedMedication = '';
  updateType = 'add';
  quantity = 1;
  reason = '';
  notes = '';
  currentMedication = '—';
  currentStock = 0;
  minStock = 0;
  stockStatus = 'Normal Stock';
  statusClass = '';
  recentActivity: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadMedications();
    this.loadRecentActivity();

    // استلام اسم الدواء من صفحة Inventory
    this.route.queryParams.subscribe(params => {
      const medName = params['medication'];

      if (medName) {
        this.selectedMedication = medName;
        this.setMedicationDetails();
      }
    });
  }

  // ======================================================
  // 🟦 تحميل قائمة الأدوية
  // ======================================================
  loadMedications() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('inventory');
      this.medications = data ? JSON.parse(data) : [];
    } else {
      console.warn('localStorage is not available in this environment.');
      this.medications = [];
    }
  }

  // ======================================================
  // 🟦 اختيار دواء وإظهار تفاصيله
  // ======================================================
  setMedicationDetails() {
    const med = this.medications.find(m => m.name === this.selectedMedication);
    if (!med) return;

    this.currentMedication = med.name;
    this.currentStock = med.stock;
    this.minStock = med.minStock;

    if (med.stock <= med.minStock) {
      this.stockStatus = "Low Stock";
      this.statusClass = "low-stock";
    } else {
      this.stockStatus = "Normal Stock";
      this.statusClass = "normal-stock";
    }
  }

  // ======================================================
  // 🟦 تحديث المخزون
  // ======================================================
  updateStock() {
    const medIndex = this.medications.findIndex(m => m.name === this.selectedMedication);
    if (medIndex === -1) {
      alert('Please select a valid medication!');
      return;
    }

    const med = this.medications[medIndex];
    let newStock = +med.stock;

    switch (this.updateType) {
      case 'add':
        newStock += this.quantity;
        break;
      case 'remove':
        newStock = Math.max(0, newStock - this.quantity);
        break;
      case 'set':
        newStock = this.quantity;
        break;
    }

    med.stock = newStock;

    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.setItem('inventory', JSON.stringify(this.medications));
    }

    this.saveHistory(med.name, this.updateType, this.quantity, this.reason, this.notes, newStock);

    alert('Stock updated successfully!');

    this.loadRecentActivity();
    this.loadMedications();
    this.setMedicationDetails();
  }

  // ======================================================
  // 🟦 حفظ سجل التعديلات
  // ======================================================
  saveHistory(name: string, type: string, qty: number, reason: string, notes: string, newStock: number) {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      console.warn('localStorage unavailable, history not saved.');
      return;
    }

    const raw = localStorage.getItem('updateHistory');
    let history = raw ? JSON.parse(raw) : [];

    history.unshift({
      medication: name,
      type,
      quantity: qty,
      reason,
      notes,
      newStock,
      timestamp: new Date().toISOString()
    });

    localStorage.setItem('updateHistory', JSON.stringify(history.slice(0, 50)));
  }

  // ======================================================
  // 🟦 تحميل آخر النشاطات (Recent Activity)
  // ======================================================
  loadRecentActivity() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      console.warn('localStorage is not available.');
      this.recentActivity = [];
      return;
    }

    const raw = localStorage.getItem('updateHistory');
    if (!raw) {
      this.recentActivity = [];
      return;
    }

    let history: any[] = [];
    try {
      history = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to parse updateHistory:', err);
      history = [];
    }

    this.recentActivity = history.slice(0, 5).map((h: any) => {
      let icon = 'fa-edit';
      let text = '';

      switch (h.type) {
        case 'add':
          icon = 'fa-plus-circle';
          text = `<strong>${h.quantity} units</strong> added to <strong>${h.medication}</strong>`;
          break;

        case 'remove':
          icon = 'fa-minus-circle';
          text = `<strong>${h.quantity} units</strong> removed from <strong>${h.medication}</strong>`;
          break;

        case 'set':
          icon = 'fa-edit';
          text = `Stock set to <strong>${h.quantity} units</strong> for <strong>${h.medication}</strong>`;
          break;
      }

      return { icon, text, time: this.getTimeAgo(h.timestamp) };
    });
  }

  // ======================================================
  // 🟦 حساب الوقت
  // ======================================================
  getTimeAgo(timestamp: string): string {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = Math.floor((+now - +past) / 60000);

    if (diff < 1) return 'Just now';
    if (diff < 60) return `${diff} minutes ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)} hours ago`;

    return `${Math.floor(diff / 1440)} days ago`;
  }
}
