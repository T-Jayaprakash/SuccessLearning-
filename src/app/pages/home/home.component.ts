import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';
import { DESTINATIONS, Destination } from '../../core/data/destinations.data';

interface Course {
  name: string;
  image: string;
  color: string;
  slug: string;
  description: string;
}

interface Testimonial {
  name: string;
  time: string;
  rating: number;
  text: string;
  color: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  trustItems = [
    { icon: 'bi-person-check', label: 'Experienced Trainers' },
    { icon: 'bi-people', label: 'Small Batch Sizes' },
    { icon: 'bi-clock', label: 'Flexible Timings' },
    { icon: 'bi-laptop', label: 'Online & Offline Classes' },
    { icon: 'bi-bullseye', label: 'Personalised Coaching' },
  ];

  courses: Course[] = [
    { name: 'IELTS', image: 'assets/images/courses/ielts.jpg', color: '#C62828', slug: 'ielts-coaching', description: 'Achieve your target band score with expert coaching and regular mock tests.' },
    { name: 'TOEFL', image: 'assets/images/courses/toefl.jpg', color: '#1565C0', slug: 'toefl-coaching', description: 'Computer-based TOEFL iBT preparation with integrated task practice.' },
    { name: 'GRE', image: 'assets/images/courses/gre.jpg', color: '#2E7D32', slug: 'gre-coaching', description: 'Master Verbal, Quantitative & Analytical Writing for a competitive score.' },
    { name: 'GMAT', image: 'assets/images/courses/gmat.jpg', color: '#E65100', slug: 'gmat-coaching', description: 'Strategic GMAT prep for MBA aspirants with adaptive practice.' },
    { name: 'Spoken English', image: 'assets/images/courses/spoken-english.jpg', color: '#6A1B9A', slug: 'spoken-english', description: 'Build fluency and confidence for conversations, interviews & presentations.' },
    { name: 'German', image: 'assets/images/courses/german.jpg', color: '#37474F', slug: 'german-classes', description: 'A1 to B2 levels with Goethe-Zertifikat exam preparation.' },
    { name: 'French', image: 'assets/images/courses/french.jpg', color: '#0D47A1', slug: 'french-classes', description: 'A1 to B2 levels with DELF exam preparation and cultural context.' },
    { name: 'Japanese', image: 'assets/images/courses/japanese.jpg', color: '#B71C1C', slug: 'japanese-classes', description: 'N5 to N3 levels with JLPT preparation and script training.' },
    { name: 'PTE / OET / Duolingo', image: 'assets/images/courses/pte-oet.jpg', color: '#00695C', slug: 'pte-oet-duolingo', description: 'Flexible English proficiency test preparation with mock tests.' },
  ];

  whyChooseUs = [
    { icon: 'bi-person-lines-fill', title: 'Individual Attention', desc: 'Small batch sizes ensure every student gets personalised guidance and feedback.' },
    { icon: 'bi-mic', title: 'Practical Sessions', desc: 'Focus on real-world application through speaking drills, group discussions, and role plays.' },
    { icon: 'bi-clipboard-check', title: 'Regular Mock Tests', desc: 'Timed practice tests that simulate actual exam conditions for better preparedness.' },
    { icon: 'bi-award', title: 'Certified Trainers', desc: 'Learn from experienced, qualified trainers who understand exam patterns deeply.' },
    { icon: 'bi-calendar-check', title: 'Flexible Schedule', desc: 'Morning, evening, and weekend batches available to fit your routine.' },
    { icon: 'bi-currency-rupee', title: 'Affordable Fees', desc: 'Quality coaching at reasonable fees with no hidden charges.' },
  ];

  testimonials: Testimonial[] = [
    { name: 'SUDHAKARAN Karan sudha', time: '2 years ago', rating: 5, text: 'Hi, I am SUDHAKARAN, First of all thank you so much, sir and Sheril mam also Monisha mam, UK VI test it was great experience for me. My qualification 12th Tamil medium. GRAMMAR is very useful, UK VI in this classes very useful, success learning. December month going to UK. Thank you, SUCCESS LEARNING.', color: '#00897B' },
    { name: 'Janet ofiliya .V', time: 'a year ago', rating: 5, text: 'I came here for the preparation of my IELTS exam... Here they have good environment to prepare and staffs working here are too polite, they are explaining each and everything with some tips and tricks to crack the exam and I think it is a good place to prepare. Thank you success learning', color: '#8E24AA' },
    { name: 'Raja Ram', time: 'a year ago', rating: 5, text: 'Hi Iam Ram , First of all thank you so much for Mr, Mydeen sir, Mr, Ramesh sir and Sheril mam, I would like to thank you again, for your efforts in creating a positive and supportive learning environment.', color: '#E53935' },
    { name: 'Kabi Kabilesh', time: 'a year ago', rating: 5, text: 'This is the best institute for IELTS coaching in Trichy. The staff are very friendly and they guide you through every module with great patience. Highly recommended!', color: '#3949AB' }
  ];

  currentTestimonial = 0;
  topDestinations = DESTINATIONS.slice(0, 6);

  galleryImages = [
    { src: 'assets/images/IMG-20231227-WA0001.jpg', alt: 'Classroom session at Success Learning' },
    { src: 'assets/images/IMG-20231227-WA0003.jpg', alt: 'Student training session' },
    { src: 'assets/images/IMG-20231227-WA0004.jpg', alt: 'Group coaching session' },
    { src: 'assets/images/IMG-20231228-WA0004.jpg', alt: 'Interactive learning' },
    { src: 'assets/images/about-people.jpg', alt: 'Students at Success Learning' },
    { src: 'assets/images/about-show.jpg', alt: 'Seminar at Success Learning' },
  ];

  constructor(
    private seo: SeoService,
    private scrollReveal: ScrollRevealService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Success Learning — Top IELTS, TOEFL, GRE Coaching in Trichy',
      description: 'Success Learning is Trichy\'s premier language training institute. Expert coaching for IELTS, TOEFL, GRE, GMAT, Spoken English, German & French with verified google reviews.',
      keywords: 'best IELTS coaching Trichy, TOEFL training Trichy, GRE coaching center Trichy, GMAT preparation, spoken English classes Trichy, study abroad consultancy Trichy, Success Learning',
    });
    this.injectStructuredData();
  }

  private injectStructuredData(): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "Success Learning",
      "url": "https://successlearning.in",
      "logo": "https://successlearning.in/assets/images/sl-head-logo.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Thillai Nagar",
        "addressLocality": "Trichy",
        "addressRegion": "Tamil Nadu",
        "addressCountry": "IN"
      },
      "telephone": "+919840979292",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "22"
      }
    });
    document.head.appendChild(script);
  }

  ngAfterViewInit(): void {
    this.scrollReveal.observeAll(this.el.nativeElement);
  }

  nextTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
  }

  prevTestimonial(): void {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  }
}
