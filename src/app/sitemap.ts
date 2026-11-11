import type { MetadataRoute } from 'next';
import { DRAFT_PAGES, SHOW_DRAFT_PAGES, siteConfig } from '@/lib/site';

const routes = [
  '',
  '/about',
  '/solution',
  '/partnership-model',
  '/revenue-share',
  '/destination-promotion',
  '/team',
  '/security',
  '/delivery',
  '/track-record',
  '/faqs',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.filter((r) => SHOW_DRAFT_PAGES || !DRAFT_PAGES.includes(r)).map((r) => ({
    url: `${siteConfig.url}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
