"use client";

import { useState } from "react";
import { Truck, MapPin, Clock, ArrowRight } from "lucide-react";
import RestaurantPickupOrder from "@/components/restaurant-pickup-order";
import Image from "next/image";

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
    <div className="min-h-screen bg-[#d6cbab] relative overflow-hidden">
      {/* Floating Burger - Top Left */}
      <div className="absolute top-20 left-10 opacity-20 hover:opacity-30 transition-all duration-500 transform hover:scale-110 hover:rotate-12 pointer-events-none md:pointer-events-auto">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={120}
          height={120}
          className="filter drop-shadow-lg"
        />
      </div>

      {/* Floating Pizza - Top Right */}
      <div className="absolute top-32 right-16 opacity-20 hover:opacity-30 transition-all duration-700 transform hover:scale-110 hover:-rotate-12 pointer-events-none md:pointer-events-auto">
        <Image
          src="/pizzaMenu.png"
          alt="Pizza slice illustration"
          width={100}
          height={100}
          className="filter drop-shadow-lg"
        />
      </div>

      {/* Additional Burger - Bottom Left */}
      <div className="absolute bottom-32 left-20 opacity-18 hover:opacity-25 transition-all duration-600 transform hover:scale-105 hover:rotate-6 pointer-events-none md:pointer-events-auto">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={80}
          height={80}
          className="filter drop-shadow-md"
        />
      </div>

      {/* Additional Pizza - Bottom Right */}
      <div className="absolute bottom-20 right-10 opacity-18 hover:opacity-25 transition-all duration-500 transform hover:scale-105 hover:-rotate-6 pointer-events-none md:pointer-events-auto">
        <Image
          src="/pizzaMenu.png"
          alt="Pizza slice illustration"
          width={90}
          height={90}
          className="filter drop-shadow-md"
        />
      </div>

      {/* Floating Pizza - Middle Left */}
      <div className="absolute top-1/2 left-5 opacity-25 pointer-events-none">
        <Image
          src="/burgerMenu.png"
          alt="Pizza slice illustration"
          width={70}
          height={70}
          className="sm:w-[120px] sm:h-[120px] filter drop-shadow-lg transform rotate-12"
        />
      </div>

      {/* Floating Burger - Middle Right */}
      <div className="absolute top-1/3 right-5 opacity-25 pointer-events-none">
        <Image
          src="/burgerMenu.png"
          alt="Burger illustration"
          width={75}
          height={75}
          className="sm:w-[150px] sm:h-[150px] filter drop-shadow-lg transform -rotate-12"
        />
      </div>

      <div className="mx-auto relative z-10">
        {/* Header */}
        <div className="flex text-center flex-col bg-[#5e644d] mb-12 pb-6 pt-[8rem] items-center gap-8 relative">
          <div className="absolute top-8 left-4 sm:left-1/4 opacity-25 pointer-events-none">
            <Image
              src="/burgerMenu.png"
              alt="Burger illustration"
              width={80}
              height={80}
              className="sm:w-[150px] sm:h-[150px] filter drop-shadow-lg transform rotate-12"
            />
          </div>

          <div className="absolute top-12 right-4 sm:right-1/4 opacity-25 pointer-events-none">
            <Image
              src="/pizzaMenu.png"
              alt="Pizza slice illustration"
              width={70}
              height={70}
              className="sm:w-[120px] sm:h-[120px] filter drop-shadow-lg transform -rotate-12"
            />
          </div>

          <div className="absolute bottom-4 left-8 opacity-20 pointer-events-none hidden sm:block">
            <Image
              src="/burgerMenu.png"
              alt="Burger illustration"
              width={80}
              height={80}
              className="filter drop-shadow-md transform rotate-6"
            />
          </div>

          <div className="absolute bottom-8 right-8 opacity-20 pointer-events-none hidden sm:block">
            <Image
              src="/pizzaMenu.png"
              alt="Pizza slice illustration"
              width={70}
              height={70}
              className="filter drop-shadow-md transform -rotate-6"
            />
          </div>

          <h1 className="font-bold text-6xl text-white drop-shadow-lg relative z-10">
            Доставка
          </h1>
          <p className="font-bold text-2xl text-white drop-shadow-md relative z-10">
            NA DUBROVKE
          </p>
        </div>

        {/* Options */}
        <div className="max-w-4xl grid md:grid-cols-2 gap-8 mx-auto px-4">
          {/* Delivery Option */}
          <div className="relative bg-gradient-to-br from-[#5e644d] via-[#6b7154] to-[#4f5442] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[#6b7154] hover:via-[#7a8162] hover:to-[#5e644d] overflow-hidden border-2 border-[#d6cbab]/60 ring-1 ring-[#d6cbab]/30">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none transition-all duration-300 hover:from-blue-500/10"></div>

            <div className="absolute top-4 right-4 opacity-35 pointer-events-none">
              <Image
                src="/burgerMenu.png"
                alt="Burger background"
                width={120}
                height={120}
                className="transform rotate-3 filter drop-shadow-md"
              />
            </div>
            <div className="absolute bottom-4 left-4 opacity-30 pointer-events-none">
              <Image
                src="/pizzaMenu.png"
                alt="Pizza background"
                width={80}
                height={80}
                className="transform -rotate-3 filter drop-shadow-md"
              />
            </div>
            <div className="absolute inset-0 bg-[#d6cbab]/15"></div>

            <div className="p-8 text-center relative z-10">
              <div className="bg-gradient-to-br from-[#d6cbab] to-[#c8bd9f] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-blue-400/40 ring-2 ring-blue-400/20">
                <Truck className="w-10 h-10 text-[#5e644d]" />
              </div>

              <h2 className="text-2xl font-bold text-[#d6cbab] mb-4 drop-shadow-sm">
                Доставка
              </h2>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center gap-2 text-[#d6cbab]/90 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>40-60 минут</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#d6cbab]/90 font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Минимальный заказ: 15.00 BYN</span>
                </div>
                <p className="text-sm text-[#d6cbab]/80 font-medium">
                  Доставим ваш заказ прямо к двери
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm font-semibold text-[#d6cbab] mb-3">
                  Выберите сервис
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://eda.yandex.by/r/na_dubrovke?placeSlug=na_dubrovke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border-2 border-yellow-400/50 bg-gradient-to-r from-[#d6cbab]/80 to-[#c8bd9f]/80 px-4 py-3 text-sm font-semibold text-[#5e644d] hover:from-[#d6cbab] hover:to-[#c8bd9f] hover:border-yellow-400/70 transition-all shadow-md"
                    aria-label="Открыть ЯндексЕда в новой вкладке"
                  >
                    ЯндексЕда
                  </a>
                  <a
                    href="https://clever.by/mogilev/nadubrovke-delivery/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border-2 border-white/50 bg-gradient-to-r from-[#d6cbab]/80 to-[#c8bd9f]/80 px-4 py-3 text-sm font-semibold text-[#5e644d] hover:from-[#d6cbab] hover:to-[#c8bd9f] hover:border-white/70 transition-all shadow-md"
                    aria-label="Открыть Clever в новой вкладке"
                  >
                    Clever
                  </a>
                  <a
                    href="https://just-eat.by/na-dubrovke-mogilev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full rounded-xl border-2 border-red-400/50 bg-gradient-to-r from-[#d6cbab]/80 to-[#c8bd9f]/80 px-4 py-3 text-sm font-semibold text-[#5e644d] hover:from-[#d6cbab] hover:to-[#c8bd9f] hover:border-red-400/70 transition-all shadow-md"
                    aria-label="Открыть Just-Eat в новой вкладке"
                  >
                    Just-Eat
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Option */}
          <div className="relative bg-gradient-to-br from-[#5e644d] via-[#6b7154] to-[#4f5442] rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:bg-gradient-to-br hover:from-[#6b7154] hover:via-[#7a8162] hover:to-[#5e644d] overflow-hidden border-2 border-[#d6cbab]/60 ring-1 ring-[#d6cbab]/30">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent pointer-events-none transition-all duration-300 hover:from-orange-500/10"></div>

            <div className="absolute top-4 left-4 opacity-35 pointer-events-none">
              <Image
                src="/pizzaMenu.png"
                alt="Pizza background"
                width={100}
                height={100}
                className="transform -rotate-3 filter drop-shadow-md"
              />
            </div>
            <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
              <Image
                src="/burgerMenu.png"
                alt="Burger background"
                width={90}
                height={90}
                className="transform rotate-3 filter drop-shadow-md"
              />
            </div>
            <div className="absolute inset-0 bg-[#d6cbab]/15"></div>

            <div className="p-8 text-center relative z-10 flex flex-col h-full">
              <div className="bg-gradient-to-br from-[#d6cbab] to-[#c8bd9f] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-orange-400/40 ring-2 ring-orange-400/20">
                <MapPin className="w-10 h-10 text-[#5e644d]" />
              </div>

              <h2 className="text-2xl font-bold text-[#d6cbab] mb-4 drop-shadow-sm">
                Самовывоз
              </h2>
              <div className="space-y-3 mb-8 flex-grow">
                <div className="flex items-center justify-center gap-2 text-[#d6cbab]/90 font-medium">
                  <Clock className="w-4 h-4" />
                  <span>15-25 минут</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-[#d6cbab]/90 font-medium">
                  <MapPin className="w-4 h-4" />
                  <span>Без минимальной суммы</span>
                </div>
                <p className="text-sm text-[#d6cbab]/80 font-medium">
                  Заберите заказ в нашем ресторане
                </p>
              </div>
              <div className="mt-auto">
                <button
                  onClick={handlePickupClick}
                  className="w-full bg-gradient-to-r from-[#d6cbab] to-[#c8bd9f] text-[#5e644d] py-3 px-6 rounded-xl font-semibold hover:from-[#c8bd9f] hover:to-[#b8ad8f] transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl"
                >
                  Заказать самовывоз
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="mt-16 bg-gradient-to-r from-white/95 via-gray-50/95 to-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mx-4 hover:from-white hover:via-gray-50 hover:to-white transition-all duration-300 border-2 border-gray-200/50 ring-1 ring-white/30">
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
