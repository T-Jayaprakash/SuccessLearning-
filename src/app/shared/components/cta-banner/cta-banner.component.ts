import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-banner',
  template: `
    <section class="cta-banner" id="cta-banner">
      <div class="cta-banner__container">
        <div class="cta-banner__content">
          <h2 class="cta-banner__title">{{ title }}</h2>
          <p class="cta-banner__subtitle">{{ subtitle }}</p>
        </div>
        <div class="cta-banner__actions">
          <a href="tel:+919840979292" class="cta-banner__btn cta-banner__btn--call">
            <i class="bi bi-telephone-fill"></i> Call Now
          </a>
          <a href="https://wa.me/919840979292" target="_blank" rel="noopener" class="cta-banner__btn cta-banner__btn--whatsapp">
            <i class="bi bi-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./cta-banner.component.scss'],
})
export class CtaBannerComponent {
  @Input() title = 'Start Your Learning Journey Today';
  @Input() subtitle = 'Get expert guidance from experienced trainers. Book a free consultation now.';
}
