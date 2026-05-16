import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Core Pages
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'courses', loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule) },
  { path: 'courses/:slug', loadChildren: () => import('./pages/course-detail/course-detail.module').then(m => m.CourseDetailModule) },
  { path: 'testimonials', loadChildren: () => import('./pages/testimonials/testimonials.module').then(m => m.TestimonialsModule) },
  { path: 'gallery', loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule) },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'resources', loadChildren: () => import('./pages/resources/resources.module').then(m => m.ResourcesModule) },
  { path: 'study-abroad', loadChildren: () => import('./pages/destinations/destinations.module').then(m => m.DestinationsModule) },

  // SEO Landing Pages
  { path: 'ielts-coaching-in-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'ielts-coaching-in-trichy' } },
  { path: 'best-spoken-english-centre-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'best-spoken-english-centre-trichy' } },
  { path: 'german-language-classes-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'german-language-classes-trichy' } },
  { path: 'french-coaching-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'french-coaching-trichy' } },
  { path: 'gre-coaching-centre-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'gre-coaching-centre-trichy' } },
  { path: 'gmat-training-trichy', loadChildren: () => import('./pages/seo-landing/seo-landing.module').then(m => m.SeoLandingModule), data: { slug: 'gmat-training-trichy' } },

  // Fallback
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
