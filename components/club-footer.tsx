import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Music } from "lucide-react"

export default function ClubFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl">
                ND
              </div>
              <div>
                <div className="font-bold text-xl">Na Dubrovke</div>
                <div className="text-sm text-purple-400">Night Club</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Премиальный ночной клуб в центре Могилева. Стильный интерьер, качественная музыка и незабываемые
              вечеринки.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Быстрые ссылки</h3>
            <div className="space-y-2">
              <Link href="/club" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Главная
              </Link>
              <Link href="/club#menu" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Меню
              </Link>
              <Link href="/club#bar" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Бар
              </Link>
              <Link href="/club#prices" className="block text-gray-300 hover:text-purple-400 transition-colors">
                Цены входа
              </Link>
              <Link href="/club/events" className="block text-gray-300 hover:text-purple-400 transition-colors">
                События
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контакты</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-sm">ул. Дубровская, 15, Могилев</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4 text-purple-400" />
                <span className="text-sm">+375 (29) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="text-sm">club@nadubrovke.by</span>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Режим работы</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="w-4 h-4 text-purple-400" />
                <div className="text-sm">
                  <div>Чт-Сб: 22:00 - 06:00</div>
                  <div>Вс: 20:00 - 02:00</div>
                  <div className="text-gray-500">Пн-Ср: Закрыто</div>
                </div>
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-purple-400 transition-colors">
                <Music className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Na Dubrovke Night Club. Все права защищены. 18+</p>
        </div>
      </div>
    </footer>
  )
}
