"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Phone,
  MapPin,
  Clock,
  User,
  ArrowLeft,
  X,
} from "lucide-react";
import Alert from "./ui/alert";

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
  const [isAnimating, setIsAnimating] = useState(false); // Added state for proper translate animation control
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
    }, 10); // Small delay to ensure DOM is ready
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
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 pt-20 xs:pt-24 sm:pt-28 md:pt-32 lg:pt-28 xl:pt-24 pb-4 xs:pb-6 sm:pb-8 md:pb-12 lg:pb-16 xl:pb-20">
        {/* Header */}
        <div className="bg-green-800 text-white p-3 xs:p-4 sm:p-5 md:p-6 rounded-lg mb-3 xs:mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 mb-2 xs:mb-3 sm:mb-4">
            <button
              onClick={onBack}
              className="bg-green-700 hover:bg-green-600 p-1.5 xs:p-2 sm:p-2.5 rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate">
                NA DUBROVKE
              </h1>
              <p className="text-green-100 text-xs xs:text-sm sm:text-base md:text-lg">
                Ресторан белорусской и европейской кухни • Самовывоз
              </p>
            </div>
          </div>
          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 text-xs xs:text-sm sm:text-base">
            <span className="flex items-center gap-1 xs:gap-1.5">
              <Clock className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">Готовность: 15-25 мин</span>
            </span>
            <span className="flex items-center gap-1 xs:gap-1.5">
              <MapPin className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="truncate">Без минимальной суммы заказа</span>
            </span>
          </div>
        </div>

        {/* Mobile Cart Button - Fixed Bottom Right */}
        <div className="fixed bottom-4 xs:bottom-5 sm:bottom-6 right-4 xs:right-5 sm:right-6 z-50 lg:hidden">
          <button
            onClick={() => handleOpenCart()}
            className="bg-green-600 text-white p-3 xs:p-3.5 sm:p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
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
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ShoppingCart className="w-6 h-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center">
                {getTotalItems() > 99 ? "99+" : getTotalItems()}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-8">
          {/* Mobile Categories - Horizontal Scroll */}
          <div className="lg:hidden bg-white rounded-lg p-3 xs:p-4 sm:p-5">
            <h3 className="font-bold text-sm xs:text-base sm:text-lg mb-2 xs:mb-3 sm:mb-4">
              Категории
            </h3>
            <div className="flex gap-2 xs:gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex-shrink-0 px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 xs:gap-2.5 whitespace-nowrap min-h-[44px] ${
                    activeCategory === category.id
                      ? "bg-green-100 text-green-800 font-medium shadow-sm scale-105"
                      : "hover:bg-gray-100 bg-gray-50 hover:scale-102"
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
          <div className="hidden lg:block w-64 xl:w-72 bg-white rounded-lg p-4 xl:p-6 h-fit sticky top-6">
            <h3 className="font-bold text-lg xl:text-xl mb-4 xl:mb-6">
              Категории
            </h3>
            <div className="space-y-2 xl:space-y-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 xl:p-4 rounded-lg transition-all duration-200 flex items-center gap-3 xl:gap-4 min-h-[52px] xl:min-h-[56px] ${
                    activeCategory === category.id
                      ? "bg-green-100 text-green-800 font-medium shadow-sm"
                      : "hover:bg-gray-100 hover:shadow-sm"
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
            <div className="bg-white rounded-lg p-3 xs:p-4 sm:p-5 md:p-6">
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                {isMenu ? isMenu[activeCategory]?.title : "Загрузка..."}
              </h2>
              <div className="grid gap-3 xs:gap-4 sm:gap-5">
                {isMenu ? (
                  isMenu[activeCategory].items.map((item: MenuItem) => (
                    <div
                      key={item.id}
                      className="border rounded-lg p-3 xs:p-4 sm:p-5 md:p-6 hover:shadow-md transition-all duration-200 hover:border-green-200"
                    >
                      <div className="flex justify-between items-start gap-3 xs:gap-4 sm:gap-5">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm xs:text-base sm:text-lg md:text-xl mb-1 xs:mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="text-gray-600 text-xs xs:text-sm sm:text-base mb-2 xs:mb-3 line-clamp-2 sm:line-clamp-3">
                              {item.description}
                            </p>
                          )}
                          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 sm:gap-4">
                            <span className="font-bold text-base xs:text-lg sm:text-xl md:text-2xl text-green-600">
                              {item.price.toFixed(2)} BYN
                            </span>
                            {item.weight && (
                              <span className="text-xs xs:text-sm sm:text-base text-gray-500">
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
                                className="bg-red-500 text-white p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                              </button>
                              <span className="w-6 xs:w-8 sm:w-10 text-center font-bold text-sm xs:text-base sm:text-lg flex-shrink-0">
                                {cart[item.id].quantity}
                              </span>
                            </>
                          )}
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-500 text-white p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-green-600 transition-all duration-200 hover:scale-110 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 xs:py-16 sm:py-20 text-gray-500">
                    <div className="animate-pulse">
                      <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
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
            <div className="hidden lg:flex w-80 xl:w-96 bg-white rounded-lg p-4 xl:p-6 h-fit sticky top-6 max-h-[calc(100vh-3rem)] overflow-hidden flex-col">
              <h3 className="font-bold text-xl xl:text-2xl mb-4 xl:mb-6 flex-shrink-0">
                Корзина
              </h3>
              {getTotalItems() === 0 ? (
                <div className="text-gray-500 text-center py-12 xl:py-16">
                  <ShoppingCart className="w-12 h-12 xl:w-16 xl:h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-base xl:text-lg">Корзина пуста</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 xl:space-y-4 mb-6 xl:mb-8 flex-1 overflow-y-auto">
                    {Object.values(cart).map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center p-3 xl:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <h4 className="font-medium text-sm xl:text-base truncate mb-1">
                            {item.name}
                          </h4>
                          <p className="text-green-600 font-semibold text-sm xl:text-base">
                            {item.price.toFixed(2)} BYN
                          </p>
                        </div>
                        <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110"
                          >
                            <Minus className="w-3 h-3 xl:w-4 xl:h-4" />
                          </button>
                          <span className="w-8 xl:w-10 text-center font-bold text-sm xl:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all duration-200 hover:scale-110"
                          >
                            <Plus className="w-3 h-3 xl:w-4 xl:h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 xl:pt-6 mb-6 xl:mb-8 flex-shrink-0">
                    <div className="flex justify-between items-center text-lg xl:text-xl font-bold">
                      <span>Итого:</span>
                      <span className="text-green-600">
                        {getTotalPrice().toFixed(2)} BYN
                      </span>
                    </div>
                  </div>

                  {/* Order Form */}
                  <div className="space-y-4 xl:space-y-5 flex-shrink-0">
                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2">
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
                        className="w-full p-3 xl:p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2">
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
                        className="w-full p-3 xl:p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm xl:text-base font-medium mb-2">
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
                        className="w-full p-3 xl:p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base resize-none"
                        rows={3}
                        placeholder="Дополнительные пожелания..."
                      />
                    </div>

                    <button
                      onClick={handleOrderSubmit}
                      disabled={isSubmitting}
                      className="w-full bg-green-600 text-white py-4 xl:py-5 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg text-base xl:text-lg"
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

        {/* Mobile Cart Modal */}
        {showCart && (
          <div
            className="fixed inset-0 bg-black/30 z-50 lg:hidden"
            onClick={handleCloseCart}
          >
            <div
              className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl transition-all duration-500 ease-out ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 xs:p-5 sm:p-6 border-b flex-shrink-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg xs:text-xl sm:text-2xl">
                    Корзина
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCloseCart();
                    }}
                    className="p-2 xs:p-2.5 hover:bg-gray-100 rounded-full transition-all duration-200 min-h-[44px] min-w-[44px] flex items-center justify-center hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5 xs:w-6 xs:h-6" />
                  </button>
                </div>
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 transition-colors hover:bg-gray-400"></div>
              </div>

              <div className="p-4 xs:p-5 sm:p-6 overflow-y-auto flex-1">
                {getTotalItems() === 0 ? (
                  <div className="text-gray-500 text-center py-12 xs:py-16 sm:py-20">
                    <ShoppingCart className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 mx-auto mb-4 text-gray-300" />
                    <p className="text-base xs:text-lg sm:text-xl">
                      Корзина пуста
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 xs:space-y-4 mb-6 xs:mb-8">
                      {Object.values(cart).map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-center p-3 xs:p-4 sm:p-5 bg-gray-50 rounded-lg"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <h4 className="font-medium text-sm xs:text-base sm:text-lg mb-1 line-clamp-2">
                              {item.name}
                            </h4>
                            <p className="text-green-600 font-semibold text-sm xs:text-base sm:text-lg">
                              {item.price.toFixed(2)} BYN
                            </p>
                          </div>
                          <div className="flex items-center gap-2 xs:gap-3 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(item.id);
                              }}
                              className="bg-red-500 text-white p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-red-600 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4 xs:w-5 xs:h-5" />
                            </button>
                            <span className="w-6 xs:w-8 sm:w-10 text-center font-bold text-sm xs:text-base sm:text-lg flex-shrink-0">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                              }}
                              className="bg-green-500 text-white p-2 xs:p-2.5 sm:p-3 rounded-full hover:bg-green-600 transition-all duration-200 active:scale-95 min-h-[44px] min-w-[44px] flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4 xs:w-5 xs:h-5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 xs:pt-5 sm:pt-6 mb-6 xs:mb-8">
                      <div className="flex justify-between items-center text-lg xs:text-xl sm:text-2xl font-bold">
                        <span>Итого:</span>
                        <span className="text-green-600">
                          {getTotalPrice().toFixed(2)} BYN
                        </span>
                      </div>
                    </div>

                    {/* Mobile Order Form */}
                    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
                      <div>
                        <label className="block text-sm xs:text-base sm:text-lg font-medium mb-2">
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
                          className="w-full p-3 xs:p-4 sm:p-5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base xs:text-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm xs:text-base sm:text-lg font-medium mb-2">
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
                          className="w-full p-3 xs:p-4 sm:p-5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base xs:text-lg"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm xs:text-base sm:text-lg font-medium mb-2">
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
                          className="w-full p-3 xs:p-4 sm:p-5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-base xs:text-lg resize-none"
                          rows={4}
                          placeholder="Дополнительные пожелания..."
                        />
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOrderSubmit();
                        }}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-4 xs:py-5 sm:py-6 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-base xs:text-lg sm:text-xl"
                      >
                        {isSubmitting
                          ? "Отправка заказа..."
                          : "Оформить заказ на самовывоз"}
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
