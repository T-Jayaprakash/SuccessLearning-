import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';
import { DESTINATIONS, Destination } from '../../core/data/destinations.data';

interface Course {
  name: string;
  icon: string;
  color: string;
  slug: string;
  description: string;
}

interface Testimonial {
  name: string;
  course: string;
  score: string;
  rating: number;
  text: string;
  designation: string;
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
    { name: 'IELTS', icon: 'bi-translate', color: '#C62828', slug: 'ielts-coaching', description: 'Achieve your target band score with expert coaching and regular mock tests.' },
    { name: 'TOEFL', icon: 'bi-globe2', color: '#1565C0', slug: 'toefl-coaching', description: 'Computer-based TOEFL iBT preparation with integrated task practice.' },
    { name: 'GRE', icon: 'bi-calculator', color: '#2E7D32', slug: 'gre-coaching', description: 'Master Verbal, Quantitative & Analytical Writing for a competitive score.' },
    { name: 'GMAT', icon: 'bi-graph-up-arrow', color: '#E65100', slug: 'gmat-coaching', description: 'Strategic GMAT prep for MBA aspirants with adaptive practice.' },
    { name: 'Spoken English', icon: 'bi-chat-quote', color: '#6A1B9A', slug: 'spoken-english', description: 'Build fluency and confidence for conversations, interviews & presentations.' },
    { name: 'German', icon: 'bi-flag', color: '#37474F', slug: 'german-classes', description: 'A1 to B2 levels with Goethe-Zertifikat exam preparation.' },
    { name: 'French', icon: 'bi-flag', color: '#0D47A1', slug: 'french-classes', description: 'A1 to B2 levels with DELF exam preparation and cultural context.' },
    { name: 'Japanese', icon: 'bi-flag', color: '#B71C1C', slug: 'japanese-classes', description: 'N5 to N3 levels with JLPT preparation and script training.' },
    { name: 'PTE / OET / Duolingo', icon: 'bi-patch-check', color: '#00695C', slug: 'pte-oet-duolingo', description: 'Flexible English proficiency test preparation with mock tests.' },
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
    { name: 'Priya Ramanathan', course: 'IELTS', score: 'Band 7.5', rating: 5, text: 'I joined Success Learning for IELTS preparation and it was the best decision. The trainers focused on my weak areas — especially writing. I improved from Band 6 to 7.5 in just 6 weeks.', designation: 'MS Aspirant' },
    { name: 'Karthik Sundaram', course: 'GRE', score: '318/340', rating: 5, text: 'The GRE coaching is very structured. The vocabulary building approach and quant strategies helped me score 318. The small batch size meant I got personal attention whenever I was stuck.', designation: 'Software Engineer' },
    { name: 'Meera Lakshmi', course: 'Spoken English', score: '', rating: 5, text: 'I was very hesitant to speak English in professional settings. After 2 months at Success Learning, I can now confidently present in meetings and handle interviews.', designation: 'Working Professional' },
    { name: 'Aravind Kumar', course: 'German A2', score: 'Goethe A2 Certified', rating: 5, text: 'The German classes here are very well-structured. The teacher made grammar easy to understand and the conversational practice sessions were very helpful.', designation: 'Engineering Student' },
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
      title: 'Success Learning — Expert Language & Exam Coaching in Trichy',
      description: 'Success Learning is Trichy\'s trusted coaching centre for IELTS, TOEFL, GRE, GMAT, Spoken English, German, French & Japanese. Expert trainers, small batches, flexible timings. Thillai Nagar, Trichy.',
      keywords: 'IELTS coaching Trichy, TOEFL Trichy, GRE Trichy, GMAT Trichy, spoken English Trichy, German classes Trichy, Success Learning',
    });
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
