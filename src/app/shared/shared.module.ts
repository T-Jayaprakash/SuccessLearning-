import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SiteFooterComponent } from './components/footer/footer.component';
import { WhatsappFabComponent } from './components/whatsapp-fab/whatsapp-fab.component';
import { CtaBannerComponent } from './components/cta-banner/cta-banner.component';
import { PageHeroComponent } from './components/page-hero/page-hero.component';
import { FaqAccordionComponent } from './components/faq-accordion/faq-accordion.component';

const COMPONENTS = [
  NavbarComponent,
  SiteFooterComponent,
  WhatsappFabComponent,
  CtaBannerComponent,
  PageHeroComponent,
  FaqAccordionComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  exports: [...COMPONENTS, CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
