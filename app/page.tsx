'use client';

import { useRef, useState } from 'react'; // Добавлен useRef
import OrderForm, { OrderFormRef } from '@/components/OrderForm'; // Добавлен импорт типа OrderFormRef


const translations = {
  ru: {
    title: 'Ремонт квартир в Киеве',
    subtitle: 'Выполняем все виды отделочных, сантехнических и электромонтажных работ. Поможем решить, спланировать, выяснить, поделимся опытом, подскажем, как сэкономить и не потерять качество',
    btnCall: 'Позвонить',
    btnOrder: 'Написать сообщение',
    // features: ['Смета за 24 часа', 'Фиксированная цена', 'Опыт от 10 лет'],
    formTitle: 'консультация, просчёт сметы, цены, сроки, материалы, доставка... по любым вопросам',
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
    title: 'Ремонт квартир у Києві',
    subtitle: 'Виконуємо всі види оздоблювальних, сантехнічних та електромонтажних робіт. Допоможемо вирішити, спланувати, з’ясувати, поділимося досвідом, підкажемо, як заощадити та не втратити якість',
    btnCall: 'Зателефонувати',
    btnOrder: 'Надіслати повідомлення',
    // features: ['Кошторис за 24 години', 'Фіксована ціна', 'Досвід від 10 років'],
    formTitle: 'отримати пораду, роз’яснення, розрахунок кошторису, ціни, терміни, матеріали, доставка... з будь-яких питань',
    category: 'Ремонт квартир під ключ',
    brand: 'BUDHOUSE',
    placeholders: {
      name: 'ваше ім’я та питання',
      phone: 'номер телефону',
    },
    buttonTexts: {
      idle: 'Надіслати заявку',
      loading: 'Відправлення...',
      success: '✓ Заявку відправлено!',
      error: 'Помилка. Спробуйте ще',
    }
  },
  en: {
    title: 'apartment renovation in Kyiv',
    subtitle: 'We perform all types of finishing, plumbing, and electrical work. Help you decide, plan, figure out, share our experience, and advise you on how to save money without losing quality.',
    btnCall: 'Call',
    btnOrder: 'Send a message',
    // features: ['Estimate in 24h', 'Fixed price', '10+ years experience'],
    formTitle: 'calculate estimate, prices, deadlines, materials, delivery... for any questions',
    category: 'Turnkey Apartment Renovation',
    brand: 'BUDHOUSE',
    placeholders: {
      name: 'your name and question',
      phone: 'phone number',
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
  const [lang, setLang] = useState<LangType>('ru');

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
      isolation: 'isolate',
      color: '#fff',
      paddingBottom: '160px',
      overflowX: 'clip'
     }}>

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100lvh',
        zIndex: -1,
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        transform: 'translateZ(0)',
      }} />

      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 35px',
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

        <p style={{ fontSize: '24px', marginBottom: '20px' }}>
          {t.subtitle}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '40px' }}>
          <a href='tel:+380970786167' style={{
            padding: '16px', background: 'rgba(10, 10, 15, 0.3)', color: '#fff',
            borderRadius: '25px', textDecoration: 'none', width: '260px', fontWeight: '500'
          }}>
            📞 {t.btnCall}
          </a>

          <button onClick={handleScrollToForm} style={{
            padding: '16px', background: '#0054268f', color: '#fff',
            borderRadius: '25px', width: '260px', fontWeight: '500'
          }}>
            ✉️ {t.btnOrder}
          </button>
        </div>

        {/* <div style={{ maxWidth: '500px', margin: '0 auto 40px auto', textAlign: 'left' }}>
          {t.features.map((feature, i) => (
            <div key={i} className="mb-2.5 rounded-xl bg-[rgba(10,10,15,0.3)] p-4">
              {feature}
            </div>
          ))}
        </div> */}

        

        <div id='order-section' style={{
          background: 'rgba(10, 10, 15, 0.3)', padding: '10px 10px', borderRadius: '20px',
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
            marginTop: '40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',      // <--- Отступ между блоками, если они перенеслись
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 0px',
            color: '#000000',
            fontSize: '16px',
          }}
        >

          {/* Оригинальные иконки соцсетей */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a
              href="https://t.me/edtsyhanok"
              target="_blank"
              rel="noopener noreferrer"
              className="flex opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              <img src="/telegram.png" alt="Telegram" width="40" height="40" loading="lazy" />
            </a>

            <a
              href="https://wa.me/380970786167"
              target="_blank"
              rel="noopener noreferrer"
              className="flex opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              <img src="/whatsapp.png" alt="WhatsApp" width="40" height="40" loading="lazy" />
            </a>

            <a
              href="viber://chat?number=%2B380970786167"
              target="_blank"
              rel="noopener noreferrer"
              className="flex opacity-65 transition-opacity duration-200 hover:opacity-100"
            >
              <img src="/viber.png" alt="Viber" width="40" height="40" loading="lazy" />
            </a>
          </div>

          {/* Юридические ссылки */}
          <div style={{  gap: '16px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            © {new Date().getFullYear()}
          </div>
        </footer>

      </section>
    </main>
  );
}