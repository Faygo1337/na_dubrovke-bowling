"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [linkPositions, setLinkPositions] = useState<
    { x: number; width: number }[]
  >([]);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const navigationItems = [
    { href: "/", label: "Главная" },
    { href: "/bowling", label: "Боулинг" },
    { href: "/club", label: "Клуб" },
    { href: "/karaoke", label: "Караоке" },
    { href: "/banquet", label: "Банкеты" },
    { href: "/delivery", label: "Доставка" },
    { href: "/promotions", label: "Акции" },
  ];

  const updateLinkPositions = useCallback(() => {
    if (navRef.current) {
      const positions = linkRefs.current.map((link) => {
        if (link) {
          const rect = link.getBoundingClientRect();
          const navRect = navRef.current!.getBoundingClientRect();
          return {
            x: rect.left - navRect.left,
            width: rect.width,
          };
        }
        return { x: 0, width: 100 };
      });
      setLinkPositions(positions);
    }
  }, []);

  useEffect(() => {
    setIsLoading(false);
    const currentIndex = navigationItems.findIndex(
      (item) => item.href === pathname
    );
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);

    // Обновляем позиции при изменении активной страницы
    setTimeout(() => {
      updateLinkPositions();
    }, 50);
  }, [pathname, updateLinkPositions]);

  useEffect(() => {
    // Небольшая задержка для корректного расчета позиций после рендера
    const timer = setTimeout(() => {
      updateLinkPositions();
    }, 100);

    window.addEventListener("resize", updateLinkPositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLinkPositions);
    };
  }, [updateLinkPositions]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const currentPosition = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const currentLink = linkPositions[currentPosition] || { x: 0, width: 100 };

  // Показываем загрузчик пока определяется активная страница
  if (isLoading) {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.15, delay: 0.05, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-black/40 backdrop-blur-md text-white border-b border-gray-800/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
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
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
              ref={navRef}
              className="!hidden lg:!flex items-center relative header-nav-container "
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.05 }}
            >
              {/* Animated Background */}
              <motion.div
                className="header-nav-highlight"
                initial={false}
                animate={{
                  x: currentLink.x - 13,
                  width: currentLink.width,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
              />

              {navigationItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  ref={(el) => {
                    linkRefs.current[index] = el;
                  }}
                  className="header-nav-item"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
            <motion.div
              className="hidden lg:flex items-center space-x-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.1, delay: 0.1 }}
            >
              <Phone className="w-4 h-4" />
              <span>+375 (29) 186-78-25</span>
            </motion.div>

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
