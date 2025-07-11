"use client";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

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
    <div className="min-h-screen">
      {/* Welcome Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] bg-black text-white overflow-hidden py-16">
        <div className="relative z-10 max-w-2xl text-center px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-[\'Dela Gothic One\',_sans-serif]">
            Добро пожаловать на Дубровку
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-10 font-[\'Montserrat\',_sans-serif]">
            Лучший боулинг, клуб и ресторан в Могилеве. Здесь каждый найдет свой
            стильный отдых: современный боулинг, ночной клуб с атмосферой,
            караоке и изысканная кухня.
          </p>
        </div>
        {/* Slide Text Animation */}
        <div className="slide-text-wrapper w-full flex justify-center relative z-10">
          <div className="slide-text text-white select-none">
            <span>&nbsp;ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО</span>
            <h1>&nbsp;ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО&nbsp;</h1>
            <span>ОТДЫХАЙ КРАСИВО ОТДЫХАЙ КРАСИВО</span>
          </div>
        </div>
        {/* Фоновый градиент */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-transparent pointer-events-none" />
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
                  6 современных дорожек
                </p>
              </div>
              <div className="block">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3"
                >
                  забронировать
                  <br />
                  дорожку
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Billiards Section */}
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
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                >
                  забронировать
                  <br />
                  стол
                </Button>
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
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3"
                >
                  забронировать
                  <br />
                  кабину
                </Button>
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
                  <span className="font-black">РЕСТОРАН</span>
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mt-2 hidden md:block">
                  Европейская и белорусская кухня
                </p>
              </div>
              <div className="block">
                <Button
                  size="lg"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3"
                >
                  посмотреть
                  <br />
                  меню
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section id="about" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* <Badge className="bg-orange-500 text-white mb-4">О нас</Badge> */}
              <p>О нас</p>
              <h2 className="text-4xl font-bold mb-6">
                Добро пожаловать в Na Dubrovke
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Наш боулинг-клуб расположен в самом сердце Могилева на улице
                проспект Мира, 21А. Мы предлагаем профессиональное оборудование
                Brunswick и незабываемую атмосферу для игры в боулинг.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>8 профессиональных дорожек Brunswick</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Современная система подсчета очков</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Обувь всех размеров в наличии</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span>Детские бортики и легкие шары</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/bowlingAbout.webp"
                alt="Боулинг дорожки Na Dubrovke"
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
        <div className="max-w-7xl mx-auto px-6">
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
        <div className="max-w-7xl mx-auto px-6">
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

      {/* Map Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Как нас найти
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Контактная информация
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">
                    г. Могилев, ул. Дубровская, 15
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-gray-700">+375 (222) 25-25-25</p>
                    <p className="text-gray-700">+375 (29) 123-45-67</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-gray-800">
                  Режим работы
                </h4>
                <div className="space-y-2 text-gray-600">
                  <p>Пн-Чт: 12:00 - 02:00</p>
                  <p>Пт-Сб: 12:00 - 04:00</p>
                  <p>Вс: 12:00 - 00:00</p>
                </div>
              </div>
            </div>
            <div className="h-96 bg-gray-300 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-600">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <p className="text-lg font-semibold">Интерактивная карта</p>
                <p className="text-sm">г. Могилев, ул. Дубровская, 15</p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Построить маршрут
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
