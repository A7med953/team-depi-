import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomComponent } from '../../../../custom/custom.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-pharmacy',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    RouterLink,
    CustomComponent,
    RouterLinkActive],
  templateUrl: './pharmacy.component.html',
  styleUrls:['./pharmacy.component.css']
})
export class PharmacyComponent {
  navItems = [
    { name: 'Prescriptions', icon: 'fas fa-prescription-bottle-alt', route: './prescriptions' },
    { name: 'Patient Lookup', icon: 'fas fa-user-friends', route: './patient-lookup' },
    { name: 'Inventory', icon: 'fas fa-warehouse', route: './inventory' },
    { name: 'Notifications', icon: 'fas fa-bell', route: './notifications' },
    { name: 'Reports', icon: 'fas fa-chart-line', route: './reports' },
    { name: 'Settings', icon: 'fas fa-cog', route: './settings' }
  ];

  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}