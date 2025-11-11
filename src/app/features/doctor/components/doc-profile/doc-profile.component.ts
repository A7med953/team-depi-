import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doc-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './doc-profile.component.html',
  styleUrl: './doc-profile.component.css'
})
export class DocProfileComponent {

  isEditing = false;

  doctor = {
    name: 'Dr. Ahmed ',
    specialty: 'Cardiologist',
    email: 'ahmed@example.com',
    phone: '+20 10224',
    location: 'New Damietta, Egypt',
    experience: '5 years',
    education: 'Bachelor of Medicine, Mansoura University',
    bio: 'Passionate about providing quality cardiac care and helping patients live healthier lives.',
    image: '/download.jpg'
  };

  editedDoctor = { ...this.doctor };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.editedDoctor = { ...this.doctor };
  }

  saveChanges() {
    this.doctor = { ...this.editedDoctor };
    this.isEditing = false;
  }
}