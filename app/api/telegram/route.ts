import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, category } = await request.json();

    // 1. ВСТАВЬ СВОИ ДАННЫЕ ВНУТРИ КАВЫЧЕК (БЕЗ ПРОБЕЛОВ)
    const BOT_TOKEN = '8760278521:AAFOVA30WHMMFhiVnh2O3vFTCf6oVTdXQB8';
    const CHAT_ID = '7658990988';

    const text = `🔥 *Новая заявка с сайта!*\n\n👤 *Имя:* ${name}\n📞 *Телефон:* ${phone}\n🏷️ *Услуга:* ${category}`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'Markdown',
        text: text,
      }),
    });

    const responseData = await res.json();

    if (res.ok) {
      console.log('✅ СООБЩЕНИЕ УСПЕШНО ОТПРАВЛЕНО В TELEGRAM!');
      return NextResponse.json({ success: true });
    } else {
      // Это выведет точную причину в терминал ПК!
      console.error('❌ ОШИБКА TELEGRAM API:', responseData);
      return NextResponse.json({ error: responseData.description }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ ОШИБКА СЕРВЕРА:', error);
    return NextResponse.json({ error: 'Внутренняя ошибка' }, { status: 500 });
  }
}