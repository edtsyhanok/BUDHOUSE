import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, phone, category } = await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

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