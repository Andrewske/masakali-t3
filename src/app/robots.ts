import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/testing/', '/dashboard/'],
    },
    sitemap: 'https://masakaliretreat.com/sitemap.xml',
  };
}
