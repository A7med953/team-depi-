import { Component } from '@angular/core';
import { NavBarComponent } from '../../../features/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../features/footer/footer.component';

@Component({
  selector: 'app-auth',
  imports: [NavBarComponent,RouterOutlet,FooterComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

}
