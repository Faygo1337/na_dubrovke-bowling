"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
import { Home, X } from "lucide-react";

interface MobileNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigationModal({
  isOpen,
  onClose,
}: MobileNavigationModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full h-full bg-black/40 backdrop-blur-lg text-black transition-all duration-700 ease-out overflow-y-auto ${
          isAnimating ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Header - Fixed */}
        <div
          className={`sticky top-0 z-10 bg-black/70 backdrop-blur-lg border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-all duration-700 delay-200 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={onClose}
            className="text-slate-700 hover:text-white transition-colors p-2 -ml-2"
          >
            <Home color="white" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-sm sm:text-base lg:text-lg font-black tracking-[0.2em] sm:tracking-[0.3em] text-center text-white drop-shadow-md">
            НАВИГАЦИЯ
          </h1>

          <button
            onClick={onClose}
            className="text-slate-700 hover:text-white transition-colors p-2 -mr-2"
          >
            <X color="white" className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content - Navigation */}
        <div
          className={`flex flex-col items-center justify-center gap-6 py-12 px-4 sm:px-0 transition-all duration-700 delay-300 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <Link href="/bowling" onClick={onClose} className="w-full max-w-xs">
            <button className="w-full py-3 text-lg mobile-menu-button">
              БОУЛИНГ
            </button>
          </Link>

          <Link href="/club" onClick={onClose} className="w-full max-w-xs">
            <button className="w-full py-3 text-lg mobile-menu-button">
              КЛУБ
            </button>
          </Link>

          <Link href="/karaoke" onClick={onClose} className="w-full max-w-xs">
            <button className="w-full py-3 text-lg mobile-menu-button">
              КАРАОКЕ
            </button>
          </Link>

          <Link href="/banquet" onClick={onClose} className="w-full max-w-xs">
            <button className="w-full py-3 text-lg mobile-menu-button">
              БАНКЕТНЫЙ ЗАЛ
            </button>
          </Link>

          <Link href="/food" onClick={onClose} className="w-full max-w-xs">
            <button className="w-full py-3 text-lg mobile-menu-button">
              ЗАКАЗ ЕДЫ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
