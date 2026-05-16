import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';

interface CourseItem {
  name: string; slug: string; image: string; color: string;
  category: string; description: string; duration: string; mode: string;
  highlights: string[];
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, AfterViewInit {
  searchQuery = '';
  activeFilter = 'all';

  filters = [
    { key: 'all', label: 'All Courses' },
    { key: 'exam', label: 'Exam Preparation' },
    { key: 'language', label: 'Languages' },
    { key: 'english', label: 'English Training' },
  ];

  allCourses: CourseItem[] = [
    { name: 'IELTS Coaching', slug: 'ielts-coaching', image: 'assets/images/courses/ielts.jpg', color: '#C62828', category: 'exam', description: 'Achieve your target band score with expert coaching, mock tests, and personalised writing/speaking feedback.', duration: '4–8 Weeks', mode: 'Online & Offline', highlights: ['Mock Tests', 'Speaking Practice', 'Writing Review'] },
    { name: 'TOEFL Coaching', slug: 'toefl-coaching', image: 'assets/images/courses/toefl.jpg', color: '#1565C0', category: 'exam', description: 'Comprehensive TOEFL iBT preparation with computer-based practice and integrated task training.', duration: '4–6 Weeks', mode: 'Online & Offline', highlights: ['Computer-Based Practice', 'Integrated Tasks', 'Score Improvement'] },
    { name: 'GRE Coaching', slug: 'gre-coaching', image: 'assets/images/courses/gre.jpg', color: '#2E7D32', category: 'exam', description: 'Master Verbal, Quantitative & Analytical Writing with strategic problem-solving and vocabulary building.', duration: '6–10 Weeks', mode: 'Online & Offline', highlights: ['Vocabulary Building', 'Adaptive Practice', 'Essay Review'] },
    { name: 'GMAT Coaching', slug: 'gmat-coaching', image: 'assets/images/courses/gmat.jpg', color: '#E65100', category: 'exam', description: 'Strategic GMAT preparation for MBA aspirants covering all sections with adaptive practice.', duration: '8–12 Weeks', mode: 'Online & Offline', highlights: ['Adaptive Practice', 'Score Analytics', 'MBA Guidance'] },
    { name: 'Spoken English', slug: 'spoken-english', image: 'assets/images/courses/spoken-english.jpg', color: '#6A1B9A', category: 'english', description: 'Build fluency, confidence and communication skills for conversations, interviews, and presentations.', duration: '4–12 Weeks', mode: 'Online & Offline', highlights: ['Daily Practice', 'Pronunciation Focus', 'Interview Prep'] },
    { name: 'German Classes', slug: 'german-classes', image: 'assets/images/courses/german.jpg', color: '#37474F', category: 'language', description: 'Learn German from A1 to B2 level with structured lessons and Goethe-Zertifikat preparation.', duration: '3–4 Months/level', mode: 'Online & Offline', highlights: ['CEFR Levels', 'Goethe Prep', 'Conversational Focus'] },
    { name: 'French Classes', slug: 'french-classes', image: 'assets/images/courses/french.jpg', color: '#0D47A1', category: 'language', description: 'Learn French from A1 to B2 level with DELF exam preparation and cultural immersion.', duration: '3–4 Months/level', mode: 'Online & Offline', highlights: ['CEFR Levels', 'DELF Prep', 'Cultural Immersion'] },
    { name: 'Japanese Classes', slug: 'japanese-classes', image: 'assets/images/courses/japanese.jpg', color: '#B71C1C', category: 'language', description: 'Learn Japanese from N5 to N3 level with script training and JLPT preparation.', duration: '3–5 Months/level', mode: 'Online & Offline', highlights: ['Script Training', 'JLPT Prep', 'Native Content'] },
    { name: 'PTE / OET / Duolingo', slug: 'pte-oet-duolingo', image: 'assets/images/courses/pte-oet.jpg', color: '#00695C', category: 'exam', description: 'Preparation for PTE Academic, OET, and Duolingo English Test with focused practice.', duration: '3–6 Weeks', mode: 'Online & Offline', highlights: ['Multiple Tests', 'Computer-Based', 'Fast Results'] },
  ];

  get filteredCourses(): CourseItem[] {
    let result = this.allCourses;
    if (this.activeFilter !== 'all') {
      result = result.filter(c => c.category === this.activeFilter);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
    }
    return result;
  }

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Courses — Success Learning | IELTS, TOEFL, GRE, Languages in Trichy',
      description: 'Explore all courses at Success Learning Trichy — IELTS, TOEFL, GRE, GMAT, Spoken English, German, French, Japanese, PTE, OET. Expert coaching, small batches.',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }
}
