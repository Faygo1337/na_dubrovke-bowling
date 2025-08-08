"use client";

import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Phone,
  MapPin,
  Clock,
  User,
  ArrowLeft,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  weight?: string;
}

interface CartItem extends MenuItem {
  quantity: number;
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

interface RestaurantPickupOrderProps {
  onBack: () => void;
}

const RestaurantPickupOrder: React.FC<RestaurantPickupOrderProps> = ({
  onBack,
}) => {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [activeCategory, setActiveCategory] = useState("холодные_закуски");
  const [showCart, setShowCart] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderData, setOrderData] = useState<OrderData["customerData"]>({
    name: "",
    phone: "",
    comment: "",
  });

  const menuData: Record<string, { title: string; items: MenuItem[] }> = {
    холодные_закуски: {
      title: "Холодные закуски",
      items: [
        {
          id: "мясная_тарелка",
          name: "Мясная тарелка",
          description: "прощутто, говядина с/к, ветчина, свинина с/в, салями",
          price: 23.0,
          weight: "280 г",
        },
        {
          id: "рыбная_тарелка",
          name: "Рыбная тарелка",
          description: "маринованная форель, медово-горчичный соус",
          price: 23.0,
          weight: "150 г",
        },
        {
          id: "овощная_тарелка",
          name: "Овощная тарелка",
          description: "томаты св., перец св., огурец св., зелень",
          price: 16.0,
          weight: "300 г",
        },
        {
          id: "сырная_тарелка",
          name: "Сырная тарелка",
          description:
            "сыр твердый, сыр выдержанный, сыр камамбер, виноград, орехи, мёд",
          price: 23.0,
          weight: "260 г",
        },
        {
          id: "карпаччо_из_форели",
          name: "Карпаччо из форели",
          description: "филе форели, сыр, лимон, салат, заправка",
          price: 28.0,
          weight: "270 г",
        },
        {
          id: "карпаччо_из_говядины",
          name: "Карпаччо из говядины",
          description: "говядина, сыр, лимон, салат, заправка",
          price: 25.0,
          weight: "250 г",
        },
        {
          id: "тартар_из_говядины",
          name: "Тартар из говядины",
          description:
            "говядина, лук красный, каперсы, французская горчица, яйцо перепелиное, соус табаско, пита, заправка",
          price: 22.0,
          weight: "200 г",
        },
        {
          id: "сельдь_с_картофелем",
          name: "Сельдь с картофелем и свежим огурцом",
          price: 13.0,
          weight: "230 г",
        },
        {
          id: "белорусская_закуска",
          name: "Белорусская закуска",
          description:
            "грудинка сол., огурец марин., черри марин., лук кр., хрен",
          price: 13.0,
          weight: "200 г",
        },
        {
          id: "брускетта_с_томатами_и_моцареллой",
          name: "Брускетта с томатами и моцареллой",
          description: "багет, вяленые томаты, сыр моцарелла, крем чиз, черри",
          price: 11.0,
          weight: "120 г",
        },
        {
          id: "брускетта_с_форелью",
          name: "Брускетта с форелью",
          description: "багет, сыр, филе форели, огурец, лимон",
          price: 11.0,
          weight: "110 г",
        },
        {
          id: "брускетта_с_пармой",
          name: "Брускетта с пармой",
          description:
            "багет, лук карамелизированный, парма, сыр творожный, тимьян",
          price: 11.0,
          weight: "80 г",
        },
        {
          id: "брускетта_с_креветкой",
          name: "Брускетта с креветкой",
          description: "багет, креветка, огурец, кинза, петрушка, лимон",
          price: 11.0,
          weight: "120 г",
        },
        {
          id: "маслины",
          name: "Маслины",
          price: 5.0,
          weight: "50 г",
        },
        {
          id: "оливки",
          name: "Оливки",
          price: 5.0,
          weight: "50 г",
        },
        {
          id: "огурчики_маринованные",
          name: "Огурчики марин.",
          price: 6.0,
          weight: "100 г",
        },
      ],
    },
    салаты: {
      title: "Салаты",
      items: [
        {
          id: "с_кальмаром",
          name: "Салат с кальмаром",
          description:
            "листья салата, св. огурец, шампиньоны, кальмары, яйца перепелиные, майонез",
          price: 20.0,
          weight: "220 г",
        },
        {
          id: "с_языком",
          name: "Салат с языком",
          description:
            "цыпленок, язык говяжий, шампиньоны, зелень, перец, медово-горчичная заправка",
          price: 20.0,
          weight: "250 г",
        },
        {
          id: "цезарь_с_курицей",
          name: "Цезарь с курицей",
          description:
            "филе куриное, черри, яйцо перепалиное, листья салата, заправка, крутонсы с сыром",
          price: 18.0,
          weight: "240 г",
        },
        {
          id: "цезарь_с_креветкой",
          name: "Цезарь с креветкой",
          description:
            "креветка, черри, сыр, перепелиное яйцо, листья салата, заправка, крутонсы с сыром",
          price: 23.0,
          weight: "260 г",
        },
        {
          id: "с_лососем_гравлакс",
          name: "Салат с лососем гравлакс",
          description:
            "лосось, салат, томат вяленый, апельсин, сырная клецка, маслины, медово-горчичная заправка",
          price: 25.0,
          weight: "215 г",
        },
      ],
    },
    суши_роллы: {
      title: "Суши/Роллы",
      items: [
        {
          id: "сяке_маки_с_сыром_филадельфия",
          name: "Сяке маки с сыром филадельфия",
          description: "нори, рис, лосось, сыр филадельфия",
          price: 16.0,
          weight: "200 г",
        },
        {
          id: "сяке_маки",
          name: "Сяке маки",
          description: "нори, рис, лосось",
          price: 15.0,
          weight: "170 г",
        },
        {
          id: "эби_маки_с_сыром_филадельфия",
          name: "Эби маки с сыром филадельфия",
          description: "нори, рис, креветка, сыр филадельфия",
          price: 17.0,
          weight: "200 г",
        },
        {
          id: "эби_маки",
          name: "Эби маки",
          description: "нори, рис, креветка",
          price: 16.0,
          weight: "170 г",
        },
        {
          id: "калифорния_с_лососем",
          name: "Калифорния с лососем",
          description: "нори, рис, кремчиз, огурец, тобика",
          price: 26.0,
          weight: "265 г",
        },
        {
          id: "филадельфия_классическая",
          name: "Филадельфия классическая",
          description: "нори, рис, кремчиз, лосось",
          price: 31.0,
          weight: "290 г",
        },
        {
          id: "филадельфия_с_кунжутом_авакадо",
          name: "Филадельфия с кунжутом авакадо",
          description: "нори, рис, лосось, авокадо, огурец, кунжут",
          price: 23.0,
          weight: "270 г",
        },
        {
          id: "ролл_темпура_с_креветкой_и_лососем",
          name: "Ролл темпура с креветкой и лососем",
          description: "нори, рис, лосось, кремчиз, авокадо, кунжут",
          price: 20.0,
          weight: "290 г",
        },
        {
          id: "запеченные_роллы_с_кальмаром_и_яблоком",
          name: "Запеченные роллы с кальмаром и яблоком",
          description: "нори, рис, сыр, кальмар, яблоко, кунжут",
          price: 20.0,
          weight: "330 г",
        },
      ],
    },
    пиццы: {
      title: "Пиццы",
      items: [
        {
          id: "мясная",
          name: "Мясная",
          description: "соус, филе куриное, ветчина, перец св., сыр моцарелла",
          price: 21.0,
          weight: "500 г",
        },
        {
          id: "грибная",
          name: "Грибная",
          description: "майонез, шампиньоны, филе куриное, лук репчатый, сыр",
          price: 21.0,
          weight: "500 г",
        },
        {
          id: "аппетитная",
          name: "Аппетитная",
          description:
            "соус, филе куриное, грудинка, ветчина, лук репчатый, ананас св., сыр",
          price: 21.0,
          weight: "500 г",
        },
        {
          id: "коломбина",
          name: "Коломбина",
          description:
            "томаты, лук репчатый, перец св., филе куриное, салями, сыр, соус, майонез",
          price: 22.0,
          weight: "500 г",
        },
        {
          id: "маргарита",
          name: "Маргарита",
          description: "сыр моцарелла, соус",
          price: 15.0,
          weight: "265 г",
        },
        {
          id: "по_итальянски",
          name: "По-итальянски",
          description:
            "салями, шампиньоны, томаты, огурцы марин, лук репчатый, маслины, сыр, соус",
          price: 22.0,
          weight: "500 г",
        },
        {
          id: "пепперони",
          name: "Пепперони",
          description: "салями, сыр, соус, перец чили",
          price: 20.0,
          weight: "400 г",
        },
        {
          id: "карбонара",
          name: "Карбонара",
          description: "соус, ветчина, сыр тв., яйцо, сыр выдержанный",
          price: 21.0,
          weight: "450 г",
        },
      ],
    },
    горячие_блюда: {
      title: "Горячие блюда",
      items: [
        {
          id: "драники_в_горшочке",
          name: "Драники в горшочке",
          description:
            "картофель, курица, лук репч., шампиньоны, сметана, кетчуп, зелень",
          price: 17.0,
          weight: "220 г",
        },
        {
          id: "драники_со_сметаной",
          name: "Драники со сметаной",
          price: 14.0,
          weight: "450 г",
        },
        {
          id: "дранбургер",
          name: "Дранбургер",
          description:
            "драники, яйцо, салат, томат, куриная котлета, лук, огурец соленый, соус",
          price: 19.0,
          weight: "420 г",
        },
        {
          id: "буженина_с_клюквенным_соусом",
          name: "Буженина с клюквенным соусом",
          description: "свинина(шейная часть), клюквенный соус",
          price: 21.0,
          weight: "200 г",
        },
        {
          id: "стейк_из_свиной_корейки",
          name: "Стейк из свиной корейки",
          description: "корейка свиная, лук марин.",
          price: 23.0,
          weight: "235 г",
        },
        {
          id: "стейк_из_форели",
          name: "Стейк из форели",
          description:
            "форель, лимон, вино бел. сух., перец черный молотый, маслины, зелень",
          price: 27.0,
          weight: "190 г",
        },
      ],
    },
    паста: {
      title: "Паста",
      items: [
        {
          id: "спагетти_карбонара",
          name: 'Спагетти "Карбонара"',
          description: "спагетти, грудинка в/к, яйцо, сыр, сливки",
          price: 18.0,
          weight: "330 г",
        },
        {
          id: "спагетти_с_курицей_и_грибами",
          name: "Спагетти с курицей и грибами",
          description:
            "спагетти, шампиньоны, филе куриное, сливки, сыр, красный лук",
          price: 18.0,
          weight: "330 г",
        },
        {
          id: "спагетти_с_лососем",
          name: "Спагетти с лососем",
          description: "спагетти, лук, лосось, пармезан, вино белое, сливки",
          price: 21.0,
          weight: "330 г",
        },
      ],
    },
    десерты: {
      title: "Десерты",
      items: [
        {
          id: "тирамису",
          name: "Тирамису",
          description: "сыр маскарпоне, кофе, сахар, яйца, печенье савоярди",
          price: 12.0,
          weight: "150 г",
        },
        {
          id: "чизкейк",
          name: "Чизкейк",
          description: "творожный сыр, сахар, яйца, печенье, сметана",
          price: 10.0,
          weight: "180 г",
        },
        {
          id: "мороженое",
          name: "Мороженое",
          description: "в ассортименте",
          price: 8.0,
          weight: "100 г",
        },
      ],
    },
    горячие_напитки: {
      title: "Горячие напитки",
      items: [
        {
          id: "эспрессо",
          name: "Эспрессо",
          price: 3.5,
          weight: "40 мл",
        },
        {
          id: "американо",
          name: "Американо",
          price: 3.5,
          weight: "120 мл",
        },
        {
          id: "каппучино",
          name: "Каппучино",
          price: 4.0,
          weight: "120 мл",
        },
        {
          id: "латте_макиато",
          name: "Латте макиато",
          price: 4.0,
          weight: "200 мл",
        },
        {
          id: "чай_классический",
          name: "Чай классический",
          description: "в ассортименте",
          price: 10.0,
          weight: "900 мл",
        },
      ],
    },
    коктейли: {
      title: "Коктейли",
      items: [
        {
          id: "мохито",
          name: "Мохито",
          description: "ром, сахарный сироп, сок лайма, мята, бонаква",
          price: 12.0,
          weight: "50/25/25/100 мл",
        },
        {
          id: "том_коллинз",
          name: "Том Коллинз",
          description: "джин, сахарный сироп, лимонный сок, бонаква",
          price: 12.0,
          weight: "50/25/25/100 мл",
        },
        {
          id: "лонг_айленд",
          name: "Лонг Айленд",
          description: "текила, ром, финляндия, джин, лайм, куантро, кола",
          price: 22.0,
          weight: "15/15/15/15/10/5/100 мл",
        },
        {
          id: "манхэтан",
          name: "Манхэтан",
          description: "джин бим, мартини россо, биттер",
          price: 20.0,
          weight: "50/30/20 мл",
        },
        {
          id: "драй_мартини",
          name: "Драй Мартини",
          description: "джин, мартини драй, оливка",
          price: 13.0,
          weight: "50/25/3 мл",
        },
        {
          id: "виски_кола",
          name: "Виски-кола",
          description: "виски, кола",
          price: 10.0,
          weight: "50/100 мл",
        },
        {
          id: "куба_либре",
          name: "Куба Либре",
          description: "ром, кола, сок лайма",
          price: 14.0,
          weight: "50/100/20 мл",
        },
        {
          id: "белый_русский",
          name: "Белый русский",
          description: "финляндия, калуга, сливки",
          price: 17.0,
          weight: "30/40/30 мл",
        },
        {
          id: "виски_сауэр",
          name: "Виски-сауэр",
          description:
            "джин бим, биттер агоструда, белок, сахарный сироп, лимонный сок",
          price: 17.0,
          weight: "50/1/25/15/30 мл",
        },
        {
          id: "текила_санрайз",
          name: "Текила Санрайз",
          description: "текила, апельсиновый сок, сироп гренадин",
          price: 15.0,
          weight: "50/100/20 мл",
        },
        {
          id: "дайкири",
          name: "Дайкири",
          description: "ром, сахарный сироп, сок лайма",
          price: 13.5,
          weight: "50/20/30 мл",
        },
        {
          id: "джин_физз",
          name: "Джин Физз",
          description: "джин, швепс, сок лайма",
          price: 12.0,
          weight: "50/100/20 мл",
        },
      ],
    },
    пиво: {
      title: "Пиво",
      items: [
        {
          id: "аливария_золотое_разливное",
          name: "Аливария Золотое (разливное)",
          price: 8.0,
          weight: "500 мл",
        },
        {
          id: "аливария_золотое_бутылка",
          name: "Аливария Золотое (бут.)",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "аливария_белое_золото_разливное",
          name: "Аливария Белое Золото (разливное)",
          price: 8.0,
          weight: "500 мл",
        },
        {
          id: "аливария_белое_золото_бутылка",
          name: "Аливария Белое Золото (бут.)",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "жатецкий_гусь_светлое",
          name: "Жатецкий гусь светлое (бут.)",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "жатецкий_гусь_темное_бутылка",
          name: "Жатецкий гусь темное (бут.)",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "жатецкий_гусь_темное_разливное",
          name: "Жатецкий гусь темное (разливное)",
          price: 8.0,
          weight: "500 мл",
        },
        {
          id: "holsten",
          name: "Holsten",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "аливария_0",
          name: "Аливария 0%",
          price: 8.0,
          weight: "500 мл",
        },
        {
          id: "tuborg",
          name: "Tuborg",
          price: 8.0,
          weight: "500 мл",
        },
        {
          id: "carlsberg",
          name: "Carlsberg",
          price: 8.0,
          weight: "450 мл",
        },
        {
          id: "old_bobby",
          name: "Old Bobby",
          price: 9.0,
          weight: "500 мл",
        },
      ],
    },
    холодные_напитки: {
      title: "Холодные напитки",
      items: [
        {
          id: "берн",
          name: "Бёрн",
          price: 10.0,
          weight: "250 мл",
        },
        {
          id: "кока_кола",
          name: "Кока-Кола",
          price: 6.0,
          weight: "500 мл",
        },
        {
          id: "фанта_апельсин",
          name: "Фанта апельсин",
          price: 6.0,
          weight: "500 мл",
        },
        {
          id: "спрайт",
          name: "Спрайт",
          price: 6.0,
          weight: "500 мл",
        },
        {
          id: "швепс",
          name: "Швепс",
          description: "в ассортименте",
          price: 6.0,
          weight: "500 мл",
        },
        {
          id: "бонаква",
          name: "Бонаква",
          description: "в ассортименте",
          price: 3.0,
          weight: "500 мл",
        },
        {
          id: "rich",
          name: "Rich",
          description: "в ассортименте",
          price: 3.0,
          weight: "200 мл",
        },
      ],
    },
  };

