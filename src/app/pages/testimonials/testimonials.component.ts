import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  reviews = [
    { name: 'Priya Ramanathan', course: 'IELTS', score: 'Band 7.5', rating: 5, text: 'I joined Success Learning for IELTS preparation and it was the best decision. The trainers focused on my weak areas — especially writing. I improved from Band 6 to 7.5 in just 6 weeks. The mock tests were very close to the actual exam.', designation: 'MS Aspirant' },
    { name: 'Karthik Sundaram', course: 'GRE', score: '318/340', rating: 5, text: 'The GRE coaching at Success Learning is very structured. The vocabulary building approach and quant strategies helped me score 318. The small batch size meant I got personal attention whenever I was stuck.', designation: 'Software Engineer' },
    { name: 'Meera Lakshmi', course: 'Spoken English', score: '', rating: 5, text: 'I was very hesitant to speak English in professional settings. After 2 months at Success Learning, I can now confidently present in meetings and handle interviews. The daily speaking practice made all the difference.', designation: 'Working Professional' },
    { name: 'Aravind Kumar', course: 'German A2', score: 'Goethe A2 Certified', rating: 5, text: 'The German classes here are very well-structured. The teacher made grammar easy to understand and the conversational practice sessions were very helpful. I cleared my Goethe A2 exam in the first attempt.', designation: 'Engineering Student' },
    { name: 'Divya Shankar', course: 'TOEFL', score: '102/120', rating: 4, text: 'Success Learning\'s TOEFL programme helped me score 102. The computer-based practice was exactly like the real exam. The integrated task strategies were especially useful since those are the trickiest parts.', designation: 'USA University Applicant' },
    { name: 'Rajesh Venkatesh', course: 'GMAT', score: '680', rating: 5, text: 'I was targeting 650+ for my MBA applications and scored 680 after training here. The adaptive practice tests and error analysis approach really helped me identify where I was losing marks.', designation: 'MBA Aspirant' },
    { name: 'Nithya Krishnan', course: 'French B1', score: 'DELF B1 Certified', rating: 5, text: 'Learning French at Success Learning has been a wonderful experience. The cultural context they include in lessons makes the language come alive. I cleared DELF B1 and I am now continuing with B2.', designation: 'College Student' },
    { name: 'Suresh Balaji', course: 'IELTS', score: 'Band 7.0', rating: 4, text: 'Good coaching centre for IELTS. The speaking practice sessions with the trainer are very effective. They also help you with exam registration and give tips for test day. Friendly and professional environment.', designation: 'IT Professional' },
  ];

  overallRating = 4.8;
  totalReviews = 22;

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Student Testimonials — Success Learning Trichy',
      description: 'Read what our students say about Success Learning Trichy. IELTS, TOEFL, GRE, Spoken English, German success stories.',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }

  getStars(rating: number): number[] { return Array(rating).fill(0); }
  getEmptyStars(rating: number): number[] { return Array(5 - rating).fill(0); }
  getInitials(name: string): string { return name.split(' ').map(n => n[0]).join('').substring(0, 2); }
}
