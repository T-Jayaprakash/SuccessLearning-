import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-hero',
  template: `
    <section class="page-hero" [style.background-color]="bgColor" id="page-hero">
      <div class="page-hero__container">
        <nav class="page-hero__breadcrumb" aria-label="Breadcrumb">
          <a routerLink="/">Home</a>
          <span class="page-hero__sep">/</span>
          <span *ngFor="let crumb of breadcrumbs; let last = last">
            <a *ngIf="!last && crumb.route" [routerLink]="crumb.route">{{ crumb.label }}</a>
            <span *ngIf="last || !crumb.route" class="page-hero__current">{{ crumb.label }}</span>
            <span *ngIf="!last" class="page-hero__sep">/</span>
          </span>
        </nav>
        <h1 class="page-hero__title">{{ title }}</h1>
        <p *ngIf="subtitle" class="page-hero__subtitle">{{ subtitle }}</p>
      </div>
    </section>
  `,
  styleUrls: ['./page-hero.component.scss'],
})
export class PageHeroComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() bgColor = '#0A1F44';
  @Input() breadcrumbs: { label: string; route?: string }[] = [];
}
