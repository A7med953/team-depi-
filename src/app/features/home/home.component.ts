import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // ✅ جمع مش مفرد
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const slides = document.querySelectorAll('.hero-slide');
    let current = 0;

    if (slides.length) {
      slides[current].classList.add('active');
      setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
      }, 5000);
    }

    // ---------- VIDEO MODAL FUNCTIONALITY ----------
    const watchDemoBtn = document.querySelector('.btn-outline') as HTMLElement;
    const videoModal = document.getElementById('videoModal') as HTMLElement;
    const closeVideoBtn = document.querySelector('.close-video') as HTMLElement;
    const demoVideoPlayer = document.getElementById('demoVideo') as HTMLIFrameElement;

    if (watchDemoBtn && videoModal && closeVideoBtn && demoVideoPlayer) {
      watchDemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        videoModal.classList.add('active');
        demoVideoPlayer.src = 'https://www.youtube.com/embed/qk2lqY0z1s8'; // ✅ استخدمي لينك فعلي هنا
      });

      const closeAndResetVideo = () => {
        videoModal.classList.remove('active');
        demoVideoPlayer.src = '';
      };

      closeVideoBtn.addEventListener('click', closeAndResetVideo);
      videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) closeAndResetVideo();
      });
    }
  }
}
