import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { ScrollRevealService } from '../../core/services/scroll-reveal.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, AfterViewInit {
  activeFilter = 'all';

  filters = [
    { key: 'all', label: 'All' },
    { key: 'classroom', label: 'Classroom' },
    { key: 'students', label: 'Students' },
    { key: 'events', label: 'Events' },
  ];

  allImages = [
    { src: 'assets/images/IMG-20231227-WA0001.jpg', alt: 'Classroom session', category: 'classroom' },
    { src: 'assets/images/IMG-20231227-WA0003.jpg', alt: 'Student interaction', category: 'students' },
    { src: 'assets/images/IMG-20231227-WA0004.jpg', alt: 'Group coaching session', category: 'classroom' },
    { src: 'assets/images/IMG-20231228-WA0003.jpg', alt: 'Training workshop', category: 'events' },
    { src: 'assets/images/IMG-20231228-WA0004.jpg', alt: 'Interactive learning session', category: 'students' },
    { src: 'assets/images/about-people.jpg', alt: 'Students at Success Learning', category: 'students' },
    { src: 'assets/images/about-show.jpg', alt: 'Seminar at Success Learning', category: 'events' },
    { src: 'assets/images/about-pic.jpg', alt: 'Success Learning centre', category: 'classroom' },
  ];

  get filteredImages() {
    return this.activeFilter === 'all' ? this.allImages : this.allImages.filter(i => i.category === this.activeFilter);
  }

  constructor(private seo: SeoService, private scrollReveal: ScrollRevealService, private el: ElementRef) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Gallery — Success Learning | Trichy',
      description: 'Explore photos from Success Learning Trichy — classrooms, student sessions, events, and workshops at our Thillai Nagar centre.',
    });
  }

  ngAfterViewInit(): void { this.scrollReveal.observeAll(this.el.nativeElement); }
}
