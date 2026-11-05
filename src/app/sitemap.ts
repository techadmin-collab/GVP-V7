import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

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
  return routes.map((r) => ({
    url: `${siteConfig.url}${r}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
