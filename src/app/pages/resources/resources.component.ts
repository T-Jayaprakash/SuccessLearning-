import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit, AfterViewInit {
  resources = [
    { title: 'IELTS Writing Task 2: How to Structure a Band 7+ Essay', category: 'IELTS', icon: 'bi-pencil-square', description: 'Learn the proven essay structure that helps you organise your ideas clearly and score higher in IELTS Writing Task 2. Includes introduction, body paragraph, and conclusion templates.', readTime: '5 min read' },
    { title: '50 Essential GRE Vocabulary Words You Must Know', category: 'GRE', icon: 'bi-book', description: 'A curated list of high-frequency GRE words with meanings, usage examples, and memory tips. Start building your vocabulary today.', readTime: '8 min read' },
    { title: '10 Tips to Improve Your Spoken English Fluency', category: 'Spoken English', icon: 'bi-chat-dots', description: 'Practical, actionable tips to improve your English speaking confidence — from daily habits to practice techniques that actually work.', readTime: '4 min read' },
    { title: 'IELTS Listening: Common Trap Answers and How to Avoid Them', category: 'IELTS', icon: 'bi-headphones', description: 'Learn to identify distractors in IELTS Listening and develop strategies to avoid common mistakes that cost you marks.', readTime: '6 min read' },
    { title: 'German A1 Basics: Your First 100 Words', category: 'German', icon: 'bi-translate', description: 'Start your German journey with the 100 most useful everyday words, categorised by topic — greetings, food, travel, numbers, and more.', readTime: '7 min read' },
    { title: 'GMAT Data Sufficiency: A Complete Strategy Guide', category: 'GMAT', icon: 'bi-bar-chart', description: 'Master the unique GMAT Data Sufficiency question type with our step-by-step approach, common patterns, and practice problems.', readTime: '10 min read' },
    { title: 'How to Prepare for TOEFL Speaking Section', category: 'TOEFL', icon: 'bi-mic', description: 'Detailed strategies for both independent and integrated TOEFL speaking tasks, with templates and timing tips.', readTime: '6 min read' },
    { title: 'French for Beginners: Essential Phrases for Daily Life', category: 'French', icon: 'bi-chat-quote', description: 'Learn the most useful French phrases for greetings, shopping, dining, and travel. Perfect for absolute beginners.', readTime: '5 min read' },
  ];

  activeFilter = 'all';
  categories = ['all', 'IELTS', 'TOEFL', 'GRE', 'GMAT', 'Spoken English', 'German', 'French'];

  get filteredResources() {
    return this.activeFilter === 'all' ? this.resources : this.resources.filter(r => r.category === this.activeFilter);
  }

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Study Materials & Resources — Success Learning Trichy',
      description: 'Free study tips, exam strategies, and learning resources from Success Learning Trichy. IELTS writing tips, GRE vocabulary, spoken English guides.',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }
}
