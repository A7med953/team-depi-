import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomComponent } from '../../../../custom/custom.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-doctor',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule ,CustomComponent ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent {
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
