"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Phone,
  User,
  ArrowLeft,
  X,
} from "lucide-react";
import Alert from "./ui/alert";
import Image from "next/image";

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

type MenuMap = Record<string, { title: string; items: MenuItem[] }>;

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

interface RawMenuItem {
  название: string;
  цена: number;
  вес?: string;
  ингредиенты?: string;
}

const RestaurantPickupOrder: React.FC<RestaurantPickupOrderProps> = ({
  onBack,
}) => {
  const [cart, setCart] = useState<Record<string, CartItem>>({});
  const [activeCategory, setActiveCategory] = useState("холодные_закуски");
  const [showCart, setShowCart] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMenu, setIsMenu] = useState<MenuMap | null>(null);
  const [orderData, setOrderData] = useState<OrderData["customerData"]>({
    name: "",
    phone: "",
    comment: "",
  });
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const showAlert = (title: string, message: string) => {
    setAlertState({
      isOpen: true,
      title,
      message,
    });
  };

  const hideAlert = () => {
    setAlertState({
      isOpen: false,
      title: "",
      message: "",
    });
  };

  const handleCloseCart = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShowCart(false);
    }, 500);
  };

  const handleOpenCart = () => {
    setShowCart(true);
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const transformMenuData = (
    rawMenu: Record<string, Record<string, RawMenuItem>>
  ) => {
    const transformed: Record<string, { title: string; items: MenuItem[] }> =
      {};
    Object.entries(rawMenu).forEach(([categoryKey, itemsObj]) => {
      const categoryTitleMap: Record<string, string> = {
        холодные_закуски: "Холодные закуски",
        салаты: "Салаты",
        суши_роллы: "Суши/Роллы",
        пиццы: "Пиццы",
        горячие_блюда: "Горячие блюда",
        паста: "Паста",
        десерты: "Десерты",
        горячие_напитки: "Горячие напитки",
      };

      const items: MenuItem[] = Object.entries(itemsObj).map(
        ([itemId, itemData]) => ({
          id: itemId,
          name: itemData["название"],
          price: itemData["цена"],
          weight: itemData["вес"],
          description: itemData["ингредиенты"],
        })
      );

      transformed[categoryKey] = {
        title: categoryTitleMap[categoryKey] || categoryKey,
        items,
      };
    });

    return transformed;
  };

  useEffect(() => {
    const menuFetch = async () => {
      const data = await fetch(
        "https://12ormbedoelpdllo.public.blob.vercel-storage.com/menu.json"
      );
      const res = await data.json();

      setIsMenu(transformMenuData(res.menu));
    };

    menuFetch();
  }, []);

  const categories = [
    { id: "холодные_закуски", name: "Холодные закуски", icon: "🥗" },
    { id: "салаты", name: "Салаты", icon: "🥬" },
    { id: "суши_роллы", name: "Суши/Роллы", icon: "🍣" },
    { id: "пиццы", name: "Пиццы", icon: "🍕" },
    { id: "горячие_блюда", name: "Горячие блюда", icon: "🍖" },
    { id: "паста", name: "Паста", icon: "🍝" },
    { id: "десерты", name: "Десерты", icon: "🍰" },
    { id: "горячие_напитки", name: "Горячие напитки", icon: "☕" },
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
      showAlert(
        "Корзина пуста",
        "Добавьте товары в корзину перед оформлением заказа"
      );
      return;
    }
    if (!orderData.name || !orderData.phone) {
      showAlert(
        "Заполните обязательные поля",
        "Пожалуйста, укажите имя и номер телефона"
      );
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
        showAlert(
          "Заказ принят",
          "Ваш заказ успешно оформлен! Ожидайте звонка оператора для подтверждения времени готовности."
        );
        setCart({});
        setOrderData({ name: "", phone: "", comment: "" });
        setShowCart(false);
      } else {
        throw new Error(result.error || "Ошибка при отправке заказа");
      }
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
      showAlert(
        "Ошибка отправки",
        "Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#d6cbab] relative overflow-hidden">
      {/* Floating Images */}
      <div className="absolute top-16 left-8 opacity-20 hover:opacity-30 transition-all duration-700 transform hover:scale-110 hover:rotate-6 pointer-events-none">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={140}
          height={140}
          className="filter drop-shadow-2xl"
        />
      </div>

      <div className="absolute top-40 right-12 opacity-18 hover:opacity-28 transition-all duration-800 transform hover:scale-105 hover:-rotate-3 pointer-events-none">
        <Image
          src="/pizzaMenu.png"
          alt="Pizza slice illustration"
          width={110}
          height={110}
          className="filter drop-shadow-2xl"
        />
      </div>

      <div className="absolute bottom-32 left-16 opacity-15 hover:opacity-25 transition-all duration-600 transform hover:scale-105 hover:rotate-12 pointer-events-none">
        <Image
          src="/pizzaMenu.png"
          alt="Pizza slice illustration"
          width={85}
          height={85}
          className="filter drop-shadow-xl"
        />
      </div>

      <div className="absolute top-72 right-40 opacity-12 hover:opacity-22 transition-all duration-900 transform hover:scale-105 hover:-rotate-9 pointer-events-none">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={95}
          height={95}
          className="filter drop-shadow-xl"
        />
      </div>

      <div className="absolute bottom-60 right-8 opacity-16 hover:opacity-26 transition-all duration-700 transform hover:scale-110 hover:rotate-6 pointer-events-none">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={75}
          height={75}
          className="filter drop-shadow-lg"
        />
      </div>

      <div className="absolute top-96 left-32 opacity-14 hover:opacity-24 transition-all duration-800 transform hover:scale-105 hover:-rotate-12 pointer-events-none">
        <Image
          src="/pizzaMenu.png"
          alt="Pizza slice illustration"
          width={65}
          height={65}
          className="filter drop-shadow-lg"
        />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#d6cbab] bg-[#5e644d] px-6 py-3 rounded-xl hover:bg-[#4a4f3d] transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-[#d6cbab]/30 hover:scale-105 backdrop-blur-sm ring-2 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/40"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>
          <h1 className="text-3xl font-bold text-[#5e644d] drop-shadow-lg">
            Заказ на самовывоз
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          {/* Mobile Categories - Horizontal Scroll */}
          <div className="lg:hidden bg-white/95 backdrop-blur-md rounded-lg p-3 xs:p-4 sm:p-5 border-2 border-[#5e644d]/30 ring-1 ring-[#d6cbab]/20 shadow-lg">
            <h3 className="font-bold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4 text-[#5e644d]">
              Категории
            </h3>
            <div className="flex gap-2 xs:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 xs:gap-2.5 whitespace-nowrap min-h-[44px] w-max ${
                    activeCategory === category.id
                      ? "bg-[#5e644d] text-[#d6cbab] font-medium shadow-lg"
                      : "bg-[#d6cbab]/30 hover:bg-[#d6cbab]/50 text-[#5e644d]"
                  }`}
                >
                  <span className="text-lg xs:text-xl sm:text-2xl">
                    {category.icon}
                  </span>
                  <span className="text-xs xs:text-sm sm:text-base font-medium">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Categories Sidebar */}
          <div className="hidden lg:block w-64 xl:w-72 bg-white/95 backdrop-blur-md rounded-lg p-4 xl:p-6 h-fit sticky top-6 border-2 border-[#5e644d]/30 ring-1 ring-[#d6cbab]/20 shadow-lg">
            <h3 className="font-bold text-lg xl:text-xl mb-4 xl:mb-6 text-[#5e644d]">
              Категории
            </h3>
            <div className="space-y-2 xl:space-y-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 xl:p-3 rounded-lg transition-all duration-200 flex items-center gap-3 xl:gap-4 min-h-[52px] xl:min-h-[56px] ${
                    activeCategory === category.id
                      ? "bg-[#5e644d] text-[#d6cbab] font-medium shadow-lg"
                      : "hover:bg-[#d6cbab]/30 hover:shadow-md text-[#5e644d]"
                  }`}
                >
                  <span className="text-xl xl:text-2xl">{category.icon}</span>
                  <span className="text-base xl:text-lg">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/95 backdrop-blur-md rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 border-2 border-[#5e644d]/30 ring-1 ring-[#d6cbab]/20 shadow-lg">
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6 text-[#5e644d]">
                {isMenu ? isMenu[activeCategory]?.title : "Загрузка..."}
              </h2>
              <div className="grid gap-3 xs:gap-4 sm:gap-5">
                {isMenu ? (
                  isMenu[activeCategory].items.map((item: MenuItem) => (
                    <div
                      key={item.id}
                      className="border-2 border-[#5e644d]/25 rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all duration-400 hover:border-[#5e644d]/50 hover:bg-[#d6cbab]/20 backdrop-blur-sm ring-1 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/40 group"
                    >
                      <div className="flex justify-between items-start gap-3 xs:gap-4 sm:gap-5">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm xs:text-base sm:text-lg md:text-xl mb-1 xs:mb-2 line-clamp-2 text-[#5e644d] group-hover:text-[#4a4f3d] transition-colors duration-300">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-gray-600 text-xs xs:text-sm sm:text-base mb-2 xs:mb-3 line-clamp-2 sm:line-clamp-3 text-[#5e644d]/70 group-hover:text-[#5e644d]/80 transition-colors duration-300">
                              {item.description}
                            </p>
                          )}
                          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4">
                            <span className="font-bold text-base xs:text-lg sm:text-xl md:text-2xl text-[#5e644d] group-hover:text-[#4a4f3d] transition-colors duration-300">
                              {item.price.toFixed(2)} BYN
                            </span>
                            {item.weight && (
                              <span className="text-xs xs:text-sm sm:text-base text-[#5e644d]/60">
                                {item.weight}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0">
                          {cart[item.id] && (
                            <>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="bg-red-500 text-white p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-red-600 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border-2 border-white/30 ring-1 ring-red-300/30 min-h-[44px] min-w-[44px] flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                              </button>
                              <span className="w-6 xs:w-8 sm:w-10 text-center font-bold text-sm xs:text-base sm:text-lg flex-shrink-0 text-[#5e644d]">
                                {cart[item.id].quantity}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-[#5e644d] text-[#d6cbab] p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-[#4a4f3d] transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border-2 border-[#d6cbab]/30 backdrop-blur-sm ring-1 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/40 min-h-[44px] min-w-[44px] flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 xs:py-16 sm:py-20 text-[#5e644d]/60">
                    <div className="animate-pulse">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-[#5e644d]/20 rounded-full mx-auto mb-4"></div>
                      <p className="text-sm xs:text-base sm:text-lg">
                        Загрузка меню...
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Cart Sidebar */}
          {showCart && (
            <div className="hidden lg:flex w-80 xl:w-96 bg-white/95 backdrop-blur-md rounded-lg p-4 xl:p-6 h-fit sticky top-6 max-h-[calc(100vh-3rem)] overflow-hidden flex-col border-2 border-[#5e644d]/30 ring-1 ring-[#d6cbab]/20 shadow-lg">
              <h3 className="font-bold text-xl xl:text-2xl mb-4 xl:mb-6 flex-shrink-0 text-[#5e644d]">
                Корзина
              </h3>
              {getTotalItems() === 0 ? (
                <div className="text-[#5e644d]/60 text-center py-12 xl:py-16">
                  <ShoppingCart className="w-12 h-12 xl:w-16 xl:h-16 mx-auto mb-4 text-[#5e644d]/30" />
                  <p className="text-base xl:text-lg">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 xl:space-y-4 mb-6 xl:mb-8 flex-1 overflow-y-auto">
                    {Object.values(cart).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 xl:p-4 border-2 border-[#5e644d]/25 rounded-lg bg-[#d6cbab]/20 hover:bg-[#d6cbab]/30 transition-all duration-400 hover:shadow-lg hover:scale-[1.02] backdrop-blur-sm ring-1 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/30"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <h4 className="font-medium text-sm xl:text-base truncate mb-1 text-[#5e644d]">
                            {item.name}
                          </h4>
                          <p className="text-[#5e644d] font-semibold text-sm xl:text-base">
                            {item.price.toFixed(2)} BYN
                          </p>
                        </div>
                        <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-400 text-white rounded-full hover:from-red-500 hover:via-red-600 hover:to-red-500 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border-2 border-white/30 ring-1 ring-red-300/30"
                          >
                            <Minus className="w-3 h-3 xl:w-4 xl:h-4" />
                          </button>
                          <span className="w-8 xl:w-10 text-center font-bold text-sm xl:text-base text-[#5e644d]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="w-9 h-9 flex items-center justify-center bg-gradient-to-r from-[#5e644d] via-[#4a4f3d] to-[#5e644d] text-[#d6cbab] rounded-full hover:from-[#4a4f3d] hover:via-[#3a3f2d] hover:to-[#4a4f3d] transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl border-2 border-[#d6cbab]/30 ring-1 ring-[#d6cbab]/20"
                          >
                            <Plus className="w-3 h-3 xl:w-4 xl:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-[#5e644d]/30 pt-4 xl:pt-6 mb-6 xl:mb-8 flex-shrink-0">
                    <div className="flex justify-between items-center text-lg xl:text-xl font-bold">
                      <span className="text-[#5e644d]">Итого:</span>
                      <span className="text-[#5e644d] bg-[#d6cbab]/30 px-4 py-2 rounded-lg border-2 border-[#5e644d]/20 shadow-lg">
                        {getTotalPrice().toFixed(2)} BYN
                      </span>
                    </div>
                  </div>

                  {/* Order Form */}
                  <div className="space-y-4 xl:space-y-5 flex-shrink-0">
                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2 text-[#5e644d]">
                        <User className="w-4 h-4 xl:w-5 xl:h-5 inline mr-2" />
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
                        className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                        placeholder="Ваше имя"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2 text-[#5e644d]">
                        <Phone className="w-4 h-4 xl:w-5 xl:h-5 inline mr-2" />
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
                        className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                        placeholder="+375 XX XXX-XX-XX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2 text-[#5e644d]">
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
                        className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                        rows={3}
                        placeholder="Дополнительные пожелания..."
                      />
                    </div>

                    <button
                      onClick={handleOrderSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-[#5e644d] text-[#d6cbab] py-4 xl:py-5 rounded-lg font-semibold hover:bg-[#4a4f3d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border-2 border-[#d6cbab]/30 backdrop-blur-sm ring-1 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/40 disabled:ring-gray-300/20 text-base xl:text-lg"
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

        {/* Mobile Cart Button - Fixed Bottom Right */}
        <div className="fixed bottom-4 xs:bottom-5 sm:bottom-6 right-4 xs:right-5 sm:right-6 z-50 lg:hidden">
          <button
            onClick={() => handleOpenCart()}
            className="bg-[#5e644d] text-[#d6cbab] p-3 xs:p-3.5 sm:p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#d6cbab]/30 ring-2 ring-[#d6cbab]/20"
          >
            <ShoppingCart className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-1 -right-1 xs:-top-1.5 xs:-right-1.5 bg-red-500 text-white text-xs xs:text-sm font-bold rounded-full w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 flex items-center justify-center min-w-0">
                {getTotalItems() > 99 ? "99+" : getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Desktop Cart Button */}
        <div className="fixed bottom-6 right-6 z-50 hidden lg:block">
          <button
            onClick={() => handleOpenCart()}
            className="bg-[#5e644d] text-[#d6cbab] p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-[#d6cbab]/30 ring-2 ring-[#d6cbab]/20"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
                {getTotalItems() > 99 ? "99+" : getTotalItems()}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Cart Modal */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black/30 z-50 lg:hidden"
            onClick={handleCloseCart}
          >
            <div
              className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 ease-out ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-[#5e644d]/20 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-[#5e644d]">Корзина</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseCart();
                    }}
                    className="p-2 hover:bg-[#d6cbab]/20 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-105 active:scale-95"
                  >
                    <X className="w-6 h-6 text-[#5e644d]" />
                  </button>
                </div>
                <div className="w-12 h-1.5 bg-[#5e644d]/30 rounded-full mx-auto mt-3"></div>
              </div>

              <div className="p-4 overflow-y-auto flex-1">
                {getTotalItems() === 0 ? (
                  <div className="text-[#5e644d]/60 text-center py-12">
                    <ShoppingCart className="w-20 h-20 mx-auto mb-4 text-[#5e644d]/30" />
                    <p className="text-xl">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {Object.values(cart).map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-4 border-2 border-[#5e644d]/25 rounded-xl bg-[#d6cbab]/20"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <h4 className="font-medium text-[#5e644d] mb-1 line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-[#5e644d] font-semibold">
                              {item.price.toFixed(2)} BYN
                            </p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                              }}
                              className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px]"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-bold text-[#5e644d] text-lg">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                              }}
                              className="w-9 h-9 flex items-center justify-center bg-[#5e644d] text-[#d6cbab] rounded-full hover:bg-[#4a4f3d] transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px]"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-[#5e644d]/30 pt-4 mb-6">
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-[#5e644d]">Итого:</span>
                        <span className="text-[#5e644d] bg-[#d6cbab]/30 px-4 py-2 rounded-lg border-2 border-[#5e644d]/20 shadow-lg">
                          {getTotalPrice().toFixed(2)} BYN
                        </span>
                      </div>
                    </div>

                    {/* Mobile Order Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#5e644d] mb-2">
                          <User className="w-4 h-4 inline mr-2" />
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
                          className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                          placeholder="Ваше имя"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5e644d] mb-2">
                          <Phone className="w-4 h-4 inline mr-2" />
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
                          className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                          placeholder="+375 XX XXX-XX-XX"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#5e644d] mb-2">
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
                          className="w-full p-3 xl:p-4 border-2 border-[#5e644d]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d6cbab]/40 focus:border-[#5e644d] bg-white/95 backdrop-blur-sm transition-all duration-300 hover:border-[#5e644d]/40 hover:shadow-lg ring-1 ring-[#d6cbab]/20 text-base"
                          rows={4}
                          placeholder="Дополнительные пожелания..."
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderSubmit();
                        }}
                        disabled={
                          isSubmitting ||
                          getTotalItems() === 0 ||
                          !orderData.name ||
                          !orderData.phone
                        }
                        className="w-full bg-[#5e644d] text-[#d6cbab] py-4 px-6 rounded-xl font-semibold hover:bg-[#4a4f3d] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 border-2 border-[#d6cbab]/30 backdrop-blur-sm ring-1 ring-[#d6cbab]/20 hover:ring-[#d6cbab]/40 disabled:ring-gray-300/20"
                      >
                        {isSubmitting ? "Отправка заказа..." : "Оформить заказ"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {alertState.isOpen && (
        <Alert
          title={alertState.title}
          message={alertState.message}
          isOpen={alertState.isOpen}
          onClose={hideAlert}
        />
      )}
    </div>
  );
};

export default RestaurantPickupOrder;
