import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.loadMedications();

    // نحمي استدعاء localStorage عشان ما يشتغلش إلا في المتصفح
    if (isPlatformBrowser(this.platformId)) {
      this.loadRecentActivity();
    }
  }

  /* ---------- تحميل الأدوية ---------- */
  loadMedications() {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('inventory');
      this.medications = data ? JSON.parse(data) : [];
    } else {
      console.warn('localStorage is not available in this environment.');
      this.medications = [];
    }
  }

  /* ---------- تحديث المخزون ---------- */
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

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('inventory', JSON.stringify(this.medications));
      this.saveHistory(med.name, this.updateType, this.quantity, this.reason, this.notes, newStock);
    }

    alert('Stock updated successfully!');
    this.loadMedications();

    if (isPlatformBrowser(this.platformId)) {
      this.loadRecentActivity();
    }
  }

  /* ---------- حفظ السجل ---------- */
  saveHistory(name: string, type: string, qty: number, reason: string, notes: string, newStock: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    const history = JSON.parse(localStorage.getItem('updateHistory') || '[]');
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

  /* ---------- تحميل النشاط الأخير ---------- */
  loadRecentActivity() {
    if (isPlatformBrowser(this.platformId)) {
      const history = JSON.parse(localStorage.getItem('updateHistory') || '[]');
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
    } else {
      console.warn('localStorage is not available in this environment.');
      this.recentActivity = [];
    }
  }

  /* ---------- حساب المدة الزمنية ---------- */
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
