"use client";

import { useState, lazy, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Calendar,
  Users,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { ClubBookingModal } from "@/components/club-booking-modal";
import { AnimatedFractureText } from "@/components/animated-fracture-text";
import { motion } from "framer-motion";
import { isMobile } from "react-device-detect";
import Link from "next/link";
import SliderText from "@/components/SliderText";
const LazyGallery = lazy(() => import("@/components/club-gallery"));

export default function ClubHomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const [videoSrcMp4, setVideoSrcMp4] = useState<string>("");

  useEffect(() => {
    if (isMobile) {
      setVideoSrcMp4(
        "https://12ormbedoelpdllo.public.blob.vercel-storage.com/mainClubBgMobile1.mp4"
      );
    } else {
      setVideoSrc(
        "https://12ormbedoelpdllo.public.blob.vercel-storage.com/mainBgClub.webm"
      );
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <section className="relative h-screen flex items-center justify-center">
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          >
            {videoSrc && <source src={videoSrc} type="video/webm" />}
            {videoSrcMp4 && <source src={videoSrcMp4} type="video/mp4" />}
            Ваш браузер не поддерживает видео.
          </video>
          <div className="relative z-10 text-left max-w-6xl mx-auto px-4 flex flex-col items-start justify-center h-full">
            <motion.h1
              initial={{ x: -200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="flex flex-col text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[9rem] 2xl:text-[12rem] font-black tracking-wider mb-16 leading-none"
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
                style={{
                  fontSize: "clamp(1.2rem, 3.5vw, 2.5rem)",
                  width: "100%",
                  maxWidth: "100%",
                }}
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

        <SliderText />

        {/* Menu & Bar Section - точная копия второго скриншота */}
        <section id="menu" className="pb-24 bg-black">
          <div className="text-center mb-12"></div>
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
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-wider">
                        МЕНЮ
                      </h2>
                      <Link href="https://12ormbedoelpdllo.public.blob.vercel-storage.com/MenuNaDubrovke.pdf">
                        <Button
                          variant="outline"
                          className="w-fit bg-black/50 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        >
                          <ExternalLink className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                          PDF
                        </Button>
                      </Link>
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
                    <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-12">
                      <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white mb-4 sm:mb-6 md:mb-8 tracking-wider">
                        БАР
                      </h2>
                      <Link
                        href={
                          "https://12ormbedoelpdllo.public.blob.vercel-storage.com/BarNaDubrovke.pdf"
                        }
                      >
                        <Button
                          variant="outline"
                          className="w-fit bg-black/50 border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
                        >
                          <ExternalLink className="mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                          PDF
                        </Button>
                      </Link>
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
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-wide">
                    О КЛУБЕ
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
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
              <div className="text-center mb-12 sm:mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-6 sm:mb-8"></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-wide">
                  ЦЕНЫ ВХОДА
                </h2>
              </div>

              <div className="max-w-6xl mx-auto">
                {/* Main Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* Before Midnight Card */}
                  <AnimatedSection animation="fadeInLeft" delay={200}>
                    <div className="bg-gray-900/50 border border-amber-400/30 p-8 backdrop-blur-sm relative group hover:border-amber-400/50 transition-all duration-500">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-amber-400 text-black px-6 py-2 text-sm font-bold tracking-wider">
                          ДО 00:00
                        </span>
                      </div>

                      <div className="text-center pt-4">
                        <div className="flex justify-center items-center gap-8 mb-8">
                          {/* Female Price */}
                          <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-pink-400 mb-2 tracking-wider">
                              10 BYN
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">
                              Женский
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-px h-16 bg-amber-400/30"></div>

                          {/* Male Price */}
                          <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2 tracking-wider">
                              15 BYN
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">
                              Мужской
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* After Midnight Card */}
                  <AnimatedSection animation="fadeInRight" delay={400}>
                    <div className="bg-gray-900/50 border border-amber-400/30 p-8 backdrop-blur-sm relative group hover:border-amber-400/50 transition-all duration-500">
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-amber-400 text-black px-6 py-2 text-sm font-bold tracking-wider">
                          ПОСЛЕ 00:00
                        </span>
                      </div>

                      <div className="text-center pt-4">
                        <div className="flex justify-center items-center gap-8 mb-8">
                          {/* Female Price */}
                          <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-pink-400 mb-2 tracking-wider">
                              15 BYN
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">
                              Женский
                            </div>
                          </div>

                          {/* Divider */}
                          <div className="w-px h-16 bg-amber-400/30"></div>

                          {/* Male Price */}
                          <div className="text-center">
                            <div className="text-4xl md:text-5xl font-black text-blue-400 mb-2 tracking-wider">
                              20 BYN
                            </div>
                            <div className="text-gray-400 text-sm uppercase tracking-wider">
                              Мужской
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Additional Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <AnimatedSection animation="fadeInUp" delay={600}>
                    <div className="bg-gray-900/30 border border-gray-700/50 p-6 text-center backdrop-blur-sm">
                      <Calendar className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                        Рабочие дни
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Пятница - Воскресенье
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeInUp" delay={700}>
                    <div className="bg-gray-900/30 border border-gray-700/50 p-6 text-center backdrop-blur-sm">
                      <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                        VIP столы
                      </h3>
                      <p className="text-gray-400 text-sm">
                        Бронируются отдельно
                      </p>
                    </div>
                  </AnimatedSection>

                  <AnimatedSection animation="fadeInUp" delay={800}>
                    <div className="bg-gray-900/30 border border-gray-700/50 p-6 text-center backdrop-blur-sm">
                      <Users className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2 uppercase tracking-wider">
                        Дресс-код
                      </h3>
                      <p className="text-gray-400 text-sm">Smart casual</p>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Call to Action */}
                <AnimatedSection animation="fadeInUp" delay={900}>
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsBookingOpen(true)}
                      className="bg-amber-400 text-black font-bold py-4 px-12 rounded-none text-lg tracking-wider hover:bg-amber-300 transition-all duration-300 uppercase"
                    >
                      Забронировать столик
                    </motion.button>
                  </div>
                </AnimatedSection>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Gallery Section with Lazy Loading */}
        <section id="gallery" className="py-24 bg-gray-900/30">
          <div className="container mx-auto px-4">
            <AnimatedSection animation="fadeInUp">
              <div className="text-center mb-12 sm:mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-6 sm:mb-8"></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-wide">
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
              <div className="text-center mb-12 sm:mb-16">
                <div className="w-24 h-px bg-amber-400 mx-auto mb-6 sm:mb-8"></div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 sm:mb-8 tracking-wide">
                  КОНТАКТЫ
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto text-center">
                <AnimatedSection animation="fadeInLeft" delay={200}>
                  <div>
                    <MapPin className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">АДРЕС</h3>
                    <p className="text-gray-400">
                      Пр. Мира, 23
                      <br />
                      Могилев, Беларусь
                    </p>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeInUp" delay={400}>
                  <div>
                    <Phone className="w-8 h-8 text-amber-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">ТЕЛЕФОН</h3>
                    <Link href={"tel:+375291867825"}></Link>
                    <p className="text-gray-400">+375 (29) 186-78-25</p>
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
                    fontSize: "clamp(1.2rem, 3.5vw, 2.5rem)",
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
