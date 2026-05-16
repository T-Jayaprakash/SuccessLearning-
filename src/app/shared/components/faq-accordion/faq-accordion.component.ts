import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-faq-accordion',
  template: `
    <div class="faq-accordion" id="faq-accordion">
      <div *ngFor="let item of items; let i = index" class="faq-accordion__item" [class.open]="openIndex === i">
        <button class="faq-accordion__trigger" (click)="toggle(i)" [attr.aria-expanded]="openIndex === i">
          <span class="faq-accordion__question">{{ item.question }}</span>
          <i class="bi faq-accordion__icon" [class.bi-plus]="openIndex !== i" [class.bi-dash]="openIndex === i"></i>
        </button>
        <div class="faq-accordion__body" [class.open]="openIndex === i">
          <p class="faq-accordion__answer">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./faq-accordion.component.scss'],
})
export class FaqAccordionComponent {
  @Input() items: { question: string; answer: string }[] = [];
  openIndex: number | null = 0;

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
