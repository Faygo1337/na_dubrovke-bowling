"use client";

import { useState, lazy, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Phone, Clock } from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { ClubBookingModal } from "@/components/club-booking-modal";
import { AnimatedFractureText } from "@/components/animated-fracture-text";
import { motion } from "framer-motion";
import SiteHeader from "@/components/site-header";

// Lazy loading компонентов
const LazyGallery = lazy(() => import("@/components/club-gallery"));

export default function ClubHomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [poster, setPoster] = useState("");
  const delay = 3;

  useEffect(() => {
    const timerForStartVideo = setTimeout(() => {
      setIsVideoVisible(true);
    }, delay * 1000);
    if (!isVideoVisible) {
      return setPoster("/clubBar.webp");
    }
    return () => {
      clearTimeout(timerForStartVideo);
    };
  }, [delay]); // дописать (придумать, чтобы был таймаут для анимации и при это не триггерился постер перед видео)

  // useEffect(() => {
  //   const posterTimer = setTimeout(() => {
  //     if (!isVideoVisible) {
  //       setPoster("/clubBar.webp");
  //     }
  //   }, delay * 1500);

  //   return () => {
  //     clearTimeout(posterTimer);
  //   };
  // }, [delay]);

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <section className="relative h-screen flex items-center justify-center">
          {isVideoVisible ? (
            <video
              className="absolute inset-0 w-full h-full object-cover z-0"
              autoPlay={true}
              loop
              muted
              playsInline
              preload="auto"
              poster={poster}
            >
              <source
                src="https://zyboer4evcqe2k0o.public.blob.vercel-storage.com/video/clubBg.mp4"
                type="video/mp4"
              />
            </video>
          ) : (
            <></>
          )}

          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full z-20"
          >
            <SiteHeader />
          </motion.div>

          <div className="relative z-10 text-left max-w-6xl mx-auto px-4 flex flex-col items-start justify-center h-full">
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="flex flex-col text-[5rem] md:text-[8rem] lg:text-[12rem] font-black tracking-wider mb-16 leading-none"
              style={{ lineHeight: 1 }}
            >
              <span className="block">NA</span>
              <span className="block">DUBROVKE</span>
            </motion.h1>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
            >
              <AnimatedFractureText
                onClick={() => setIsBookingOpen(true)}
                style={{ fontSize: "2.5rem", width: "100%", maxWidth: "100%" }}
              >
                ЗАБРОНИРОВАТЬ
              </AnimatedFractureText>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-8 text-white/60 writing-mode-vertical text-sm tracking-widest z-10">
            SCROLL
          </div>
        </section>

        {/* Menu & Bar Section - точная копия второго скриншота */}
        <section id="menu" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
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
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Menu Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">
                        МЕНЮ
                      </h2>
                      <Button
                        variant="outline"
                        className="w-fit bg-black/50 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Bar Section */}
                <div id="bar" className="relative group overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: `url('/clubBar.webp')`,
                        backgroundPosition: "top",
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Bar Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">
                        БАР
                      </h2>
                      <Button
                        variant="outline"
                        className="w-fit bg-black/50 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                      >
                        <ExternalLink className="mr-2 w-4 h-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gray-900/50">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-16">
                  <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
                  <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">
                    О КЛУБЕ
                  </h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Na Dubrovke — это не просто ночной клуб, это культурное
                    пространство, где встречаются любители качественной музыки,
                    изысканных напитков и безупречного сервиса.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Prices Section */}
        <section id="prices" className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">
                  ЦЕНЫ ВХОДА
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedSection animation="fadeInLeft" delay={200}>
                  <div className="bg-gray-900/50 border border-gray-700 p-8 text-center backdrop-blur-sm">
                    <h3 className="text-2xl font-light mb-4">ПЯТНИЦА</h3>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-pink-400 mb-2">
                        15 BYN
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Девушки до 00:00
                      </p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">
                        25 BYN
                      </div>
                      <p className="text-gray-400 text-sm">Мужчины до 00:00</p>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-lg font-bold mb-1">+10 BYN</div>
                      <p className="text-gray-400 text-sm">После 00:00</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={300}>
                  <div className="bg-gray-900/50 border border-amber-400 p-8 text-center backdrop-blur-sm relative">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <span className="bg-amber-400 text-black px-4 py-1 text-sm font-bold">
                        ПОПУЛЯРНО
                      </span>
                    </div>
                    <h3 className="text-2xl font-light mb-4">СУББОТА</h3>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-pink-400 mb-2">
                        20 BYN
                      </div>
                      <p className="text-gray-400 text-sm mb-4">
                        Девушки до 00:00
                      </p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">
                        30 BYN
                      </div>
                      <p className="text-gray-400 text-sm">Мужчины до 00:00</p>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-lg font-bold mb-1">+10 BYN</div>
                      <p className="text-gray-400 text-sm">После 00:00</p>
                    </div>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInRight" delay={400}>
                  <div className="bg-gray-900/50 border border-gray-700 p-8 text-center backdrop-blur-sm">
                    <h3 className="text-2xl font-light mb-4">ВОСКРЕСЕНЬЕ</h3>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-pink-400 mb-2">
                        10 BYN
                      </div>
                      <p className="text-gray-400 text-sm mb-4">Девушки</p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">
                        15 BYN
                      </div>
                      <p className="text-gray-400 text-sm">Мужчины</p>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm text-gray-500">22:00 - 05:00</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-400 mb-2">
                  * Работаем с пятницы по воскресенье
                </p>
                <p className="text-gray-400 mb-2">
                  * VIP столы бронируются отдельно
                </p>
                <p className="text-gray-400">* Дресс-код: smart casual</p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gallery Section with Lazy Loading */}
        <section id="gallery" className="py-24 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">
                  ИНТЕРЬЕР
                </h2>
              </div>

              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-video bg-gray-800 animate-pulse rounded-lg"
                      ></div>
                    ))}
                  </div>
                }
              >
                <LazyGallery />
              </Suspense>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">
                  КОНТАКТЫ
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
                <AnimatedSection animation="fadeInLeft" delay={200}>
                  <div>
                    <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">АДРЕС</h3>
                    <p className="text-gray-400">
                      ул. Дубровская, 15
                      <br />
                      Могилев, Беларусь
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={400}>
                  <div>
                    <Phone className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">ТЕЛЕФОН</h3>
                    <p className="text-gray-400">+375 (29) 123-45-67</p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInRight" delay={600}>
                  <div>
                    <Clock className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">РЕЖИМ РАБОТЫ</h3>
                    <p className="text-gray-400">Пт-Вс: 22:00 - 05:00</p>
                  </div>
                </AnimatedSection>
              </div>

              <div className="text-center mt-16">
                <AnimatedFractureText
                  onClick={() => setIsBookingOpen(true)}
                  style={{
                    fontSize: "2.5rem",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  ЗАБРОНИРОВАТЬ
                </AnimatedFractureText>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      <ClubBookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  );
}
