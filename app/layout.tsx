import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

// Задаём фоллбэк, чтобы локально не выпадало предупреждение
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://budhouse.netlify.app';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Всегда передаём объект URL
  title: 'Ремонт квартир в Киеве',
  description: 'Фиксированная смета, официальный договор и гарантия качества',

  // Явно разрешаем индексацию — полезно иметь прописанным,
  // а не полагаться на дефолт
  robots: {
    index: true,
    follow: true,
  },

  // Канонический URL страницы — важно, раз уже задан metadataBase
  alternates: {
    canonical: '/',
  },

  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },

  openGraph: {
    title: 'Ремонт квартир в Киеве',
    description: 'Фиксированная смета, официальный договор и гарантия качества',
    url: '/',
    siteName: 'BUDHOUSE',
    images: [
      {
        url: '/background.jpg', // Next.js сам подставит baseUrl спереди
        width: 1200,
        height: 630,
        alt: 'Ремонт квартир',
      },
    ],
    locale: 'ru_UA', // Корректный формат для OpenGraph (через подчёркивание)
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ремонт квартир в Киеве',
    description: 'Фиксированная смета, официальный договор и гарантия качества',
    images: ['/background.jpg'], // Next.js сам подставит baseUrl спереди
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BUDHOUSE',
    url: baseUrl,
  };

  return (
    <html lang='ru' className='h-full'>
      <body className='min-h-full flex flex-col'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}