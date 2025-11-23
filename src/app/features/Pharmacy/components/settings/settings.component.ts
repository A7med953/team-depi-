import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
    imports: [CommonModule,FormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent {

  isEditing = false;

  pharm = {
    name: 'pharmacy',
    specialty: 'pharmacist',
    email: 'pharmacy@example.com',
    phone: '+966 50 123 4567',
    location: 'Egypt',
    experience: '8 years',
    education: 'Bachelor of Pharmacy, banha University',
    bio: 'Dedicated pharmacist committed to optimizing patient safety, improving medication therapy, and promoting better health outcomes.',
    image: 'Images/pharm.jpg'
  };

  editedpharm = { ...this.pharm };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.editedpharm = { ...this.pharm };
  }

  saveChanges() {
    this.pharm = { ...this.editedpharm };
    this.isEditing = false;
  }
}
