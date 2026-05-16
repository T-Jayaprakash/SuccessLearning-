import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';
import { DESTINATIONS, Destination } from '../../core/data/destinations.data';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss'],
})
export class DestinationsComponent implements OnInit, AfterViewInit {
  destinations = DESTINATIONS;
  stats = [
    { icon: 'bi-globe-americas', value: '11+', label: 'Study Destinations' },
    { icon: 'bi-mortarboard-fill', value: '500+', label: 'Students Guided' },
    { icon: 'bi-building', value: '50+', label: 'Partner Universities' },
    { icon: 'bi-passport-fill', value: '95%', label: 'Visa Success Rate' },
  ];

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Study Abroad Destinations — Success Learning Trichy',
      description: 'Explore 11+ study abroad destinations. Success Learning Trichy helps you with language preparation, entrance exams, university selection, and visa guidance. Canada, UK, USA, Australia, Germany & more.',
      keywords: 'study abroad Trichy, study in Canada Trichy, study in UK Trichy, study in Germany Trichy, overseas education consultant Trichy',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }

  getTuitionColor(tuition: string): string {
    return tuition === 'Affordable' ? '#38A169' : tuition === 'Moderate' ? '#D69E2E' : '#E53E3E';
  }
}
