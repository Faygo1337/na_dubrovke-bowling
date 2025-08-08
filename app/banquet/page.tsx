"use client";

import Image from "next/image";
// import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import {
  Calendar,
  Heart,
  Briefcase,
  Gift,
  Music,
  Utensils,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function BanquetPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert("Введите имя и телефон");
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "banquet",
          data: {
            name: form.name,
            phone: form.phone,
            date: form.date || undefined,
            message: form.message || undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error || "Ошибка отправки");
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setForm({ name: "", phone: "", date: "", message: "" });
    } catch (err) {
      alert("Не удалось отправить заявку. Попробуйте позже.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[100vh] min-h-[690px]  flex items-center">
        <Image
          src="/DeparisMainBg.webp"
          alt="Фон банкетного зала"
          fill
          className="absolute inset-0 object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto pt-16 sm:pt-24 px-2 sm:px-4 pb-10 sm:pb-16 relative z-10">
          <div className="max-w-3xl text-white mx-auto">
            <h1 className="flex flex-col items-center text-3xl xs:text-4xl md:text-7xl font-black mb-4 sm:mb-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center w-full"
              >
                <Image
                  src={"/LogoDeParisMain1.webp"}
                  width={600}
                  height={600}
                  alt="logo de paris"
                  className="w-80 xs:w-72 md:w-[700px] h-auto"
                  style={{ filter: "invert(1)" }}
                  priority
                />
                <p
                  className="block text-white text-2xl xs:text-3xl md:text-5xl font-bold mt-2 mb-2"
                  style={{ color: "#fff" }}
                >
                  Банкетный зал
                </p>
              </motion.div>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 text-white/60 writing-mode-vertical text-sm tracking-widest z-10">
          SCROLL
        </div>
      </section>

      <main className="bg-white">
        {/* Why Choose Us Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="text-orange-800 font-semibold text-sm uppercase tracking-wide">
                  Почему мы
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Почему выбирают именно нас?
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Просторный банкетный зал в восточном стиле с роскошными красными
                драпировками, теплым освещением и неповторимой атмосферой.
                Идеальное место для особенных событий.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Star,
                  title: "Восточная роскошь",
                  description:
                    "Богатые бархатные драпировки, золотые узоры и теплое освещение",
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: Users,
                  title: "Уютная атмосфера",
                  description:
                    "От 35 до 50 гостей - идеально для уютных торжеств",
                  color: "from-red-500 to-pink-500",
                },
                {
                  icon: Utensils,
                  title: "Европейская и белорусская кухня",
                  description:
                    "Традиционные блюда и авторские рецепты восточной кухни",
                  color: "from-orange-500 to-yellow-500",
                },
                {
                  icon: CheckCircle,
                  title: "Премиальный сервис",
                  description:
                    "Профессиональная команда и индивидуальный подход",
                  color: "from-red-500 to-orange-500",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What We Host Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 rounded-full px-4 py-2 mb-4">
                <Heart className="h-4 w-4 text-red-600" />
                <span className="text-red-800 font-semibold text-sm uppercase tracking-wide">
                  Мероприятия
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Какие мероприятия мы проводим?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Организуем мероприятия любого формата с особым вниманием к
                деталям
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Свадьбы",
                  description:
                    "Сказочная восточная атмосфера для самого важного дня. Роскошные драпировки, теплое освещение и магия Востока создадут незабываемые воспоминания.",
                  badge: "Индивидуальный подход",
                  badgeColor: "bg-orange-100 text-orange-800",
                  gradient: "from-pink-500 to-red-500",
                },
                {
                  icon: Gift,
                  title: "Дни рождения",
                  description:
                    "Яркие и незабываемые празднования юбилеев и дней рождения. Создаем атмосферу радости и веселья для именинника и гостей.",
                  badge: "Праздничная атмосфера",
                  badgeColor: "bg-red-100 text-red-800",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: Briefcase,
                  title: "Корпоративы",
                  description:
                    "Деловые мероприятия, презентации и корпоративные праздники. Профессиональная организация для укрепления командного духа.",
                  badge: "Деловой формат",
                  badgeColor: "bg-blue-100 text-blue-800",
                  gradient: "from-blue-500 to-purple-500",
                },
                {
                  icon: Users,
                  title: "Детские праздники",
                  description:
                    "Весёлые и яркие мероприятия для детей с аниматорами, играми и специальным детским меню. Создаём атмосферу радости и волшебства для самых маленьких гостей.",
                  badge: "Детское меню",
                  badgeColor: "bg-yellow-100 text-yellow-800",
                  gradient: "from-yellow-400 to-orange-400",
                },
                {
                  icon: Music,
                  title: "Выпускные",
                  description:
                    "Торжественные выпускные вечера для школьников и студентов. Создаем праздничную атмосферу для важного жизненного этапа.",
                  badge: "Молодежный формат",
                  badgeColor: "bg-purple-100 text-purple-800",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  icon: Star,
                  title: "Семейные торжества",
                  description:
                    "Крестины, годовщины, семейные встречи и другие важные события. Уютная атмосфера для близких людей и родственников.",
                  badge: "Семейный уют",
                  badgeColor: "bg-green-100 text-green-800",
                  gradient: "from-green-500 to-teal-500",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-1 bg-white overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-90">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {item.description}
                    </p>
                    <Badge
                      className={`${item.badgeColor} font-medium px-3 py-1 text-xs`}
                    >
                      {item.badge}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Capacity & Pricing Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
                  <Users className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-800 font-semibold text-sm uppercase tracking-wide">
                    Цены и вместимость
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  Вместимость и цены
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Вместимость зала
                    </h3>
                    <p className="text-2xl font-black text-blue-600 mb-2">
                      35-50
                    </p>
                    <p className="text-gray-600 text-sm">гостей</p>
                    <div className="bg-blue-50 p-3 rounded-xl mt-3">
                      <p className="text-blue-800 font-medium text-xs flex items-center justify-center">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Приятная атмосфера
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">$</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Стоимость
                    </h3>
                    <p className="text-2xl font-black text-green-600 mb-2">
                      от 80 руб.
                    </p>
                    <p className="text-gray-600 text-sm">на человека</p>
                    <div className="bg-green-50 p-3 rounded-xl mt-3">
                      <p className="text-green-800 font-medium text-xs flex items-center justify-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Договорная основа
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Бронирование
                    </h3>
                    <p className="text-2xl font-semibold text-purple-600 mb-2">
                      По предварительной записи
                    </p>
                    {/* <p className="text-gray-600 text-sm">
                      Учитываем все ваши пожелания
                    </p> */}
                    <div className="bg-purple-50 p-3 rounded-xl mt-3">
                      <p className="text-purple-800 font-medium text-xs flex items-center justify-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Обязательно
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border-0 shadow-2xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 text-yellow-400 mr-3" />
                      <h4 className="text-xl font-bold  underline decoration-solid">
                        Индивидуальность
                      </h4>
                    </div>
                    <p className="mb-4 text-base leading-relaxed opacity-95">
                      Каждое мероприятие уникально! Мы учитываем все ваши
                      пожелания: от оформления зала до составления персонального
                      меню.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white border-2 border-gray-200 shadow-xl overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Phone className="h-6 w-6 text-gray-700 mr-3" />
                      <h4 className="text-xl font-bold text-gray-900">
                        Консультация
                      </h4>
                    </div>
                    <p className="text-gray-600 mb-4 text-base leading-relaxed">
                      Обсудим все детали вашего мероприятия и подберем
                      оптимальные решения для создания идеального праздника.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-base py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                      <Clock className="mr-2 h-4 w-4" />
                      Записаться на консультацию
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800 font-semibold text-sm uppercase tracking-wide">
                    Бронирование
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Оставить заявку
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Заполните форму, и мы свяжемся с вами в течение 30 минут для
                  обсуждения всех деталей
                </p>
              </div>

              <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-orange-50 overflow-hidden">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Ваше имя *
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) =>
                            setForm({ ...form, name: e.target.value })
                          }
                          className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400"
                          placeholder="Введите ваше имя"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Номер телефона *
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value })
                          }
                          className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400"
                          placeholder="+375 (XX) XXX-XX-XX"
                          required
                        />
                      </div>
                    </div>

                    {/* <div className="grid md:grid-cols-2 gap-4"> */}
                    {/* <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Количество гостей
                        </label>
                        <select className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900">
                          <option value="">Выберите количество</option>
                          <option value="35-40">35-40 человек</option>
                          <option value="40-45">40-45 человек</option>
                          <option value="45-50">45-50 человек</option>
                        </select>
                      </div> */}
                    {/* <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                          Тип мероприятия
                        </label>
                        <select className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900">
                          <option value="">Выберите тип</option>
                          <option value="wedding">Свадьба</option>
                          <option value="birthday">День рождения</option>
                          <option value="corporate">Корпоратив</option>
                          <option value="graduation">Выпускной</option>
                          <option value="memorial">Поминальный обед</option>
                          <option value="family">Семейное торжество</option>
                        </select>
                      </div> */}
                    {/* </div> */}

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Предполагаемая дата мероприятия
                      </label>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">
                        Дополнительные пожелания
                      </label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors duration-300 text-gray-900 placeholder-gray-400 resize-none"
                        placeholder="Расскажите о ваших пожеланиях к оформлению, меню, музыке или других особых требованиях..."
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-base py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 group"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Отправить заявку
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button
                        type="button"
                        size="lg"
                        variant="outline"
                        className="flex-1 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 text-base py-3 rounded-xl font-bold transition-all duration-300 bg-transparent"
                      >
                        <Phone className="mr-2 h-4 w-4" />
                        Позвонить сейчас
                      </Button>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-orange-800 font-semibold text-sm">
                          Гарантируем быстрый ответ
                        </span>
                      </div>
                      <p className="text-center text-orange-700 text-xs">
                        Мы свяжемся с вами в течение 30 минут для уточнения
                        деталей и составления персонального предложения
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-4">
                <Star className="h-4 w-4 text-gray-600" />
                <span className="text-gray-800 font-semibold text-sm uppercase tracking-wide">
                  Галерея
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Атмосфера нашего зала
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Погрузитесь в волшебную атмосферу Востока
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  {i === 1 ? (
                    <Image
                      src="/images/hall-interior.jpg"
                      alt="Восточный банкетный зал с красными драпировками"
                      width={400}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <Image
                      src={`/placeholder.svg?height=320&width=400&query=elegant oriental banquet hall interior ${i}`}
                      alt={`Банкетный зал фото ${i}`}
                      width={400}
                      height={320}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-bold text-lg mb-1">Банкетный зал</p>
                      <p className="text-white/80 text-sm">
                        Вариант оформления {i}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
