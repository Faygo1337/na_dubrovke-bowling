"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";
import Image from "next/image";
import { MobileNavigationModal } from "@/components/MobileNavigationModal";
import { motion } from "framer-motion";

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Показываем загрузчик пока определяется активная страница
  if (isLoading) {
    return;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-md text-white border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 lg:h-20">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-24 h-12 sm:w-32 sm:h-16 md:w-36 md:h-20 lg:w-40 lg:h-24">
                <Image
                  src="/LogoClubBowling.webp"
                  alt="Logo"
                  fill
                  priority={true}
                  sizes="(max-width: 640px) 96px, (max-width: 1024px) 128px, 160px"
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link
                href="/"
                className={`header-link${
                  pathname === "/" ? " header-link--active" : ""
                }`}
              >
                Главная
              </Link>
              <Link
                href="/bowling"
                className={`header-link${
                  pathname === "/bowling" ? " header-link--active" : ""
                }`}
              >
                Боулинг
              </Link>
              <Link
                href="/club"
                className={`header-link${
                  pathname === "/club" ? " header-link--active" : ""
                }`}
              >
                Клуб
              </Link>
              <Link
                href="/karaoke"
                className={`header-link${
                  pathname === "/karaoke" ? " header-link--active" : ""
                }`}
              >
                Караоке
              </Link>
              <Link
                href="/banquet"
                className={`header-link${
                  pathname === "/banquet" ? " header-link--active" : ""
                }`}
              >
                Банкеты
              </Link>
              <Link
                href="/delivery"
                className={`header-link${
                  pathname === "/delivery" ? " header-link--active" : ""
                }`}
              >
                Доставка
              </Link>
              <Link
                href="/promotions"
                className={`header-link${
                  pathname === "/promotions" ? " header-link--active" : ""
                }`}
              >
                Акции
              </Link>
            </nav>

            {/* Контакты и бронирование */}
            <div className="hidden lg:flex items-center space-x-4">
              <Phone className="w-4 h-4" />
              <span>+375 (29) 186-78-25</span>
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
    </>
  );
}
