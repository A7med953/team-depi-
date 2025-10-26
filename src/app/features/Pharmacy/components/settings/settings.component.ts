import { Component, OnInit } from '@angular/core';
interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  date_of_birth: string;
  medical_notes: string;
}

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit{
// =======================================================
  // 1. Mock API Data
  // =======================================================
  mockData: { profile: UserProfile[] } = {
    profile: [
      {
        id: 1,
        name: 'pharmacy',
        email: 'pharmacy@example.com',
        phone: '+966 50 123 4567',
        profile_image: 'https://i.ibb.co/L89kY3j/user-avatar.png',
        date_of_birth: '1995-05-15',
        medical_notes: 'No known drug allergies.',
      },
    ],
  };

  // =======================================================
  // 2. Properties to bind in HTML
  // =======================================================
  user!: UserProfile;

  // =======================================================
  // 3. Lifecycle Hook
  // =======================================================
  ngOnInit(): void {
    this.loadUserInfo();
  }

  // =======================================================
  // 4. Load User Info
  // =======================================================
  loadUserInfo(): void {
    this.user = this.mockData.profile[0];
  }
}
