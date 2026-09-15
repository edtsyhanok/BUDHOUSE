'use client';

import { useRef, useState } from 'react'; // Добавлен useRef
import OrderForm, { OrderFormRef } from '@/components/OrderForm'; // Добавлен импорт типа OrderFormRef


const translations = {
  ru: {
    title: 'ремонт квартир киев',
    subtitle: 'Выполняем все виды отделочных, сантехнических и электромонтажных работ',
    btnCall: 'Позвонить',
    btnOrder: 'Написать сообщение',
    features: ['Смета за 24 часа', 'Фиксированная цена', 'Опыт от 10 лет'],
    formTitle: 'консультация, просчёт сметы',
    category: 'Ремонт квартир под ключ',
    brand: 'BUDHOUSE',
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
    title: 'ремонт квартир київ',
    subtitle: 'Виконуємо всі види оздоблювальних, сантехнічних та електромонтажних робіт',
    btnCall: 'Зателефонувати',
    btnOrder: 'Надіслати повідомлення',
    features: ['Кошторис за 24 години', 'Фіксована ціна', 'Досвід від 10 років'],
    formTitle: 'отримати пораду, роз`яснення',
    category: 'Ремонт квартир под ключ (UA)',
    brand: 'BUDHOUSE',
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
    title: 'apartment renovation kyiv',
    subtitle: 'We perform all types of finishing, plumbing, and electrical work',
    btnCall: 'Call',
    btnOrder: 'Send a message',
    features: ['Estimate in 24h', 'Fixed price', '10+ years experience'],
    formTitle: 'calculate estimate',
    category: 'Turnkey Apartment Renovation (EN)',
    brand: 'BUDHOUSE',
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
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 35px',
      }}>
        <div style={{ fontWeight: '500', fontSize: '22px', color: '#000' }}>
          {t.brand}
        </div>

        <div style={{ display: 'flex', gap: '2px', padding: '2px' }}>
          {(['ru', 'ua', 'en'] as LangType[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              style={{
                padding: '6px 6px',
                border: 'none',
                borderRadius: '16px',
                background: lang === l ? '#ffffff52' : 'transparent',
                color: lang === l ? '#000' : '#000',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <section style={{ width: '80%', margin: '0 auto', padding: '40px 0px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase' }}>
          {t.title}
        </h1>

        <p style={{ fontSize: '24px', marginBottom: '40px' }}>
          {t.subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '40px' }}>
          <a href='tel:+380970786167' style={{
            padding: '16px', background: 'rgba(10, 10, 15, 0.5)', color: '#fff',
            borderRadius: '25px', textDecoration: 'none', width: '260px', fontWeight: '500'
          }}>
            📞 {t.btnCall}
          </a>

          <button onClick={handleScrollToForm} style={{
            padding: '16px', background: '#005426a6', color: '#fff',
            borderRadius: '25px', width: '260px', fontWeight: '500', cursor: 'pointer'
          }}>
            ✉️ {t.btnOrder}
          </button>
        </div>

        <div style={{ maxWidth: '500px', margin: '0 auto 40px auto', textAlign: 'left' }}>
          {t.features.map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(10, 10, 15, 0.5)', padding: '16px', borderRadius: '12px',
              marginBottom: '10px'
            }}>{feature}</div>
          ))}
        </div>

        

        <div id='order-section' style={{
          background: 'rgba(10, 10, 15, 0.5)', padding: '10px 10px', borderRadius: '20px',
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>{t.formTitle}</h2>

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
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')} 
            >
              <img src="/telegram.png" alt="Telegram" width="40" height="40" />
            </a>

            <a
              href="https://wa.me/380970786167"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
            >
              <img src="/whatsapp.png" alt="WhatsApp" width="40" height="40" />
            </a>

            <a
              href="viber://chat?number=%2B380970786167"
              target="_blank"
              rel="noopener noreferrer"
              style={{ opacity: 0.5, transition: 'opacity 0.2s', display: 'flex' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.75')}
            >
              <img src="/viber.png" alt="Viber" width="40" height="40" />
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