"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, Music, Star, Sparkles, Crown, MapPin } from "lucide-react"

export default function ClubEventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "NEON NIGHT",
      date: "16 февраля 2024",
      time: "22:00 - 06:00",
      description: "Неоновая вечеринка с флуоресцентными красками и UV-шоу. Специальные коктейли светятся в темноте!",
      price: "Вход: 25/35 BYN",
      category: "party",
      dj: "DJ ALEX NEON",
      dress: "Белая одежда приветствуется",
      special: "Бесплатные неоновые краски",
    },
    {
      id: 2,
      title: "LADIES NIGHT",
      date: "20 февраля 2024",
      time: "21:00 - 04:00",
      description: "Особенный вечер для девушек. Комплименты от заведения и специальная программа.",
      price: "Девушки: Бесплатно до 23:00",
      category: "ladies",
      dj: "DJ MARIA",
      dress: "Элегантный стиль",
      special: "Комплимент каждой девушке",
    },
    {
      id: 3,
      title: "VIP PARTY",
      date: "24 февраля 2024",
      time: "23:00 - 06:00",
      description: "Эксклюзивная вечеринка в VIP зоне. Премиальные напитки и закрытая программа.",
      price: "Только по приглашениям",
      category: "vip",
      dj: "DJ PREMIUM",
      dress: "Black tie",
      special: "Шампанское Dom Pérignon",
    },
    {
      id: 4,
      title: "RETRO DISCO",
      date: "28 февраля 2024",
      time: "22:00 - 05:00",
      description: "Возвращение в эпоху диско! Хиты 80-90х, ретро коктейли и винтажная атмосфера.",
      price: "Вход: 20/30 BYN",
      category: "retro",
      dj: "DJ RETRO WAVE",
      dress: "Ретро стиль приветствуется",
      special: "Конкурс на лучший ретро образ",
    },
  ]

  const weeklyEvents = [
    {
      day: "ЧЕТВЕРГ",
      title: "OPEN MIC NIGHT",
      time: "22:00 - 02:00",
      description: "Открытый микрофон для талантливых исполнителей",
      special: "Бесплатный вход для артистов",
    },
    {
      day: "ПЯТНИЦА",
      title: "PREMIUM NIGHT",
      time: "23:00 - 06:00",
      description: "Лучшие DJ города и премиальная программа",
      special: "VIP столы со скидкой 20%",
    },
    {
      day: "СУББОТА",
      title: "MAIN EVENT",
      time: "22:00 - 06:00",
      description: "Главная вечеринка недели с топовыми артистами",
      special: "Розыгрыш призов каждый час",
    },
    {
      day: "ВОСКРЕСЕНЬЕ",
      title: "CHILL SUNDAY",
      time: "20:00 - 02:00",
      description: "Расслабленная атмосфера с лаунж музыкой",
      special: "Коктейли 2+1 до 22:00",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "party":
        return <Sparkles className="w-6 h-6 text-purple-400" />
      case "ladies":
        return <Crown className="w-6 h-6 text-pink-400" />
      case "vip":
        return <Star className="w-6 h-6 text-amber-400" />
      case "retro":
        return <Music className="w-6 h-6 text-cyan-400" />
      default:
        return <Calendar className="w-6 h-6 text-gray-400" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "party":
        return "bg-purple-900/50 text-purple-300 border-purple-500"
      case "ladies":
        return "bg-pink-900/50 text-pink-300 border-pink-500"
      case "vip":
        return "bg-amber-900/50 text-amber-300 border-amber-500"
      case "retro":
        return "bg-cyan-900/50 text-cyan-300 border-cyan-500"
      default:
        return "bg-gray-900/50 text-gray-300 border-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-black via-purple-900/20 to-black">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-pink-500/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-wider">
              <span className="block">СОБЫТИЯ</span>
              <span className="block text-amber-400">NA DUBROVKE</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Эксклюзивные вечеринки, тематические ночи и специальные мероприятия. Окунитесь в мир премиального ночного
              развлечения.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">БЛИЖАЙШИЕ СОБЫТИЯ</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className={`bg-gray-900/50 border backdrop-blur-sm hover:scale-105 transition-all duration-300 ${getCategoryColor(event.category)}`}
              >
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(event.category)}
                      <Badge className={`${getCategoryColor(event.category)} border`}>
                        {event.category === "party" && "ВЕЧЕРИНКА"}
                        {event.category === "ladies" && "LADIES NIGHT"}
                        {event.category === "vip" && "VIP EVENT"}
                        {event.category === "retro" && "РЕТРО"}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-3xl font-black mb-4 tracking-wider">{event.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-amber-400" />
                      <span className="text-gray-300">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-amber-400" />
                      <span className="text-gray-300">{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Music className="w-5 h-5 text-amber-400" />
                      <span className="text-gray-300">{event.dj}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-amber-400" />
                      <span className="text-gray-300">{event.dress}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span className="text-gray-300">{event.special}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-amber-400">{event.price}</div>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8">ЗАБРОНИРОВАТЬ</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Events */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">ЕЖЕНЕДЕЛЬНЫЕ СОБЫТИЯ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {weeklyEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-gray-900/30 border-gray-700 hover:border-amber-400 transition-all duration-300 backdrop-blur-sm"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-amber-400" />
                  </div>
                  <h3 className="text-amber-400 font-bold text-lg mb-2">{event.day}</h3>
                  <h4 className="text-xl font-bold mb-3">{event.title}</h4>
                  <p className="text-gray-400 text-sm mb-3">{event.time}</p>
                  <p className="text-gray-300 text-sm mb-4">{event.description}</p>
                  <div className="text-amber-400 text-xs font-semibold">{event.special}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Private Events */}
      <section className="py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
            <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">ЧАСТНЫЕ МЕРОПРИЯТИЯ</h2>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Организуем эксклюзивные мероприятия для вашей компании. Дни рождения, корпоративы, презентации в
              премиальной атмосфере.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Crown className="w-10 h-10 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">VIP МЕРОПРИЯТИЯ</h3>
                <p className="text-gray-400">Закрытые вечеринки в эксклюзивной обстановке</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">КОРПОРАТИВЫ</h3>
                <p className="text-gray-400">Деловые мероприятия с развлекательной программой</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">ДНИ РОЖДЕНИЯ</h3>
                <p className="text-gray-400">Незабываемые празднования в стильной атмосфере</p>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-12 py-6 rounded-full transition-all duration-300 hover:scale-105"
            >
              ЗАКАЗАТЬ МЕРОПРИЯТИЕ
            </Button>
          </div>
        </div>
      </section>

      {/* Contact for Events */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 text-center">
          <div className="w-24 h-px bg-amber-400 mx-auto mb-8"></div>
          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-wide">КОНТАКТЫ</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Свяжитесь с нами для бронирования столов и организации частных мероприятий
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-amber-400" />
              <span className="text-gray-300">ул. Дубровская, 15, Могилев</span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-amber-400" />
              <span className="text-gray-300">+375 (29) 123-45-67</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
