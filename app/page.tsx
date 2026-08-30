'use client';

import { useRef, useState } from 'react'; // Добавлен useRef
import OrderForm, { OrderFormRef } from '@/components/OrderForm'; // Добавлен импорт типа OrderFormRef


const translations = {
  ru: {
    title: 'ремонт квартир',
    subtitle: 'Выполняем все виды отделочных, сантехнических и электромонтажных работ',
    btnCall: 'Позвонить',
    btnOrder: 'Написать сообщение',
    features: ['Смета за 24 часа', 'Фиксированная цена', 'Опыт от 10 лет'],
    formTitle: 'консультация,просчёт сметы',
    category: 'Ремонт квартир под ключ',
    brand: 'частный мастер',
    placeholders: {
      name: 'ваше имя и вопрос',
      phone: 'номер телефона',
    },
    buttonTexts: {
      idle: 'Отправить заявку',
      loading: 'Отправка...',
      success: '✓ Заявка отправлена!',
      error: 'Ошибка. Попробуйте еще',
    }
  },
  ua: {
    title: 'ремонт квартир',
    subtitle: 'Виконуємо всі види оздоблювальних, сантехнічних та електромонтажних робіт',
    btnCall: 'Зателефонувати',
    btnOrder: 'Надіслати повідомлення',
    features: ['Кошторис за 24 години', 'Фіксована ціна', 'Досвід від 10 років'],
    formTitle: 'отримати пораду,роз`яснення',
    category: 'Ремонт квартир под ключ (UA)',
    brand: 'приватний майстер',
    placeholders: {
      name: 'ваше ім`я та питання',
      phone: 'номер телефона',
    },
    buttonTexts: {
      idle: 'Надіслати заявку',
      loading: 'Відправлення...',
      success: '✓ Заявку відправлено!',
      error: 'Помилка. Спробуйте ще',
    }
  },
  en: {
    title: 'apartment renovation',
    subtitle: 'We perform all types of finishing, plumbing, and electrical work',
    btnCall: 'Call',
    btnOrder: 'Send a message',
    features: ['Estimate in 24h', 'Fixed price', '10+ years experience'],
    formTitle: 'calculate estimate',
    category: 'Turnkey Apartment Renovation (EN)',
    brand: 'private master',
    placeholders: {
      name: 'your name and question',
      phone: 'number phone',
    },
    buttonTexts: {
      idle: 'Send request',
      loading: 'Sending...',
      success: '✓ Request sent!',
      error: 'Error. Try again',
    }
  }
};

type LangType = 'ru' | 'ua' | 'en';

export default function HomeLanding() {
  const [lang, setLang] = useState<LangType>('ua');

  // Создаем ссылку для доступа к методам формы
  const formRef = useRef<OrderFormRef>(null);

  const t = translations[lang];

  const handleScrollToForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formSection = document.getElementById('order-section');

    if (!formSection) return;

    // Прокручиваем к форме
    formSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    // Первый focus выполняется непосредственно после нажатия пользователя
    formRef.current?.focusNameInput();

    // Повторяем focus после начала прокрутки
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        formRef.current?.focusNameInput();
      });
    });
  };

  return (
    <main style={{

      backgroundImage: `
      linear-gradient(
      rgba(10, 10, 15, 0.45),
      rgba(10, 10, 15, 0.45)
       ),
       url('/background.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: '50% 50%',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',

      color: '#fff',
      paddingBottom: '80px',
      overflowX: 'hidden',
      WebkitTapHighlightColor: 'transparent'
     }}>

      <header style={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 16px',
        background: 'rgba(10, 10, 15, 0.5)',
      }}>
        <div style={{ fontWeight: '700', fontSize: '16px', color: '#aaa' }}>
          {t.brand}
        </div>

        <div style={{ display: 'flex', gap: '4px', background: '#222', padding: '2px', borderRadius: '20px' }}>
          {(['ru', 'ua', 'en'] as LangType[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              style={{
                padding: '8px 14px',
                border: 'none',
                borderRadius: '16px',
                background: lang === l ? '#fff' : 'transparent',
                color: lang === l ? '#000' : '#aaa',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '16px'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <section style={{ width: '100%', margin: '0 auto', padding: '40px 0px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
          {t.title}
        </h1>

        <p style={{ fontSize: '16px', marginBottom: '40px' }}>
          {t.subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '40px' }}>
          <a href='tel:+380970786167' style={{
            padding: '16px', background: '#222', color: '#fff', border: '1px solid #444',
            borderRadius: '25px', textDecoration: 'none', width: '260px', fontWeight: '700'
          }}>
            📞 {t.btnCall}
          </a>

          <button onClick={handleScrollToForm} style={{
            padding: '16px', background: '#005426a6', color: '#fff', border: 'none',
            borderRadius: '25px', width: '260px', fontWeight: '700', cursor: 'pointer'
          }}>
            ✉️ {t.btnOrder}
          </button>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto 40px auto', textAlign: 'left' }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(10, 10, 15, 0.5)', padding: '16px', borderRadius: '12px',
              marginBottom: '10px', border: '1px solid #222'
            }}>{feature}</div>
          ))}
        </div>

        

        <div id='order-section' style={{
          background: 'rgba(10, 10, 15, 0.5)', padding: '30px 20px', borderRadius: '20px',
          border: '1px solid #222', maxWidth: '400px', margin: '0 auto'
        }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>{t.formTitle}</h3>

          {/* ВАЖНО: Передаем ref={formRef} */}
          <OrderForm
            ref={formRef}
            categoryName={t.category}
            placeholders={t.placeholders}
            buttonTexts={t.buttonTexts}
          />
        </div>

        <footer
          style={{
            position: 'sticky',
            bottom: 0,
            marginTop: '40px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',      // <--- Отступ между блоками, если они перенеслись
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0px',
            background: 'rgba(10, 10, 15, 0.5)',
            color: '#888',
            fontSize: '14px',
          }}
        >

          {/* Оригинальные иконки соцсетей */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://t.me/edtsyhanok"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
            >
              <img src="/icons/telegram.svg" alt="Telegram" width="20" height="20" />
            </a>

            <a
              href="https://wa.me/380970786167"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
            >
              <img src="/icons/whatsapp.svg" alt="WhatsApp" width="20" height="20" />
            </a>

            <a
              href="viber://chat?number=%2B380970786167"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
            >
              <img src="/icons/viber.svg" alt="Viber" width="20" height="20" />
            </a>
          </div>

          {/* Юридические ссылки */}
          <div style={{  gap: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/privacy" style={{ color: '#888', textDecoration: 'none' }}>
              Политика конфиденциальности
            </a>
            <a href="/terms">
              Условия
            </a>
            © {new Date().getFullYear()}
          </div>
        </footer>

      </section>
    </main>
  );
}