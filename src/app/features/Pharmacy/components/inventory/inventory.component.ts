import { Component, OnInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})
export class InventoryComponent  implements OnInit {
@ViewChild('searchInput') searchInput: ElementRef | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupActionListeners();
    }
  }

  filterInventory(event: Event) {
    if (!isPlatformBrowser(this.platformId)) return;

    const inputElement = event.target as HTMLInputElement;
    const filter = inputElement.value.toUpperCase();

    const cards = document.querySelectorAll('.inventory-card');

    cards.forEach(card => {
      const name = card.getAttribute('data-name')?.toUpperCase() || '';
      const category = card.getAttribute('data-category')?.toUpperCase() || '';
      const supplier = card.getAttribute('data-supplier')?.toUpperCase() || '';

      if (name.includes(filter) || category.includes(filter) || supplier.includes(filter)) {
        (card as HTMLElement).style.display = "";
      } else {
        (card as HTMLElement).style.display = "none";
      }
    });
  }

  setupActionListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    document.querySelectorAll('.action-btn').forEach(button => {
      button.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const card = target.closest('.inventory-card');
        const medicationName = card?.querySelector('.medication-name')?.textContent;

        if (target.classList.contains('update-btn') && medicationName) {
          console.log(`Update Stock for: ${medicationName}`);
        } else if (target.classList.contains('view-btn') && medicationName) {
          console.log(`View Details for: ${medicationName}`);
        }
      });
    });

    document.querySelector('.add-item-btn')?.addEventListener('click', () => {
      console.log('فتح نموذج إضافة عنصر جديد');
    });
  }

  onAddItemClick(): void {
    console.log('فتح نموذج إضافة عنصر جديد ');
  }
}
