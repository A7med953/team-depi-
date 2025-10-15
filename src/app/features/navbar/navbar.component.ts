import { Component, AfterViewInit, input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements AfterViewInit {
  readonly layout = input.required<string>();
  ngAfterViewInit(): void {
    const hamburger = document.querySelector('.hamburger') as HTMLElement;
    const sidebar = document.querySelector('.sidebar') as HTMLElement;
    const closeSidebarBtn = document.querySelector('.close-sidebar') as HTMLElement;
    const overlay = document.querySelector('.overlay') as HTMLElement;

    const openSidebar = () => {
      sidebar?.classList.add('active');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      sidebar?.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    hamburger?.addEventListener('click', openSidebar);
    closeSidebarBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);
  }
}
