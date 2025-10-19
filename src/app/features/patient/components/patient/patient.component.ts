import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, CommonModule ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  toggleMenu(): void {
    const menu = document.querySelector('.menu');
    if (menu) {
      menu.classList.toggle('visible');
    }
  }
}
