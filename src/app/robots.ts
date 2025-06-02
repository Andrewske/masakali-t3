import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/testing/', '/admin/'],
    },
    sitemap: 'https://masakaliretreat.com/sitemap.xml',
  };
}
