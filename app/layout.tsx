import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0f',
};

// Задаём фоллбэк, чтобы локально не выпадало предупреждение
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl), // Всегда передаём объект URL
  title: 'Ремонт квартир под ключ | Качественная отделка с гарантией',
  description: 'Профессиональный ремонт квартир под ключ. Фиксированная смета, официальный договор и гарантия качества',

  icons: {
    icon: [
      {
        url: '/icon.svg?v=2',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
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
    title: 'Ремонт квартир под ключ с гарантией',
    description: 'Профессиональный ремонт квартир под ключ. Фиксированная смета и договор',
    url: '/',
    siteName: 'Ремонт квартир',
    images: [
      {
        url: '/background.jpg', // Next.js сам подставит baseUrl спереди
        width: 1200,
        height: 630,
        alt: 'Ремонт квартир',
      },
    ],
    locale: 'uk_UA', // Корректный формат для OpenGraph (через подчёркивание)
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk' className='h-full antialiased'>
      <body className='min-h-full flex flex-col' style={{ margin: 0, padding: 0, background: '#0a0a0f' }}>
        {children}
      </body>
    </html>
  );
}