import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Star, Zap, Users, Phone } from "lucide-react";

export default function PriceTable() {
  const priceData = [
    {
      id: 1,
      service: "Услуга дорожки",
      unit: "час",
      days: "Пн, Вт, Чт",
      time: "17:00-24:00",
      price: "45,00",
      icon: Calendar,
      popular: false,
    },
    {
      id: 2,
      service: "Услуга дорожки",
      unit: "час",
      days: "Ср",
      time: "17:00-24:00",
      price: "40,00",
      icon: Zap,
      popular: true,
    },
    {
      id: 3,
      service: "Услуга дорожки",
      unit: "час",
      days: "Пт, Предпраздничные дни",
      time: "17:00-03:00",
      price: "50,00",
      icon: Star,
      popular: false,
    },
    {
      id: 4,
      service: "Услуга дорожки",
      unit: "час",
      days: "Сб, Праздничные дни",
      time: "12:00-04:00",
      price: "55,00",
      icon: Users,
      popular: false,
    },
    {
      id: 5,
      service: "Услуга дорожки",
      unit: "час",
      days: "Вс",
      time: "12:00-24:00",
      price: "45,00",
      icon: Clock,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Адаптивный */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <Badge className="mb-3 sm:mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
            Прайс-лист
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Стоимость услуг
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Актуальные цены на услуги дорожки. Доступные тарифы для всей семьи
          </p>
        </div>

        {/* Mobile Cards (до sm) */}
        <div className="block sm:hidden space-y-4">
          {priceData.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-lg border-2 overflow-hidden transition-all duration-300 hover:shadow-xl ${
                  item.popular
                    ? "border-orange-500 bg-gradient-to-r from-orange-50 to-white"
                    : "border-orange-100"
                }`}
              >
                {/* Mobile Card Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 relative">
                  {item.popular && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                        ХИТ
                      </Badge>
                    </div>
                  )}
                  <div className="flex items-center">
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.service}</h3>
                      <p className="text-white/90 text-sm">№{item.id}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Card Content */}
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Дни:</span>
                    <span className="font-medium text-gray-900 text-sm">
                      {item.days}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Время:</span>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                      <Clock className="w-3 h-3 text-blue-600 mr-1" />
                      <span className="text-blue-700 font-medium text-sm">
                        {item.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Единица:</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {item.unit}
                    </span>
                  </div>

                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Цена:</span>
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-600">
                          {item.price}
                        </div>
                        <div className="text-xs text-gray-500">руб/час</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet View (sm to lg) */}
        <div className="hidden sm:block lg:hidden">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
            {/* Tablet Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
              <div className="grid grid-cols-4 gap-3 font-semibold text-sm">
                <div className="text-center">Услуга</div>
                <div className="text-center">Дни / Время</div>
                <div className="text-center">Ед.</div>
                <div className="text-center">Цена</div>
              </div>
            </div>

            {/* Tablet Body */}
            <div className="divide-y divide-orange-100">
              {priceData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-4 gap-3 p-4 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 relative ${
                      item.popular
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : ""
                    }`}
                  >
                    {item.popular && (
                      <div className="absolute -top-1 left-4">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1">
                          ХИТ
                        </Badge>
                      </div>
                    )}

                    {/* Service */}
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-1 p-1.5 bg-orange-100 rounded-full">
                        <IconComponent className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-900 text-sm leading-tight">
                        {item.service}
                      </span>
                      <span className="text-xs text-gray-500">№{item.id}</span>
                    </div>

                    {/* Days & Time */}
                    <div className="flex flex-col items-center text-center space-y-1">
                      <span className="text-gray-700 font-medium text-sm leading-tight">
                        {item.days}
                      </span>
                      <div className="flex items-center bg-blue-50 px-2 py-1 rounded text-xs">
                        <Clock className="w-3 h-3 text-blue-600 mr-1" />
                        <span className="text-blue-700 font-medium">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Unit */}
                    <div className="flex items-center justify-center">
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium text-gray-700">
                        {item.unit}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <div className="text-xl font-bold text-gray-900">
                          {item.price}
                        </div>
                        <div className="text-xs text-gray-500">руб/час</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop View (lg+) */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
            {/* Desktop Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="grid grid-cols-6 gap-4 p-6 font-semibold text-base">
                <div className="text-center">№</div>
                <div className="text-center">Наименование услуги</div>
                <div className="text-center">Ед. изм.</div>
                <div className="text-center">Дни недели</div>
                <div className="text-center">Время</div>
                <div className="text-center">Цена, руб.</div>
              </div>
            </div>

            {/* Desktop Body */}
            <div className="divide-y divide-orange-100">
              {priceData.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    className={`grid grid-cols-6 gap-4 p-6 transition-all duration-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-25 group relative ${
                      item.popular
                        ? "bg-orange-50 border-l-4 border-orange-500"
                        : ""
                    }`}
                  >
                    {item.popular && (
                      <div className="absolute -top-2 left-6">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1">
                          ПОПУЛЯРНО
                        </Badge>
                      </div>
                    )}

                    {/* Row Number */}
                    <div className="flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform duration-300">
                        {item.id}
                      </div>
                    </div>

                    {/* Service Name */}
                    <div className="flex items-center justify-center text-center">
                      <div className="flex flex-col items-center">
                        <div className="mb-2 p-2 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors duration-300">
                          <IconComponent className="w-5 h-5 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          {item.service}
                        </span>
                      </div>
                    </div>

                    {/* Unit */}
                    <div className="flex items-center justify-center text-center">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 group-hover:bg-orange-100 group-hover:text-orange-700 transition-colors duration-300">
                        {item.unit}
                      </span>
                    </div>

                    {/* Days */}
                    <div className="flex items-center justify-center text-center">
                      <span className="text-gray-700 font-medium text-sm leading-tight">
                        {item.days}
                      </span>
                    </div>

                    {/* Time */}
                    <div className="flex items-center justify-center text-center">
                      <div className="flex items-center bg-blue-50 px-3 py-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-300">
                        <Clock className="w-4 h-4 text-blue-600 mr-2" />
                        <span className="text-blue-700 font-medium text-sm">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-center text-center">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {item.price}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                          руб/час
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Info - Адаптивный */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-orange-100 rounded-lg mr-3 flex-shrink-0">
                <Clock className="w-4 sm:w-5 h-4 sm:h-5 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Время работы
              </h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Минимальное время бронирования - 1 час
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-green-100 rounded-lg mr-3 flex-shrink-0">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Скидки
              </h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Специальные предложения для постоянных клиентов
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-3">
              <div className="p-2 bg-blue-100 rounded-lg mr-3 flex-shrink-0">
                <Phone className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                Бронирование
              </h3>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm">
              Предварительное бронирование по телефону
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
