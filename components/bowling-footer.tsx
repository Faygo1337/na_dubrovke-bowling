"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react"
import { BowlingBookingModal } from "@/components/bowling-booking-modal"
import Image from "next/image"
export default function BowlingFooter() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <footer className="bg-slate-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Image src="/Logo.webp" alt="Logo" width={100} height={100} />
              </div>
              <p className="text-gray-300 text-sm">
                Лучший боулинг-клуб в Могилеве. Современные дорожки, вкусная кухня и незабываемые впечатления для всей
                семьи.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Быстрые ссылки</h3>
              <div className="space-y-2">
                <Link href="/bowling" className="block text-gray-300 hover:text-orange-400 transition-colors">
                  Главная
                </Link>
                <Link href="/bowling#menu" className="block text-gray-300 hover:text-orange-400 transition-colors">
                  Меню
                </Link>
                <Link href="/bowling#prices" className="block text-gray-300 hover:text-orange-400 transition-colors">
                  Цены
                </Link>
                <button 
                  onClick={() => setIsBookingOpen(true)}
                  className="block text-gray-300 hover:text-orange-400 transition-colors text-left w-full"
                >
                  Бронирование
                </button>
                <Link href="/bowling/events" className="block text-gray-300 hover:text-orange-400 transition-colors">
                  События
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Контакты</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">ул. Дубровская, 15, Могилев</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">+375 (29) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span className="text-sm">info@nadubrovke.by</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
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
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Na Dubrovke Bowling Club. Все права защищены.</p>
          </div>
        </div>
      </footer>
      <BowlingBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
