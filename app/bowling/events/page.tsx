"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  Trophy,
  Gift,
  Music,
  Star,
  MapPin,
} from "lucide-react";

export default function BowlingEventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Турнир 'Страйк Мастер'",
      date: "15 февраля 2024",
      time: "19:00",
      description:
        "Еженедельный турнир для любителей боулинга. Призы для победителей!",
      price: "Участие: 50 BYN",
      category: "tournament",
      participants: "До 32 игроков",
      prizes: "1 место - 200 BYN, 2 место - 100 BYN, 3 место - 50 BYN",
    },
    {
      id: 2,
      title: "Семейный день",
      date: "18 февраля 2024",
      time: "14:00 - 18:00",
      description:
        "Специальные цены для семей с детьми. Детская анимация и призы.",
      price: "Семейный пакет: 80 BYN",
      category: "family",
      participants: "Семьи с детьми",
      prizes: "Подарки для всех детей",
    },
    {
      id: 3,
      title: "Корпоративный турнир",
      date: "22 февраля 2024",
      time: "18:00",
      description: "Командный турнир для компаний. Тимбилдинг и развлечения.",
      price: "От 100 BYN/команда",
      category: "corporate",
      participants: "Команды 4-6 человек",
      prizes: "Кубок победителя и призы",
    },
    {
      id: 4,
      title: "Ночной боулинг",
      date: "24 февраля 2024",
      time: "22:00 - 02:00",
      description: "Боулинг в темноте с неоновой подсветкой и DJ сетом.",
      price: "40 BYN/час за дорожку",
      category: "party",
      participants: "18+",
      prizes: "Специальные коктейли",
    },
  ];

  const regularEvents = [
    {
      title: "Турнир выходного дня",
      schedule: "Каждую субботу в 16:00",
      description: "Еженедельные соревнования для всех уровней",
    },
    {
      title: "Детский боулинг",
      schedule: "Воскресенье 12:00 - 16:00",
      description: "Специальные условия для детей до 12 лет",
    },
    {
      title: "Лига боулинга",
      schedule: "Среда 19:00",
      description: "Сезонная лига для опытных игроков",
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "tournament":
        return <Trophy className="w-6 h-6 text-orange-500" />;
      case "family":
        return <Users className="w-6 h-6 text-green-500" />;
      case "corporate":
        return <Star className="w-6 h-6 text-blue-500" />;
      case "party":
        return <Music className="w-6 h-6 text-purple-500" />;
      default:
        return <Calendar className="w-6 h-6 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "tournament":
        return "bg-orange-100 text-orange-800";
      case "family":
        return "bg-green-100 text-green-800";
      case "corporate":
        return "bg-blue-100 text-blue-800";
      case "party":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-slate-900 to-orange-900">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <Badge className="bg-orange-500 text-white mb-4">События</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              События в
              <span className="block text-orange-400">Na Dubrovke Bowling</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Турниры, семейные дни, корпоративные мероприятия и многое другое.
              Присоединяйтесь к нашим событиям и получайте незабываемые
              впечатления!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ближайшие события</h2>
            <p className="text-xl text-gray-600">
              Не пропустите наши специальные мероприятия
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getCategoryIcon(event.category)}
                      <Badge className={getCategoryColor(event.category)}>
                        {event.category === "tournament" && "Турнир"}
                        {event.category === "family" && "Семейное"}
                        {event.category === "corporate" && "Корпоратив"}
                        {event.category === "party" && "Вечеринка"}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Users className="w-4 h-4 text-orange-500" />
                      <span>{event.participants}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Gift className="w-4 h-4 text-orange-500" />
                      <span>{event.prizes}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-orange-600">
                      {event.price}
                    </div>
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      Записаться
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Regular Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Регулярные события</h2>
            <p className="text-xl text-gray-600">
              Еженедельные мероприятия для постоянных гостей
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {regularEvents.map((event, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-orange-600 font-semibold mb-3">
                    {event.schedule}
                  </p>
                  <p className="text-gray-600">{event.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Event Booking */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Организуем ваше мероприятие
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Дни рождения, корпоративы, детские праздники - мы поможем
              организовать незабываемое событие
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Дни рождения</h3>
                <p className="text-gray-600">
                  Торт, украшения, специальная программа
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Корпоративы</h3>
                <p className="text-gray-600">
                  Тимбилдинг, банкет, развлекательная программа
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Детские праздники
                </h3>
                <p className="text-gray-600">
                  Аниматоры, детское меню, подарки
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-4"
              >
                Заказать мероприятие
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white bg-transparent"
              >
                Узнать подробности
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Events */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Есть вопросы по событиям?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами для получения подробной информации о мероприятиях и
            бронирования
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-5 h-5" />
              <span>ул. Дубровская, 15, Могилев</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>+375 (29) 123-45-67</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
