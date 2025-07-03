"use client"

import { useState, lazy, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink, MapPin, Phone, Clock } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { ClubBookingModal } from "@/components/club-booking-modal"

// Lazy loading компонентов
const LazyGallery = lazy(() => import("@/components/club-gallery"))

export default function ClubHomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* Hero Section - точная копия скриншота */}
        <section className="relative h-screen flex items-center justify-center">
          {/* Background with blue light effects */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900"></div>
            <div className="absolute inset-0 bg-black/60"></div>
          </div>

          {/* Floating blue light effects */}
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-cyan-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-400/15 rounded-full blur-xl animate-pulse delay-3000"></div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
            <AnimatedSection animation="fadeInUp" delay={300}>
              <p className="text-lg md:text-xl font-light tracking-widest mb-8 text-gray-300">
                ПРЕМИАЛЬНАЯ СЕТЬ МУЖСКИХ ШОУ-КЛУБОВ
              </p>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={600}>
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-wider mb-16 leading-none">
                <span className="block">NA</span>
                <span className="block text-amber-400">DUBROVKE</span>
              </h1>
            </AnimatedSection>

            <AnimatedSection animation="fadeInUp" delay={900}>
              <Button
                onClick={() => setIsBookingOpen(true)}
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                <ArrowRight className="mr-2 w-6 h-6" />
                ПОСЕТИТЬ КЛУБ
              </Button>
            </AnimatedSection>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 right-8 text-white/60 writing-mode-vertical text-sm tracking-widest">
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
                        backgroundPosition: 'top'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Menu Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">МЕНЮ</h2>
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
                        backgroundPosition: 'top'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

                    {/* Bar Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                      <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-wider">БАР</h2>
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
                  <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">О КЛУБЕ</h2>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    Na Dubrovke — это не просто ночной клуб, это культурное пространство, где встречаются любители
                    качественной музыки, изысканных напитков и безупречного сервиса.
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
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">ЦЕНЫ ВХОДА</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <AnimatedSection animation="fadeInLeft" delay={200}>
                  <div className="bg-gray-900/50 border border-gray-700 p-8 text-center backdrop-blur-sm">
                    <h3 className="text-2xl font-light mb-4">ПЯТНИЦА</h3>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-pink-400 mb-2">15 BYN</div>
                      <p className="text-gray-400 text-sm mb-4">Девушки до 00:00</p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">25 BYN</div>
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
                      <span className="bg-amber-400 text-black px-4 py-1 text-sm font-bold">ПОПУЛЯРНО</span>
                    </div>
                    <h3 className="text-2xl font-light mb-4">СУББОТА</h3>
                    <div className="mb-6">
                      <div className="text-2xl font-bold text-pink-400 mb-2">20 BYN</div>
                      <p className="text-gray-400 text-sm mb-4">Девушки до 00:00</p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">30 BYN</div>
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
                      <div className="text-2xl font-bold text-pink-400 mb-2">10 BYN</div>
                      <p className="text-gray-400 text-sm mb-4">Девушки</p>
                      <div className="text-2xl font-bold text-blue-400 mb-2">15 BYN</div>
                      <p className="text-gray-400 text-sm">Мужчины</p>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="text-sm text-gray-500">22:00 - 05:00</div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              <div className="text-center mt-12">
                <p className="text-gray-400 mb-2">* Работаем с пятницы по воскресенье</p>
                <p className="text-gray-400 mb-2">* VIP столы бронируются отдельно</p>
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
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">ИНТЕРЬЕР</h2>
              </div>

              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-video bg-gray-800 animate-pulse rounded-lg"></div>
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
                <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">КОНТАКТЫ</h2>
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
                <Button
                  onClick={() => setIsBookingOpen(true)}
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:scale-105"
                >
                  ЗАБРОНИРОВАТЬ СТОЛ
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      <ClubBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}
