import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  label: string;
  route?: string;
  children?: { label: string; route: string }[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeDropdown: string | null = null;

  navItems: NavItem[] = [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    {
      label: 'Courses',
      route: '/courses',
      children: [
        { label: 'IELTS', route: '/courses/ielts-coaching' },
        { label: 'TOEFL', route: '/courses/toefl-coaching' },
        { label: 'GRE', route: '/courses/gre-coaching' },
        { label: 'GMAT', route: '/courses/gmat-coaching' },
        { label: 'Spoken English', route: '/courses/spoken-english' },
        { label: 'German', route: '/courses/german-classes' },
        { label: 'French', route: '/courses/french-classes' },
        { label: 'Japanese', route: '/courses/japanese-classes' },
        { label: 'PTE / OET / Duolingo', route: '/courses/pte-oet-duolingo' },
      ],
    },
    { label: 'Study Abroad', route: '/study-abroad' },
    { label: 'Testimonials', route: '/testimonials' },
    { label: 'Gallery', route: '/gallery' },
    { label: 'Contact', route: '/contact' },
  ];

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        this.isMobileMenuOpen = false;
        this.activeDropdown = null;
      });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.activeDropdown = null;
  }

  toggleDropdown(label: string): void {
    this.activeDropdown = this.activeDropdown === label ? null : label;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.activeDropdown = null;
  }
}
