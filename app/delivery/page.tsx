"use client";

import React, { useState } from "react";
import { Truck, MapPin, Clock, ArrowRight } from "lucide-react";
import RestaurantPickupOrder from "@/components/restaurant-pickup-order";
export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState<
    "delivery" | "pickup" | null
  >(null);

  const handlePickupClick = () => {
    setSelectedOption("pickup");
  };

  const handleBackToSelection = () => {
    setSelectedOption(null);
  };

  if (selectedOption === "pickup") {
    return <RestaurantPickupOrder onBack={handleBackToSelection} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-28">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            NA DUBROVKE
          </h1>
          <p className="text-xl text-green-600 mb-2">
            Ресторан европейской кухни
          </p>
          <p className="text-gray-600">Выберите способ получения заказа</p>
        </div>

        {/* Options */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Delivery Option */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8 text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Доставка
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>40-60 минут</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Минимальный заказ: 15.00 BYN</span>
                </div>
                <p className="text-sm text-gray-500">
                  Доставим ваш заказ прямо к двери
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Выберите сервис
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://eda.yandex.by/r/na_dubrovke?placeSlug=na_dubrovke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                    aria-label="Открыть Menu.by в новой вкладке"
                  >
                    ЯндексЕда
                  </a>
                  <a
                    href="https://clever.by/mogilev/nadubrovke-delivery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                    aria-label="Открыть Eda.by в новой вкладке"
                  >
                    Clever
                  </a>
                  <a
                    href="https://just-eat.by/na-dubrovke-mogilev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700 hover:bg-amber-100 transition-colors"
                    aria-label="Открыть Glovo в новой вкладке"
                  >
                    Just-Eat
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Option */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8 text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Самовывоз
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>15-25 минут</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>Без минимальной суммы</span>
                </div>
                <p className="text-sm text-gray-500">
                  Заберите заказ в нашем ресторане
                </p>
              </div>
              <button
                onClick={handlePickupClick}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 group"
              >
                Заказать самовывоз
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              О ресторане
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Адрес</h4>
                <p className="text-gray-600 text-sm">ул. Дубровская, 25</p>
              </div>
              <div>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Время работы
                </h4>
                <p className="text-gray-600 text-sm">Ежедневно 11:00 - 23:00</p>
              </div>
              <div>
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Кухня</h4>
                <p className="text-gray-600 text-sm">
                  Европейская, суши, пицца
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
