import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';
import { DESTINATIONS, Destination } from '../../core/data/destinations.data';

@Component({
  selector: 'app-destination-detail',
  templateUrl: './destination-detail.component.html',
  styleUrls: ['./destination-detail.component.scss'],
})
export class DestinationDetailComponent implements OnInit, AfterViewInit {
  dest!: Destination;
  faqs: { question: string; answer: string }[] = [];
  relatedDestinations: Destination[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
    private scrollReveal: ScrollRevealService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const found = DESTINATIONS.find(d => d.slug === slug);
      if (!found) { this.router.navigate(['/study-abroad']); return; }
      this.dest = found;
      this.seo.updateMeta({ title: this.dest.seoTitle, description: this.dest.seoDescription });
      this.relatedDestinations = DESTINATIONS.filter(d => d.slug !== slug).slice(0, 3);
      this.faqs = [
        { question: `What exams are required to study in ${this.dest.name}?`, answer: `The commonly accepted exams are: ${this.dest.examsRequired.join(', ')}. Requirements vary by university and program.` },
        { question: `Can I work while studying in ${this.dest.name}?`, answer: `Yes, most student visas in ${this.dest.name} allow part-time work. ${this.dest.workPermit} is available after graduation.` },
        { question: `What is the tuition fee range in ${this.dest.name}?`, answer: `Tuition in ${this.dest.name} is categorised as "${this.dest.tuition}". Exact fees depend on the university and program chosen. Contact us for detailed cost breakdowns.` },
        { question: `How does Success Learning help with ${this.dest.name} applications?`, answer: `We provide comprehensive support — language preparation (${this.dest.examsRequired[0]}), entrance exam coaching, SOP/LOR guidance, university shortlisting, and visa documentation assistance.` },
        { question: `What are the popular intakes for ${this.dest.name}?`, answer: `The main intakes are: ${this.dest.popularIntakes.join(', ')}. We recommend starting preparation 6–8 months before your target intake.` },
      ];
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }
}
