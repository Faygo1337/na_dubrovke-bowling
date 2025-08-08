"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Calendar,
  Users,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function KaraokePage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    comment: "",
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
          type: "karaoke",
          data: {
            name: form.name,
            phone: form.phone,
            date: form.date || undefined,
            time: form.time || undefined,
            guests: form.guests ? Number(form.guests) : undefined,
            comment: form.comment || undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.error || "Ошибка отправки");
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
      setForm({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: "",
        comment: "",
      });
    } catch (err) {
      alert("Не удалось отправить заявку. Попробуйте позже.");
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[620px] flex items-center">
        <Image
          src="/bowlingGallery2.webp"
          alt="Караоке в Na Dubrovke"
          fill
          className="absolute inset-0 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-2 sm:px-4">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl xs:text-5xl md:text-7xl font-black mb-4">
              КАРАОКЕ
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Запись от 10 человек. Бронируйте по телефону или оставьте заявку
              через форму.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+375291867825"
                className="inline-flex items-center justify-center rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 font-semibold"
              >
                <Phone className="w-4 h-4 mr-2" /> Позвонить
              </a>
              <a
                href="#request"
                className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-semibold"
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* Условия и преимущества */}
        <section className="py-16 bg-gradient-to-b from-white to-pink-50">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Запись от 10 человек",
                  desc: "Идеально для компаний и дней рождения",
                },
                {
                  title: "Профессиональный звук",
                  desc: "Качественные микрофоны и акустика",
                },
                {
                  title: "Большая база песен",
                  desc: "Русские и зарубежные хиты",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-pink-100 bg-white shadow-sm p-6"
                >
                  <h3 className="text-xl font-bold mb-2 text-pink-700">
                    {card.title}
                  </h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Как записаться */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Как записаться
              </h2>
              <p className="text-gray-600">
                Позвоните нам или оставьте заявку онлайн
              </p>
            </div>
            <div className="mx-auto max-w-3xl grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-pink-100 bg-pink-50 p-6">
                <h3 className="font-bold text-pink-700 mb-2">По телефону</h3>
                <p className="text-gray-700 mb-4">
                  Свяжитесь с администратором для быстрого бронирования.
                </p>
                <a
                  href="tel:+375291867825"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 font-semibold"
                >
                  <Phone className="w-4 h-4 mr-2" /> +375 (29) 186-78-25
                </a>
              </div>
              <div
                id="request"
                className="rounded-2xl border border-gray-200 bg-white p-6"
              >
                <h3 className="font-bold text-gray-900 mb-4">
                  Форма обратной связи
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-gray-700">Имя *</Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="mt-1"
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700">Телефон *</Label>
                    <Input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="mt-1"
                      placeholder="+375 (XX) XXX-XX-XX"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-gray-700 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Дата
                      </Label>
                      <Input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          setForm({ ...form, date: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700">Время</Label>
                      <Input
                        type="time"
                        value={form.time}
                        onChange={(e) =>
                          setForm({ ...form, time: e.target.value })
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Гостей
                      </Label>
                      <Input
                        type="number"
                        min={10}
                        value={form.guests}
                        onChange={(e) =>
                          setForm({ ...form, guests: e.target.value })
                        }
                        className="mt-1"
                        placeholder="от 10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-700 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Комментарий
                    </Label>
                    <textarea
                      value={form.comment}
                      onChange={(e) =>
                        setForm({ ...form, comment: e.target.value })
                      }
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-300"
                      rows={3}
                      placeholder="Пожелания к бронированию"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    Отправить заявку
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Галерея */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-2 sm:px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Галерея</h2>
              <p className="text-gray-600">Атмосфера караоке Na Dubrovke</p>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="relative group rounded-xl overflow-hidden shadow-lg"
                >
                  <Image
                    src={`/bowlingGallery${(i % 6) + 1}.webp`}
                    alt={`Караоке фото ${i}`}
                    width={400}
                    height={260}
                    className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold">Караоке</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Контакты */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-2 sm:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Контакты
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  Свяжитесь с нами
                </h3>
                <div className="space-y-4 text-gray-700">
                  <p>г. Могилев, ул. Дубровская, 15</p>
                  <a
                    href="tel:+375291867825"
                    className="inline-flex items-center gap-2 text-pink-700 font-semibold"
                  >
                    <Phone className="w-5 h-5" /> +375 (29) 186-78-25
                  </a>
                  <p>Часы работы караоке: Чт-Вс 20:00–02:00</p>
                </div>
              </div>
              <div className="h-80 bg-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <p className="text-lg font-semibold">Карта скоро появится</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
