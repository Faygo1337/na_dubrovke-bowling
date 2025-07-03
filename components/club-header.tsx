"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Phone } from "lucide-react"
import { ClubBookingModal } from "@/components/club-booking-modal"

export default function ClubHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <header className="bg-black/80 backdrop-blur-md text-white sticky top-0 z-50 border-b border-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/club" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center font-bold text-xl">
                ND
              </div>
              <div>
                <div className="font-bold text-xl">Na Dubrovke</div>
                <div className="text-sm text-purple-400">Night Club</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/club#menu" className="hover:text-amber-400 transition-colors">
                Меню
              </Link>
              <Link href="/club#bar" className="hover:text-amber-400 transition-colors">
                Бар
              </Link>
              <Link href="/club#gallery" className="hover:text-amber-400 transition-colors">
                Интерьер
              </Link>
              <Link href="/club#prices" className="hover:text-amber-400 transition-colors">
                Цена входа
              </Link>
              <Link
                href="/bowling"
                className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
              >
                Боулинг
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+375 (29) 123-45-67</span>
              </div>
              <Button
                onClick={() => setIsBookingOpen(true)}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                Забронировать стол
              </Button>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black text-white border-gray-800">
                <div className="flex flex-col space-y-6 mt-8">
                  <Link
                    href="/club#menu"
                    className="text-lg hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Меню
                  </Link>
                  <Link
                    href="/club#bar"
                    className="text-lg hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Бар
                  </Link>
                  <Link
                    href="/club#gallery"
                    className="text-lg hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Интерьер
                  </Link>
                  <Link
                    href="/club#prices"
                    className="text-lg hover:text-purple-400 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Цена входа
                  </Link>
                  <Link
                    href="/bowling"
                    className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Боулинг
                  </Link>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2 text-sm mb-4">
                      <Phone className="w-4 h-4" />
                      <span>+375 (29) 123-45-67</span>
                    </div>
                    <Button
                      onClick={() => {
                        setIsOpen(false)
                        setIsBookingOpen(true)
                      }}
                      className="bg-amber-500 hover:bg-amber-600 text-black font-semibold w-full"
                    >
                      Забронировать стол
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Booking Modal */}
      <ClubBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
