import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "7601154888:AAFnFAgiy_7GuWLgDQW_p9B_QPSGX3o2tLg";
const TELEGRAM_CHAT_ID = "-1002428195452";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  weight?: string;
}

 interface OrderData {
  items: Record<string, OrderItem>;
  total: number;
  customerData: {
    name: string;
    phone: string;
    address?: string;
    comment: string;
  };
  orderTime: string;
  orderType: "pickup" | "delivery";
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Получен запрос на отправку заказа');
    
    const orderData: OrderData = await request.json();
    console.log('📦 Данные заказа:', JSON.stringify(orderData, null, 2));

    // Формируем сообщение для Telegram
    const message = formatOrderMessage(orderData);
    console.log("💬 Сформированное сообщение:", message);

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    console.log("🔗 URL Telegram API:", telegramUrl);

    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    };
    console.log('📤 Payload для Telegram:', JSON.stringify(payload, null, 2));

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('📡 Статус ответа Telegram:', telegramResponse.status);
    
    const responseData = await telegramResponse.json();
    console.log('📨 Ответ от Telegram:', JSON.stringify(responseData, null, 2));

    if (!telegramResponse.ok) {
      console.error('❌ Ошибка Telegram API:', responseData);
      throw new Error(`Telegram API error: ${responseData.description || 'Unknown error'}`);
    }

    console.log('✅ Сообщение успешно отправлено в Telegram');
    return NextResponse.json({ 
      success: true, 
      message: 'Order sent successfully',
      telegramResponse: responseData 
    });

  } catch (error) {
    console.error('💥 Ошибка при отправке заказа:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send order',
        details: error
      },
      { status: 500 }
    );
  }
}

function formatOrderMessage(orderData: OrderData): string {
  const { items, total, customerData, orderTime, orderType } = orderData;
  
  const orderTypeText = orderType === 'pickup' ? '🏪 САМОВЫВОЗ' : '🚚 ДОСТАВКА';
  
  let message = `🍽️ <b>НОВЫЙ ЗАКАЗ - ${orderTypeText}</b>\n\n`;
  
  message += `📅 <b>Время заказа:</b> ${orderTime}\n`;
  message += `👤 <b>Клиент:</b> ${customerData.name}\n`;
  message += `📞 <b>Телефон:</b> ${customerData.phone}\n`;
  
  if (orderType === 'delivery' && customerData.address) {
    message += `📍 <b>Адрес:</b> ${customerData.address}\n`;
  }
  
  if (customerData.comment) {
    message += `💬 <b>Комментарий:</b> ${customerData.comment}\n`;
  }
  
  message += `\n📋 <b>СОСТАВ ЗАКАЗА:</b>\n`;
  
  Object.values(items).forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    message += `${index + 1}. <b>${item.name}</b>\n`;
    if (item.weight) {
      message += `   📏 ${item.weight}\n`;
    }
    message += `   💰 ${item.price.toFixed(2)} BYN × ${item.quantity} = ${itemTotal} BYN\n\n`;
  });
  
  message += `💵 <b>ИТОГО: ${total.toFixed(2)} BYN</b>\n\n`;
  message += `🏪 <b>Ресторан:</b> NA DUBROVKE`;

  return message;
}
