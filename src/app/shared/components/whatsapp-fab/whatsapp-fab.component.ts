import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  template: `
    <a href="https://wa.me/919840979292" target="_blank" rel="noopener"
       class="whatsapp-fab" aria-label="Chat on WhatsApp" id="whatsapp-fab">
      <i class="bi bi-whatsapp"></i>
      <span class="whatsapp-fab__tooltip">Chat with us</span>
    </a>
  `,
  styles: [`
    .whatsapp-fab {
      position: fixed; bottom: 24px; right: 24px; z-index: 900;
      width: 56px; height: 56px; border-radius: 50%;
      background: #25D366; color: white; display: flex; align-items: center; justify-content: center;
      box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
      transition: all 0.25s ease; text-decoration: none; font-size: 26px;
    }
    .whatsapp-fab:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5); color: white; }
    .whatsapp-fab__tooltip {
      position: absolute; right: 68px; background: #333; color: white;
      padding: 6px 12px; border-radius: 6px; font-size: 13px; white-space: nowrap;
      opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
      font-family: 'Poppins', sans-serif;
    }
    .whatsapp-fab:hover .whatsapp-fab__tooltip { opacity: 1; }
  `],
})
export class WhatsappFabComponent {}
