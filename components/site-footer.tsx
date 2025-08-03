import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Music,
} from "lucide-react";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <a
          href="https://yandex.by/maps/org/na_dubrovke/1052699670/?utm_medium=mapframe&utm_source=maps"
          style={{
            color: "#eee",
            fontSize: "12px",
            position: "absolute",
            top: "0px",
          }}
        >
          На Дубровке
        </a>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <a
            href="https://yandex.by/maps/158/mogilev/category/bowling/184106360/?utm_medium=mapframe&utm_source=maps"
            style={{
              width: "100%",
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "14px",
            }}
          >
            Боулинг-клуб в Могилёве
          </a>
          <a
            href="https://yandex.by/maps/158/mogilev/category/restaurant/184106394/?utm_medium=mapframe&utm_source=maps"
            style={{
              width: "100%",
              color: "#eee",
              fontSize: "12px",
              position: "absolute",
              top: "28px",
            }}
          >
            Ресторан в Могилёве
          </a>
          <iframe
            src="https://yandex.by/map-widget/v1/org/na_dubrovke/1052699670/?ll=30.326944%2C53.909904&z=14"
            width="100%"
            height="400"
            // frameBorder="1"
            allowFullScreen={true}
            style={{ position: "relative" }}
          />
        </div>
      </div>
      <footer className="bg-black text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image src="/Logo.webp" alt="Logo" width={48} height={48} />
                <div>
                  <div className="font-bold text-xl">Na Dubrovke</div>
                  <div className="text-sm text-purple-400">
                    Bowling & Night Club
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Лучший боулинг и ночной клуб в Могилеве. Проффесиональные
                дорожки, стильный интерьер, вкусная кухня и незабываемые
                впечатления для всей семьи и друзей.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Быстрые ссылки</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  className="block text-gray-300 hover:text-amber-400 transition-colors"
                >
                  Главная
                </Link>
                <Link
                  href="/bowling"
                  className="block text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Боулинг
                </Link>
                <Link
                  href="/bowling#menu"
                  className="block text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Меню Боулинг
                </Link>
                <Link
                  href="/bowling#prices"
                  className="block text-gray-300 hover:text-orange-400 transition-colors"
                >
                  Цены Боулинг
                </Link>
                <Link
                  href="/bowling/events"
                  className="block text-gray-300 hover:text-orange-400 transition-colors"
                >
                  События Боулинг
                </Link>
                <Link
                  href="/club"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Клуб
                </Link>
                <Link
                  href="/club#menu"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Меню клуба
                </Link>
                <Link
                  href="/club#bar"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Бар
                </Link>
                <Link
                  href="/club#prices"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  Цены входа
                </Link>
                <Link
                  href="/club/events"
                  className="block text-gray-300 hover:text-purple-400 transition-colors"
                >
                  События клуба
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Контакты</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">Проспект Мира, 21А, Могилев</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <p className="text-sm">
                    <Link href="tel:+375291867825">
                      <span>+375 (29) 186-78-25</span>
                    </Link>

                    <br />
                    <Link href="tel:+375222628562">
                      <span>+375 (222) 62-85-62</span>
                    </Link>
                    <br />
                    <Link href="tel:+375222633918">
                      <span>+375 (222) 63-39-18</span>
                    </Link>
                  </p>
                  <span className="text-sm"></span>
                  <span className="text-sm"></span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <Link href={"mailto:nadubrovke1@gmail.com"}>
                    nadubrovke1@gmail.com
                  </Link>
                  {/* <span className="text-sm"></span> */}
                </div>
              </div>
            </div>

            {/* Working Hours & Socials */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Режим работы</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <div className="text-sm">
                    <div>Пн-Чт: 17:00 - 00:00</div>
                    <div>Пт: 17:00 - 02:00</div>
                    <div>Сб: 12:00 - 05:00</div>
                    <div>Вс: 12:00 - 00:00</div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 mt-4">
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Music className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Na Dubrovke. Все права защищены. 18+</p>
          </div>
        </div>
      </footer>
    </>
  );
}
