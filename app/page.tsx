"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import SliderBackground from "@/components/SliderMainBg";
import GlassButton from "@/components/ui/GlassButton";
import Link from "next/link";
export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/bowlingGallery6.webp",
      title: "Современный боулинг",
    },
    {
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Бильярдный зал",
    },
    {
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Караоке-кабины",
    },
    {
      image:
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "Ресторанный зал",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Приветственный блок */}
      <section className="relative flex flex-col items-center justify-center min-h-[100vh] bg-transparent text-white py-12 md:py-20 px-2 sm:px-4 text-center overflow-hidden">
        {/* Фоновый слайдер */}
        <SliderBackground />

        <div className="relative mt-8 z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h1
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black mb-4 sm:mb-8 font-['Dela Gothic One',_sans-serif] text-amber-400 drop-shadow-2xl animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            NA DUBROVKE
          </h1>
          <span
            className="block w-16 sm:w-24 h-1 bg-amber-500 rounded-full mb-4 sm:mb-6 animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          />
          <h2
            className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl font-black mb-2 sm:mb-4 font-['Dela Gothic One',_sans-serif] drop-shadow-xl animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Добро пожаловать
          </h2>
          <p
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-0 font-['Montserrat',_sans-serif] animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Современный боулинг, ночной клуб, караоке и ресторан в центре
            Могилева. Здесь каждый найдёт свой стильный отдых: профессиональные
            дорожки, лучшие вечеринки, уютные залы и изысканная кухня.
          </p>
        </div>
        <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-white/60 writing-mode-vertical text-xs sm:text-sm tracking-widest z-10 hidden sm:block">
          SCROLL
        </div>
      </section>

      {/* Main Content */}
      <div>
        {/* Bowling Section */}
        <section className="relative min-h-[320px] aspect-square sm:aspect-auto sm:min-h-0 sm:h-[340px] md:h-[300px] lg:h-[350px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-[background-attachment:initial] sm:bg-fixed"
            style={{
              backgroundImage: `url("bowlingGallery4.webp")`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  <span className="font-black">БОУЛИНГ</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-2 hidden md:block">
                  8 современных дорожек
                </p>
              </div>
              <div className="block">
                <Link href="/bowling">
                  <GlassButton className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Забронировать дорожку -&gt;
                  </GlassButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* КЛУБ Section */}
        <section className="relative min-h-[320px] aspect-square sm:aspect-auto sm:min-h-0 sm:h-[340px] md:h-[300px] lg:h-[350px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-[background-attachment:initial] sm:bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("11.png")`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  <span className="font-black">КЛУБ</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-2 hidden md:block">
                  Самая лучшая музыка и напитки
                </p>
              </div>
              <div className="block">
                <Link href="/club">
                  <GlassButton className="text-white font-semibold">
                    Забронировать стол -&gt;
                  </GlassButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Karaoke Section */}
        <section className="relative min-h-[320px] aspect-square sm:aspect-auto sm:min-h-0 sm:h-[340px] md:h-[300px] lg:h-[350px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-[background-attachment:initial] sm:bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('bowlingGallery2.webp')`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  <span className="font-black">КАРАОКЕ</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-2 hidden md:block">
                  Качественный звук, взрывная атмосфера
                </p>
              </div>
              <div className="block">
                <Link href="/karaoke">
                  <GlassButton className="text-white font-semibold">
                    Узнать подробнее -&gt;
                  </GlassButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Restaurant Section */}
        <section className="relative min-h-[320px] aspect-square sm:aspect-auto sm:min-h-0 sm:h-[340px] md:h-[300px] lg:h-[350px] flex items-center overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-[background-attachment:initial] sm:bg-fixed"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('hole.png')`,
              backgroundSize: "cover",
            }}
          />
          <div className="relative z-10 w-full px-6 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                  <span className="font-black">БАНКЕТНЫЙ ЗАЛ</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-2 hidden md:block">
                  Самая лучшая атмосфера для всех мероприятий
                </p>
              </div>
              <div className="block">
                <Link href="/banquet">
                  <GlassButton className="text-white font-semibold">
                    Узнать подробнее -&gt;
                  </GlassButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Преимущества */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Почему выбирают нас?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4 sm:p-6">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-2 sm:mb-4" />
              <h4 className="font-bold text-lg mb-2">Современный боулинг</h4>
              <p className="text-gray-600">
                8 профессиональных дорожек Brunswick, детские бортики, легкие
                шары, современная система подсчёта очков.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 sm:p-6">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-2 sm:mb-4" />
              <h4 className="font-bold text-lg mb-2">Лучший клуб</h4>
              <p className="text-gray-600">
                Стильный ночной клуб с танцполом, VIP-зонами, авторскими
                коктейлями и топовыми диджеями.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 sm:p-6">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-2 sm:mb-4" />
              <h4 className="font-bold text-lg mb-2">Караоке и шоу</h4>
              <p className="text-gray-600">
                Караоке-зоны с отличным звуком, огромная база песен,
                тематические вечеринки и шоу-программы.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4 sm:p-6">
              <Star className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500 mb-2 sm:mb-4" />
              <h4 className="font-bold text-lg mb-2">Ресторан и бар</h4>
              <p className="text-gray-600">
                Европейская и белорусская кухня, авторские блюда, десерты,
                большой выбор напитков и коктейлей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ОПИСАНИЯ ЗОН */}
      {/* Боулинг */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-amber-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-orange-600">
                Боулинг
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <b>Боулинг</b> — это не только спорт, но и отличный способ
                провести время с друзьями, семьёй или коллегами. В нашем клубе 8
                профессиональных дорожек Brunswick, современная система подсчёта
                очков, детские бортики и легкие шары для самых маленьких.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Профессиональное оборудование</li>
                <li>Детские дорожки и аксессуары</li>
                <li>Турниры и семейные праздники</li>
                <li>Уютная зона отдыха и бар</li>
              </ul>
              <div className="bg-orange-100 rounded-xl p-4 shadow mt-6 animate-fade-in">
                <h3 className="text-xl font-bold mb-2 text-orange-700">
                  Правила боулинга (кратко):
                </h3>
                <ul className="list-decimal pl-6 text-gray-700 space-y-1 text-base">
                  <li>
                    Каждый игрок бросает шар по очереди, цель — сбить максимум
                    кеглей за 2 броска в фрейме.
                  </li>
                  <li>Игра состоит из 10 фреймов (раундов).</li>
                  <li>
                    Страйк — все кегли сбиты с первого броска, спэр — со
                    второго.
                  </li>
                  <li>Побеждает игрок с наибольшим количеством очков.</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center animate-fade-in-right">
              <Image
                src="/bowlingGallery1.webp"
                alt="Боулинг"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Клуб */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-white to-purple-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center animate-fade-in-left">
              <Image
                src="/clubBar.webp"
                alt="Клуб"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-purple-700">Клуб</h2>
              <p className="text-lg text-gray-700 mb-4">
                <b>Клуб Na Dubrovke</b> — это место, где музыка, свет и
                атмосфера создают идеальные условия для незабываемых вечеринок.
                Современный танцпол, VIP-зоны, авторские коктейли и лучшие
                диджеи города ждут вас каждую неделю.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Танцпол и современный звук</li>
                <li>VIP-зоны для компаний</li>
                <li>Тематические вечеринки и шоу</li>
                <li>Премиальный бар и сервис</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Караоке */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-white to-pink-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-pink-600">Караоке</h2>
              <p className="text-lg text-gray-700 mb-4">
                <b>Караоке</b> — это возможность почувствовать себя звездой!
                Уютные кабины, профессиональный звук, огромная база песен и
                дружелюбная атмосфера для настоящих ценителей музыки.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Профессиональное оборудование</li>
                <li>Уютные кабины для компаний</li>
                <li>База песен на русском и английском</li>
                <li>Регулярные караоке-вечера и конкурсы</li>
              </ul>
            </div>
            <div className="flex justify-center animate-fade-in-right">
              <Image
                src="/bowlingGallery2.webp"
                alt="Караоке"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ресторан */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-yellow-100">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center animate-fade-in-left">
              <Image
                src="/bowlingMenu.webp"
                alt="Ресторан"
                width={500}
                height={350}
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold mb-4 text-amber-700">
                Ресторан
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <b>Ресторан Na Dubrovke</b> — это сочетание европейской и
                белорусской кухни, авторских блюд, десертов и большого выбора
                напитков. Уютная атмосфера, внимательный персонал и стильный
                интерьер делают каждое посещение особенным.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Меню для взрослых и детей</li>
                <li>Авторские блюда и десерты</li>
                <li>Большой выбор напитков и коктейлей</li>
                <li>Возможность заказа онлайн</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* О нас */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                О комплексе Na Dubrovke
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                <b>Na Dubrovke</b> — это уникальное пространство для отдыха,
                развлечений и гастрономических открытий в самом центре Могилева.
                Мы объединили лучшие традиции гостеприимства, современный стиль
                и высокий сервис.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
                <li>
                  <b>Боулинг:</b> 8 дорожек, профессиональное оборудование,
                  детские бортики, турниры и семейные праздники.
                </li>
                <li>
                  <b>Клуб:</b> танцпол, VIP-зоны, лучшие диджеи, тематические
                  вечеринки, современный звук и свет.
                </li>
                <li>
                  <b>Караоке:</b> уютные кабины, огромная база песен,
                  качественный звук, дружелюбная атмосфера.
                </li>
                <li>
                  <b>Ресторан:</b> европейская и белорусская кухня, авторские
                  блюда, десерты, детское меню, бар.
                </li>
                <li>
                  <b>События:</b> банкеты, корпоративы, дни рождения, детские
                  праздники, шоу-программы.
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-2 text-amber-600 font-semibold">
                  <Star className="w-5 h-5" /> Современный интерьер
                </span>
                <span className="inline-flex items-center gap-2 text-amber-600 font-semibold">
                  <Star className="w-5 h-5" /> Уютная атмосфера
                </span>
                <span className="inline-flex items-center gap-2 text-amber-600 font-semibold">
                  <Star className="w-5 h-5" /> Премиальный сервис
                </span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/bowlingAbout.webp"
                alt="Интерьер Na Dubrovke"
                width={600}
                height={500}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Slider */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Наше заведение
          </h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className="w-full h-full flex-shrink-0 relative"
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h3 className="text-white text-xl font-semibold">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-2 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Отзывы гостей
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Отличное место для отдыха с друзьями! Современное
                оборудование, вкусная кухня.&quot;
              </p>
              <p className="font-semibold text-gray-800">Анна К.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Провели корпоратив - все на высшем уровне! Персонал очень
                внимательный.&quot;
              </p>
              <p className="font-semibold text-gray-800">Дмитрий М.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">
                &quot;Лучшее караоке в городе! Огромная база песен и отличный
                звук.&quot;
              </p>
              <p className="font-semibold text-gray-800">Елена В.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Схема помещений */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-center mb-10">
            Схема помещений
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="relative w-full max-w-xl aspect-video bg-slate-100 rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
              <Image
                src="/placeholder.svg"
                alt="Схема помещений"
                fill
                className="object-contain"
              />
              {/* Пример подписей */}
              <span className="absolute left-8 top-8 bg-amber-500/90 text-white px-3 py-1 rounded-full text-sm shadow">
                Боулинг
              </span>
              <span className="absolute right-8 top-8 bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm shadow">
                Клуб
              </span>
              <span className="absolute left-8 bottom-8 bg-pink-500/90 text-white px-3 py-1 rounded-full text-sm shadow">
                Караоке
              </span>
              <span className="absolute right-8 bottom-8 bg-yellow-400/90 text-black px-3 py-1 rounded-full text-sm shadow">
                Ресторан
              </span>
            </div>
            <div className="max-w-md animate-fade-in-right">
              <ul className="space-y-4 text-lg">
                <li>
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-500 mr-2 align-middle" />{" "}
                  <b>Боулинг</b> — 8 дорожек, зона отдыха
                </li>
                <li>
                  <span className="inline-block w-3 h-3 rounded-full bg-purple-600 mr-2 align-middle" />{" "}
                  <b>Клуб</b> — танцпол, VIP-зоны, бар
                </li>
                <li>
                  <span className="inline-block w-3 h-3 rounded-full bg-pink-500 mr-2 align-middle" />{" "}
                  <b>Караоке</b> — отдельные кабины
                </li>
                <li>
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-400 mr-2 align-middle" />{" "}
                  <b>Ресторан</b> — основной зал, банкетная зона
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Галерея */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-2 sm:px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Галерея</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden shadow-lg animate-fade-in-up"
              >
                <Image
                  src={`/bowlingGallery${i}.webp`}
                  alt={`Фото ${i}`}
                  width={400}
                  height={260}
                  className="w-full h-40 xs:h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-base xs:text-lg font-bold drop-shadow">
                    {i === 1
                      ? "Боулинг"
                      : i === 2
                      ? "Клуб"
                      : i === 3
                      ? "Караоке"
                      : i === 4
                      ? "Ресторан"
                      : "Na Dubrovke"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
