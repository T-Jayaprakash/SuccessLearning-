import { Component } from '@angular/core';

@Component({
  selector: 'app-site-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class SiteFooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', route: '/' },
    { label: 'About Us', route: '/about' },
    { label: 'Courses', route: '/courses' },
    { label: 'Testimonials', route: '/testimonials' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Contact', route: '/contact' },
    { label: 'Resources', route: '/resources' },
  ];

  courses = [
    { label: 'IELTS Coaching', route: '/courses/ielts-coaching' },
    { label: 'TOEFL Coaching', route: '/courses/toefl-coaching' },
    { label: 'GRE Coaching', route: '/courses/gre-coaching' },
    { label: 'GMAT Coaching', route: '/courses/gmat-coaching' },
    { label: 'Spoken English', route: '/courses/spoken-english' },
    { label: 'German Classes', route: '/courses/german-classes' },
    { label: 'French Classes', route: '/courses/french-classes' },
    { label: 'Japanese Classes', route: '/courses/japanese-classes' },
  ];
}
