import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

/** Canonical origin of the site — every canonical/og:url is built from this. */
export const SITE_URL = 'https://www.successlearning.in';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  /**
   * Points <link rel="canonical"> and og:url at the current route.
   * Without this every route keeps the homepage canonical from index.html,
   * which tells Google the inner pages are duplicates of the homepage.
   */
  setCanonicalFromPath(path: string): void {
    const cleanPath = path.split('#')[0].split('?')[0];
    this.setCanonical(`${SITE_URL}${cleanPath}`);
  }

  updateMeta(config: {
    title: string;
    description: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    canonical?: string;
  }): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }
    this.meta.updateTag({ property: 'og:title', content: config.ogTitle || config.title });
    this.meta.updateTag({ property: 'og:description', content: config.ogDescription || config.description });
    if (config.canonical) {
      this.setCanonical(config.canonical);
    }
  }

  private setCanonical(url: string): void {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }
}
