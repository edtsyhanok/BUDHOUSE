import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://budhouse.netlify.app';

  return [
    {
      url: baseUrl,
      lastModified: new Date(), // Динамически подставит текущую дату и время
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}