import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SideBarComponent implements AfterViewInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const sidebar = this.el.nativeElement.querySelector('.sidebar');
    const overlay = this.el.nativeElement.querySelector('.overlay');
    const closeBtn = this.el.nativeElement.querySelector('.close-sidebar');

    const openSidebar = () => {
      this.renderer.addClass(sidebar, 'active');
      this.renderer.addClass(overlay, 'active');
      document.body.style.overflow = 'hidden';
    };

    const closeSidebar = () => {
      this.renderer.removeClass(sidebar, 'active');
      this.renderer.removeClass(overlay, 'active');
      document.body.style.overflow = 'auto';
    };

  
    const hamburger = document.querySelector('.hamburger');
    hamburger?.addEventListener('click', openSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    const links = sidebar.querySelectorAll('a');
    links.forEach((link: HTMLElement) => {
      link.addEventListener('click', closeSidebar);
    });
  }
}
