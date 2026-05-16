import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, AfterViewInit {
  values = [
    { icon: 'bi-bullseye', title: 'Student-First Approach', desc: 'Every decision we make starts with one question — how does this help our students succeed?' },
    { icon: 'bi-lightbulb', title: 'Practical Learning', desc: 'We believe in learning by doing. Our sessions focus on application, not just theory or memorisation.' },
    { icon: 'bi-hand-thumbs-up', title: 'Honest Guidance', desc: 'We set realistic expectations, give honest feedback, and never over-promise results.' },
    { icon: 'bi-arrows-angle-expand', title: 'Continuous Improvement', desc: 'We regularly update our curriculum, methods, and materials to match current exam patterns and best practices.' },
  ];

  methodology = [
    { step: '01', title: 'Diagnostic Assessment', desc: 'We assess your current level through a structured diagnostic test to understand your strengths and gaps.' },
    { step: '02', title: 'Personalised Study Plan', desc: 'Based on your assessment, we create a customised learning plan with clear milestones and targets.' },
    { step: '03', title: 'Structured Training', desc: 'Daily sessions covering skills systematically — grammar, vocabulary, speaking, writing, and exam strategies.' },
    { step: '04', title: 'Practice & Mock Tests', desc: 'Regular timed mock tests under real exam conditions with detailed scoring and feedback.' },
    { step: '05', title: 'Review & Improve', desc: 'Error analysis, one-on-one doubt clearing, and targeted practice on weak areas until you\'re confident.' },
  ];

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'About Us — Success Learning | Language & Exam Coaching in Trichy',
      description: 'Learn about Success Learning — Trichy\'s trusted coaching centre for IELTS, TOEFL, GRE, GMAT, Spoken English, and foreign languages. Student-first approach, expert trainers, Thillai Nagar.',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }
}
