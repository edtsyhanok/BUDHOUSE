import { NextResponse } from 'next/server';

// Экранируем спецсимволы Markdown, чтобы ввод пользователя не ломал форматирование
// и не вызывал ошибку 400 от Telegram API
function escapeMarkdown(text: string): string {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!])/g, '\\$1');
}

// Простая проверка телефона: цифры, пробелы, +, -, (), минимум 9 символов
function isValidPhone(phone: string): boolean {
  return /^[0-9+()\-\s]{9,20}$/.test(phone);
}

export async function POST(request: Request) {
  try {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Проверяем конфигурацию сервера до обработки запроса
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы в окружении');
      return NextResponse.json({ error: 'Сервис временно недоступен' }, { status: 500 });
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const category = typeof body.category === 'string' ? body.category.trim() : '';

    // Серверная валидация — не полагаемся только на проверки на клиенте
    if (!name || name.length > 100) {
      return NextResponse.json({ error: 'Некорректное имя' }, { status: 400 });
    }

    if (!phone || !isValidPhone(phone)) {
      return NextResponse.json({ error: 'Некорректный номер телефона' }, { status: 400 });
    }

    if (category && category.length > 100) {
      return NextResponse.json({ error: 'Некорректная категория' }, { status: 400 });
    }

    const text =
      `🔥 *Новая заявка с сайта\\!*\n\n` +
      `👤 *Имя:* ${escapeMarkdown(name)}\n` +
      `📞 *Телефон:* ${escapeMarkdown(phone)}\n` +
      `🏷️ *Услуга:* ${escapeMarkdown(category || 'Не указана')}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'MarkdownV2',
        text,
      }),
    });

    const responseData = await res.json();

    if (res.ok) {
      return NextResponse.json({ success: true });
    } else {
      // Детали ошибки — только в серверный лог, клиенту отдаём общий текст
      console.error('❌ ОШИБКА TELEGRAM API:', responseData);
      return NextResponse.json({ error: 'Не удалось отправить заявку' }, { status: 502 });
    }
  } catch (error) {
    console.error('❌ ОШИБКА СЕРВЕРА:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}