import type { MetadataRoute } from 'next';

const URL = 'https://masakaliretreat.com/';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas/surya',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas/chandra',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas/jala',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas/akasha',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'villas/lakshmi',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'retreats',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'retreats/tribute',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'experience',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
    {
      url: URL + 'yoga',
      lastModified: new Date(),
      changeFrequency: 'monthly',
    },
  ];
}
