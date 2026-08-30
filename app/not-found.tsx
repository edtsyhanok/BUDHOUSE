import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '24px',
      background: '#0a0a0f',
      color: '#fff'
    }}>
      <h1 style={{
        fontSize: '6rem',
        fontWeight: '800',
        margin: '0',
        color: '#33333e' // Безопасный плоский цвет вместо сложного градиента
      }}>
        404
      </h1>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#f5f5f7' }}>
        Страница переехала
      </h2>
      <p style={{ color: '#86868b', marginBottom: '32px', maxWidth: '360px', lineHeight: '1.5', fontSize: '15px' }}>
        Мы обновили структуру сайта, чтобы сделать её быстрее. Все услуги теперь находятся на главной странице.
      </p>
      <Link href="/" style={{
        padding: '14px 28px',
        background: '#0071e3',
        color: '#fff',
        borderRadius: '22px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '15px',
        boxShadow: '0 4px 15px rgba(0, 113, 227, 0.3)',
        WebkitAppearance: 'none',
        touchAction: 'manipulation'
      }}>
        На главную
      </Link>
    </div>
  );
}