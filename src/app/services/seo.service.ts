import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
}

/**
 * Central place to update the document <title> and meta tags for SEO.
 * Called from AppComponent whenever the category, search term, or product changes.
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  update(data: SeoData): void {
    this.title.setTitle(data.title);

    this.setTag('description', data.description);
    this.setTag('keywords', data.keywords ?? '');

    // Open Graph / Facebook
    this.setTag('og:title', data.title, 'property');
    this.setTag('og:description', data.description, 'property');
    this.setTag('og:type', 'website', 'property');
    if (data.image) {
      this.setTag('og:image', data.image, 'property');
    }
    if (data.url) {
      this.setTag('og:url', data.url, 'property');
    }

    // Twitter Card
    this.setTag('twitter:card', 'summary_large_image', 'name');
    this.setTag('twitter:title', data.title, 'name');
    this.setTag('twitter:description', data.description, 'name');
    if (data.image) {
      this.setTag('twitter:image', data.image, 'name');
    }
  }

  private setTag(name: string, content: string, attr: 'name' | 'property' = 'name'): void {
    if (!content) {
      return;
    }
    const selector = `${attr}="${name}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attr]: name, content });
    } else {
      this.meta.addTag({ [attr]: name, content });
    }
  }
}
