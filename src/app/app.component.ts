import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./core/Auth/components/login/login.component";
// import { LoginComponent } from "./Auth/login/login.component"; 
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    // LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
}
