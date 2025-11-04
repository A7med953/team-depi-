import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Item {
  name: string;
  category: string;
  price: number;
  supplier: string;
  stock: number;
  minStock: number;
  expiry: string;
}

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
  item: Item = {
    name: '',
    category: '',
    price: 0,
    supplier: '',
    stock: 0,
    minStock: 0,
    expiry: ''
  };

  constructor(private router: Router) {}

  saveItem() {
    // ✅ تأكد أن localStorage متاح (لحماية الكود من الانهيار في السيرفر)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      // Get existing inventory or initialize
      const stored = localStorage.getItem('inventory');
      const inventory = stored ? JSON.parse(stored) : [];

      // Add new item
      inventory.push(this.item);
      localStorage.setItem('inventory', JSON.stringify(inventory));

      alert('Item added successfully!');
      this.router.navigate(['/pharmacy/inventory']);
    } else {
      console.warn('localStorage is not available in this environment.');
      alert('Unable to save item: localStorage not available.');
    }
  }
}
