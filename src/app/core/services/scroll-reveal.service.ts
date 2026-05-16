import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private observer!: IntersectionObserver;

  init(): void {
    if (this.observer) return;
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
  }

  observe(element: Element): void {
    if (!this.observer) this.init();
    this.observer.observe(element);
  }

  observeAll(parentElement: Element): void {
    if (!this.observer) this.init();
    const targets = parentElement.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    );
    targets.forEach((el) => this.observer.observe(el));
  }
}
