"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";
import { BowlingBookingModal } from "@/components/bowling-booking-modal";
import { ClubBookingModal } from "@/components/club-booking-modal";
import { MobileNavigationModal } from "@/components/MobileNavigationModal";
import { motion } from "framer-motion";
export default function SiteHeader() {
  const pathname = usePathname();
  const [isBowlingBooking, setBowlingBooking] = useState(false);
  const [isClubBooking, setClubBooking] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isBowling = pathname.startsWith("/bowling");
  const isClub = pathname.startsWith("/club");
  const isHome = !isBowling && !isClub;

  const handleBooking = () => {
    if (isBowling) setBowlingBooking(true);
    else if (isClub) setClubBooking(true);
    else setBowlingBooking(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md text-white border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/Logo.webp"
                alt="Logo"
                width={48}
                height={48}
                priority={true}
              />
              <span className="font-bold text-xl hidden sm:inline">
                Na Dubrovke
              </span>
            </Link>
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={
                  isHome
                    ? "text-amber-400 font-bold"
                    : "hover:text-amber-400 transition-colors"
                }
              >
                Главная
              </Link>
              <Link
                href="/bowling"
                className={
                  isBowling
                    ? "text-orange-400 font-bold"
                    : "hover:text-orange-400 transition-colors"
                }
              >
                Боулинг
              </Link>
              <Link
                href="/club"
                className={
                  isClub
                    ? "text-purple-400 font-bold"
                    : "hover:text-purple-400 transition-colors"
                }
              >
                Клуб
              </Link>
            </nav>
            {/* Контакты и бронирование */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span>+375 (29) 123-45-67</span>
              </div>
              <Button
                onClick={handleBooking}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                Забронировать
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Открыть мобильное меню"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </motion.header>
      <MobileNavigationModal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      {/* Booking Modals */}
      <BowlingBookingModal
        isOpen={isBowlingBooking}
        onClose={() => setBowlingBooking(false)}
      />
      <ClubBookingModal
        isOpen={isClubBooking}
        onClose={() => setClubBooking(false)}
      />
    </>
  );
}
