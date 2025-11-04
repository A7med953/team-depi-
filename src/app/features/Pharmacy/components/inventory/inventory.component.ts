import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  name: string;
  category: string;
  supplier: string;
  stock: number;
  minStock: number;
  expiry: string;
  batch: string;
  price: string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  lowStockItems: InventoryItem[] = [];
  expiringItems: InventoryItem[] = [];
  searchTerm = '';
  lastUpdatedTime = 'Just now';

  // ✅ المتغيرات الجديدة للعرض في الـ header
  lowStockCount: number = 0;
  expiringCount: number = 0;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadInventory();
    setInterval(() => this.updateLastUpdatedTime(), 5000);
  }

  /* ---------- تحميل المخزون ---------- */
  loadInventory() {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('inventory');
      this.inventory = stored ? JSON.parse(stored) : this.defaultInventory();
      this.updateAlerts();
      this.updateLastUpdatedTime();
    } else {
      console.warn('localStorage is not available in this environment.');
      this.inventory = this.defaultInventory();
    }
  }

  /* ---------- بيانات افتراضية ---------- */
  defaultInventory(): InventoryItem[] {
    const defaultData: InventoryItem[] = [
      {
        name: 'Lisinopril 10mg',
        category: 'Cardiovascular',
        supplier: 'PharmaCorp',
        stock: 150,
        minStock: 50,
        expiry: '2025-06-15',
        batch: 'LIS2024001',
        price: '0.25'
      },
      {
        name: 'Metformin 500mg',
        category: 'Diabetes',
        supplier: 'MediSupply',
        stock: 25,
        minStock: 100,
        expiry: '2025-03-20',
        batch: 'MET2024002',
        price: '0.15'
      },
      {
        name: 'Amoxicillin 250mg',
        category: 'Antibiotic',
        supplier: 'PharmaCorp',
        stock: 300,
        minStock: 100,
        expiry: '2024-12-30',
        batch: 'AMX2024003',
        price: '0.35'
      }
    ];

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('inventory', JSON.stringify(defaultData));
    }

    return defaultData;
  }

  /* ---------- تحديث التنبيهات ---------- */
  updateAlerts() {
    const today = new Date();
    const threeMonths = new Date(today);
    threeMonths.setMonth(today.getMonth() + 3);

    this.lowStockItems = this.inventory.filter(item => item.stock <= item.minStock);
    this.expiringItems = this.inventory.filter(item => new Date(item.expiry) <= threeMonths);

    // ✅ تحديث القيم المعروضة في الـ header
    this.lowStockCount = this.lowStockItems.length;
    this.expiringCount = this.expiringItems.length;
  }

  /* ---------- تحديث العرض ---------- */
  refreshInventory() {
    this.loadInventory();
  }

  /* ---------- تحديث الوقت ---------- */
  updateLastUpdatedTime() {
    this.lastUpdatedTime = new Date().toLocaleTimeString();
  }

  /* ---------- صلاحية الدواء ---------- */
  isExpiringSoon(expiry: string): boolean {
    const oneMonth = new Date();
    oneMonth.setMonth(oneMonth.getMonth() + 1);
    return new Date(expiry) <= oneMonth;
  }

  getExpiryClass(expiry: string): string {
    if (this.isExpiringSoon(expiry)) return 'expiring-danger-text';
    return '';
  }

  /* ---------- تنسيق التاريخ ---------- */
  formatDate(date: string): string {
    const d = new Date(date);
    return isNaN(d.getTime())
      ? date
      : `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  }

  /* ---------- الانتقال إلى صفحة تعديل المخزون ---------- */
  goToUpdateStock(name: string) {
    this.router.navigate(['/update-stock'], { queryParams: { medication: name } });
  }

  /* ---------- عرض تفاصيل العنصر ---------- */
  viewItem(name: string) {
    alert(`Viewing details for: ${name}`);
  }

  /* ---------- الفلترة ---------- */
  filteredInventory(): InventoryItem[] {
    const term = this.searchTerm.toLowerCase();
    return this.inventory.filter(
      i =>
        i.name.toLowerCase().includes(term) ||
        i.category.toLowerCase().includes(term) ||
        i.supplier.toLowerCase().includes(term)
    );
  }
}
