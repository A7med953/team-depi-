import { Component } from '@angular/core';
import { NavBarComponent } from "../../../features/navbar/navbar.component";
import { RouterOutlet } from "../../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";
import { FooterComponent } from "../../../features/footer/footer.component";

@Component({
  selector: 'app-user',
  imports: [NavBarComponent, RouterOutlet, FooterComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
