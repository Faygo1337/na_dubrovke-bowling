"use client";

import React, { useState, useEffect } from "react";
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
                {isMenu ? isMenu[activeCategory]?.title : <>loading</>}
                {/* {isMenu[activeCategory]?.title} */}
              </h2>
              <div className="grid gap-4">
                {isMenu ? (
                  isMenu[activeCategory].items.map((item: MenuItem) => (
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
                  ))
                ) : (
                  <>Загрузка...</>
                )}

                {isMenu?.[activeCategory]?.items?.map((item: MenuItem) => (
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
