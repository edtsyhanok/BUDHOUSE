import type { Metadata } from 'next';
import './globals.css';
import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://192.168.1.101:3000'),

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
        url: '/background.jpg',
        width: 1200,
        height: 630,
        alt: 'Ремонт квартир',
      },
    ],
    locale: 'uk-UA',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='UA' className='h-full antialiased'>
      <body className='min-h-full flex flex-col' style={{ margin: 0, padding: 0, background: '#0a0a0f' }}>
        {children}
      </body>
    </html>
  );
}