import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "7601154888:AAFnFAgiy_7GuWLgDQW_p9B_QPSGX3o2tLg";
const TELEGRAM_CHAT_ID = "-1002428195452";

// Общие типы входных данных
interface KaraokeRequest {
  name: string;
  phone: string;
  date?: string;
  time?: string;
  guests?: number;
  comment?: string;
}

interface BowlingBooking {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  lanes: string; // количество дорожек
  duration: string; // часов
  players: string; // игроков
  comment?: string;
}

interface ClubBooking {
  name: string;
  phone: string;
  date: string;
  time: string;
}

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

interface ContactForm {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}

interface BanquetRequest {
  name: string;
  phone: string;
  date?: string;
  message?: string;
}

type SubmitBody =
  | { type: "karaoke"; data: KaraokeRequest }
  | { type: "bowling"; data: BowlingBooking }
  | { type: "club"; data: ClubBooking }
  | { type: "order"; data: OrderData }
  | { type: "contact"; data: ContactForm }
  | { type: "banquet"; data: BanquetRequest };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SubmitBody | undefined;
    if (!body || !("type" in body) || !("data" in body)) {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const message = formatMessage(body);

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = { chat_id: TELEGRAM_CHAT_ID, text: message, parse_mode: "HTML" };

    const telegramResponse = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const responseData = await telegramResponse.json();
    if (!telegramResponse.ok) {
      throw new Error(
        `Telegram API error: ${responseData?.description || "Unknown error"}`
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to submit" },
      { status: 500 }
    );
  }
}

function formatMessage(body: SubmitBody): string {
  switch (body.type) {
    case "karaoke":
      return formatKaraoke(body.data);
    case "bowling":
      return formatBowling(body.data);
    case "club":
      return formatClub(body.data);
    case "order":
      return formatOrder(body.data);
    case "contact":
      return formatContact(body.data);
    case "banquet":
      return formatBanquet(body.data);
  }
}

function formatKaraoke({ name, phone, date, time, guests, comment }: KaraokeRequest) {
  let msg = `🎤 <b>ЗАЯВКА: КАРАОКЕ</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${name}\n`;
  msg += `📞 <b>Телефон:</b> ${phone}\n`;
  if (guests) msg += `🧑‍🤝‍🧑 <b>Гостей:</b> ${guests}\n`;
  if (date) msg += `📅 <b>Дата:</b> ${date}\n`;
  if (time) msg += `⏰ <b>Время:</b> ${time}\n`;
  if (comment) msg += `💬 <b>Комментарий:</b> ${comment}\n`;
  msg += `\n<b>Условие:</b> запись от 10 человек`;
  return msg;
}

function formatBowling({ name, phone, email, date, time, lanes, duration, players, comment }: BowlingBooking) {
  let msg = `🎳 <b>ЗАЯВКА: БОУЛИНГ</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${name}\n`;
  msg += `📞 <b>Телефон:</b> ${phone}\n`;
  if (email) msg += `✉️ <b>Email:</b> ${email}\n`;
  msg += `📅 <b>Дата:</b> ${date}\n`;
  msg += `⏰ <b>Время:</b> ${time}\n`;
  msg += `🎯 <b>Дорожек:</b> ${lanes}\n`;
  msg += `⏱️ <b>Длительность:</b> ${duration} ч.\n`;
  msg += `🧑‍🤝‍🧑 <b>Игроков:</b> ${players}\n`;
  if (comment) msg += `💬 <b>Комментарий:</b> ${comment}\n`;
  return msg;
}

function formatClub({ name, phone, date, time }: ClubBooking) {
  let msg = `🎟️ <b>ЗАЯВКА: КЛУБ</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${name}\n`;
  msg += `📞 <b>Телефон:</b> ${phone}\n`;
  msg += `📅 <b>Дата:</b> ${date}\n`;
  msg += `⏰ <b>Время:</b> ${time}\n`;
  return msg;
}

function formatOrder(orderData: OrderData) {
  const { items, total, customerData, orderTime, orderType } = orderData;
  const orderTypeText = orderType === "pickup" ? "🏪 САМОВЫВОЗ" : "🚚 ДОСТАВКА";
  let message = `🍽️ <b>НОВЫЙ ЗАКАЗ - ${orderTypeText}</b>\n\n`;
  message += `📅 <b>Время заказа:</b> ${orderTime}\n`;
  message += `👤 <b>Клиент:</b> ${customerData.name}\n`;
  message += `📞 <b>Телефон:</b> ${customerData.phone}\n`;
  if (orderType === "delivery" && customerData.address) {
    message += `📍 <b>Адрес:</b> ${customerData.address}\n`;
  }
  if (customerData.comment) {
    message += `💬 <b>Комментарий:</b> ${customerData.comment}\n`;
  }
  message += `\n📋 <b>СОСТАВ ЗАКАЗА:</b>\n`;
  Object.values(items).forEach((item, index) => {
    const itemTotal = (item.price * item.quantity).toFixed(2);
    message += `${index + 1}. <b>${item.name}</b>\n`;
    if (item.weight) message += `   📏 ${item.weight}\n`;
    message += `   💰 ${item.price.toFixed(2)} BYN × ${item.quantity} = ${itemTotal} BYN\n\n`;
  });
  message += `💵 <b>ИТОГО: ${total.toFixed(2)} BYN</b>\n\n`;
  message += `🏪 <b>Ресторан:</b> NA DUBROVKE`;
  return message;
}

function formatContact({ name, phone, email, message }: ContactForm) {
  let msg = `✉️ <b>ОБРАТНАЯ СВЯЗЬ</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${name}\n`;
  if (phone) msg += `📞 <b>Телефон:</b> ${phone}\n`;
  if (email) msg += `✉️ <b>Email:</b> ${email}\n`;
  msg += `💬 <b>Сообщение:</b> ${message}`;
  return msg;
}

function formatBanquet({ name, phone, date, message }: BanquetRequest) {
  let msg = `🥂 <b>ЗАЯВКА: БАНКЕТНЫЙ ЗАЛ</b>\n\n`;
  msg += `👤 <b>Имя:</b> ${name}\n`;
  msg += `📞 <b>Телефон:</b> ${phone}\n`;
  if (date) msg += `📅 <b>Предполагаемая дата:</b> ${date}\n`;
  if (message) msg += `💬 <b>Пожелания:</b> ${message}`;
  return msg;
} 