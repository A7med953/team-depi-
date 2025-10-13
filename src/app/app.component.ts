import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppointmentsComponent } from './doctor/appointments/appointments.component'; 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppointmentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
