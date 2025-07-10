"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Trophy,
  Phone,
  Utensils,
  Wine,
  Users,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { BowlingBookingModal } from "@/components/bowling-booking-modal";

export default function BowlingHomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[690px] bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('/bowlingMain.webp')`,
          }}
        ></div>
        <div className="container mx-auto pt-24 px-4 pb-16 relative z-10">
          <div className="max-w-3xl text-white">
            <Badge className="bg-orange-500 text-white mb-4">
              Лучший боулинг в Могилеве
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Na Dubrovke
              <span className="block text-orange-400">Bowling Club</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Современный боулинг-клуб с 8 профессиональными дорожками,
              рестораном и баром. Идеальное место для отдыха с друзьями и
              семьей.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4"
                onClick={() => setIsBookingOpen(true)}
              >
                Забронировать дорожку
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-slate-900 bg-transparent"
              >
                <Link href="#about">Узнать больше</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">8 Дорожек</h3>
                <p className="text-gray-600">
                  Современные профессиональные дорожки Brunswick
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Utensils className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">Ресторан</h3>
                <p className="text-gray-600">
                  Вкусная европейская и белорусская кухня
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Wine className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">Бар</h3>
                <p className="text-gray-600">
                  Широкий выбор напитков и коктейлей
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">События</h3>
                <p className="text-gray-600">
                  Турниры, корпоративы и дни рождения
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Menu & Bar Section */}
      <section id="menu" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500 text-white mb-4">Меню и Бар</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Ресторан и Бар Na Dubrovke
            </h2>
            <p className="text-xl text-gray-600">
              Вкусная еда и напитки прямо к вашей дорожке
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto">
            {/* Menu Section */}
            <div className="relative group overflow-hidden">
              <div className="aspect-[4/3] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('/bowlingMenu.webp')`,
                    backgroundPosition: "top",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

                {/* Menu Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">
                    МЕНЮ
                  </h2>
                  <Button
                    variant="outline"
                    className="w-fit bg-black/50 border-white/30 text-white hover:bg-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Bar Section */}
            <div className="relative group overflow-hidden">
              <div className="aspect-[4/3] relative">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('/bowlingBar.webp')`,
                    backgroundPosition: "top",
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500"></div>

                {/* Bar Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">
                    БАР
                  </h2>
                  <Button
                    variant="outline"
                    className="w-fit bg-black/50 border-white/30 text-white hover:bg-orange-500 hover:text-white transition-all duration-300 backdrop-blur-sm"
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section id="prices" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500 text-white mb-4">Цены</Badge>
            <h2 className="text-4xl font-bold mb-4">Стоимость игры</h2>
            <p className="text-xl text-gray-600">
              Доступные цены для всей семьи
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-gray-200 hover:border-orange-500 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">БУДНИ</h3>
                <div className="text-sm text-gray-600 mb-2">
                  Понедельник - Четверг
                </div>
                <div className="text-4xl font-bold text-orange-500 mb-4">
                  25 BYN
                </div>
                <p className="text-gray-600 mb-4">за дорожку в час</p>
                <div className="space-y-2 text-sm">
                  <div>12:00 - 18:00</div>
                  <div className="text-orange-500 font-semibold">
                    20 BYN после 18:00
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-orange-500 text-white px-4 py-1">
                  ПОПУЛЯРНО
                </Badge>
              </div>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">ПЯТНИЦА</h3>
                <div className="text-sm text-gray-600 mb-2">Пятница</div>
                <div className="text-4xl font-bold text-orange-500 mb-4">
                  35 BYN
                </div>
                <p className="text-gray-600 mb-4">за дорожку в час</p>
                <div className="space-y-2 text-sm">
                  <div>12:00 - 18:00</div>
                  <div className="text-orange-500 font-semibold">
                    40 BYN после 18:00
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 hover:border-orange-500 transition-colors">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">ВЫХОДНЫЕ</h3>
                <div className="text-sm text-gray-600 mb-2">
                  Суббота - Воскресенье
                </div>
                <div className="text-4xl font-bold text-orange-500 mb-4">
                  40 BYN
                </div>
                <p className="text-gray-600 mb-4">за дорожку в час</p>
                <div className="space-y-2 text-sm">
                  <div>Весь день</div>
                  <div className="text-gray-500">Единая цена</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500 text-white mb-4">Галерея</Badge>
            <h2 className="text-4xl font-bold mb-4">Наш боулинг-клуб</h2>
            <p className="text-xl text-gray-600">
              Современные дорожки и уютная атмосфера
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative group overflow-hidden rounded-lg"
              >
                <Image
                  src={`/bowlingGallery${i}.webp`}
                  alt={`Боулинг дорожка ${i}`}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h4 className="text-lg font-semibold mb-2">Дорожка {i}</h4>
                    <p className="text-sm">
                      Профессиональное оборудование Brunswick
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-orange-500 text-white mb-4">Контакты</Badge>
            <h2 className="text-4xl font-bold mb-4">Как нас найти</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <MapPin className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">АДРЕС</h3>
              <p className="text-gray-600">
                Проспект Мира, 21А
                <br />
                Могилев, Беларусь
              </p>
            </div>

            <div>
              <Phone className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ТЕЛЕФОН</h3>
              <p className="text-gray-600">+375 (29) 123-45-67</p>
            </div>

            <div>
              <Clock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">РЕЖИМ РАБОТЫ</h3>
              <p className="text-gray-600">
                Пн-Чт: 17:00 - 00:00
                <br />
                Пт: 17:00 - 02:00
                <br />
                Сб: 12:00 - 05:00
                <br />
                Вс: 12:00 - 00:00
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Готовы к игре?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Забронируйте дорожку прямо сейчас и получите незабываемые
            впечатления от игры в боулинг!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-4"
              onClick={() => setIsBookingOpen(true)}
            >
              <Trophy className="mr-2 w-5 h-5" />
              Забронировать дорожку
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-500 text-lg px-8 py-4 bg-transparent"
            >
              <Link href="tel:+375291234567" className="flex items-center">
                <Phone className="mr-2 w-5 h-5" />
                +375 (29) 123-45-67
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <a
          href="https://yandex.by/maps/158/mogilev/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "0px",
          }}
        >
          Могилёв
        </a>
        <a
          href="https://yandex.by/maps/158/mogilev/house/Z0kYdQVnSUEEQFtpfXVxeHpkbA==/?ll=30.327043%2C53.909678&utm_medium=mapframe&utm_source=maps&z=17.28"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "14px",
          }}
        >
          Проспект Мира, 21А — Яндекс Карты
        </a>
        <iframe
          src="https://yandex.by/map-widget/v1/?ll=30.327043%2C53.909678&mode=search&ol=geo&ouri=ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxNTkyNjIwOTMyEkHQkdC10LvQsNGA0YPRgdGMLCDQnNCw0LPRltC70ZHRniwg0L_RgNCw0YHQv9C10LrRgiDQnNGW0YDRgywgMjHQkCIKDced8kEVg6NXQg%2C%2C&z=17.28"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen={true}
          style={{ position: "relative" }}
        ></iframe>
      </div>

      {/* BowlingBookingModal */}
      <BowlingBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