  const categories = [
    { id: "холодные_закуски", name: "Холодные закуски", icon: "🥗" },
    { id: "салаты", name: "Салаты", icon: "🥬" },
    { id: "суши_роллы", name: "Суши/Роллы", icon: "🍣" },
    { id: "пиццы", name: "Пиццы", icon: "🍕" },
    { id: "горячие_блюда", name: "Горячие блюда", icon: "🍖" },
    { id: "паста", name: "Паста", icon: "🍝" },
    { id: "десерты", name: "Десерты", icon: "🍰" },
    { id: "горячие_напитки", name: "Горячие напитки", icon: "☕" },
    { id: "коктейли", name: "Коктейли", icon: "🍹" },
    { id: "пиво", name: "Пиво", icon: "🍺" },
    { id: "холодные_напитки", name: "Холодные напитки", icon: "🥤" },
  ];

  const addToCart = (item: MenuItem) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: {
        ...item,
        quantity: (prev[item.id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0
    );
  };

  const handleOrderSubmit = async () => {
    if (getTotalItems() === 0) {
      alert("Добавьте товары в корзину");
      return;
    }
    if (!orderData.name || !orderData.phone) {
      alert("Заполните все обязательные поля");
      return;
    }

    const orderSummary: OrderData = {
      items: cart,
      total: getTotalPrice(),
      customerData: orderData,
      orderTime: new Date().toLocaleString(),
      orderType: "pickup",
    };
    try {
      setIsSubmitting(true);

      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "order", data: orderSummary }),
      });

      const result = await response.json();

      if (result.success) {
        console.log("Заказ оформлен:", orderSummary);
        alert(
          "Заказ успешно оформлен! Ожидайте звонка оператора для подтверждения времени готовности."
        );
        setCart({});
        setOrderData({ name: "", phone: "", comment: "" });
        setShowCart(false);
      } else {
        throw new Error(result.error || "Ошибка при отправке заказа");
      }
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      alert(
        "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-28">
        {/* Header */}
        <div className="bg-green-800 text-white p-6 rounded-lg mb-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="bg-green-700 hover:bg-green-600 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">NA DUBROVKE</h1>
              <p className="text-green-100">
                Ресторан белорусской и европейской кухни • Самовывоз
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Готовность: 15-25 мин
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Без минимальной суммы заказа
            </span>
          </div>
        </div>

        {/* Cart Button */}
        <div className="fixed top-6 right-6 z-50">
          <button
            onClick={() => setShowCart(!showCart)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-6">
          {/* Categories Sidebar */}
          <div className="w-64 bg-white rounded-lg p-4 h-fit sticky top-6">
            <h3 className="font-bold text-lg mb-4">Категории</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors flex items-center gap-3 ${
                    activeCategory === category.id
                      ? "bg-green-100 text-green-800 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-xl">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">
                {menuData[activeCategory]?.title}
              </h2>
              <div className="grid gap-4">
                {menuData[activeCategory]?.items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        {item.description && (
                          <p className="text-gray-600 text-sm mt-1">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <span className="font-bold text-lg text-green-600">
                            {item.price.toFixed(2)} BYN
                          </span>
                          {item.weight && (
                            <span className="text-sm text-gray-500">
                              {item.weight}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {cart[item.id] && (
                          <>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {cart[item.id].quantity}
                            </span>
                          </>
                        )}
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && (
            <div className="w-96 bg-white rounded-lg p-6 h-fit sticky top-6">
              <h3 className="font-bold text-xl mb-4">Корзина</h3>
              {getTotalItems() === 0 ? (
                <p className="text-gray-500 text-center py-8">Корзина пуста</p>
              ) : (
                <>
                  <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                    {Object.values(cart).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.name}</h4>
                          <p className="text-green-600 font-semibold">
                            {item.price.toFixed(2)} BYN
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-500 text-white p-1 rounded-full hover:bg-green-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Итого:</span>
                      <span className="text-green-600">
                        {getTotalPrice().toFixed(2)} BYN
                      </span>
                    </div>
                  </div>

                  {/* Order Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        <User className="w-4 h-4 inline mr-1" />
                        Имя *
                      </label>
                      <input
                        type="text"
                        value={orderData.name}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Телефон *
                      </label>
                      <input
                        type="tel"
                        value={orderData.phone}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Комментарий к заказу
                      </label>
                      <textarea
                        value={orderData.comment}
                        onChange={(e) =>
                          setOrderData((prev) => ({
                            ...prev,
                            comment: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        rows={2}
                        placeholder="Дополнительные пожелания..."
                      />
                    </div>

                    <button
                      onClick={handleOrderSubmit}
                      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      {isSubmitting
                        ? "Отправка заказа..."
                        : "Оформить заказ на самовывоз"}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPickupOrder;
