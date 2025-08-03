"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { X, Home, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

interface BowlingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BowlingBookingModal({
  isOpen,
  onClose,
}: BowlingBookingModalProps) {
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    lanes: "",
    duration: "",
    players: "",
    comment: "",
    agreed: false,
  });

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

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !bookingData.name ||
      !bookingData.phone ||
      !bookingData.date ||
      !bookingData.time ||
      !bookingData.lanes ||
      !bookingData.duration ||
      !bookingData.players
    ) {
      alert("Пожалуйста, заполните все обязательные поля");
      return;
    }

    if (!bookingData.agreed) {
      alert("Необходимо согласие на обработку персональных данных");
      return;
    }

    console.log("Bowling lane booking:", bookingData);
    alert(
      "Заявка на бронирование дорожки отправлена! Мы свяжемся с вами в течение 15 минут."
    );

    // Сброс формы
    setBookingData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      lanes: "",
      duration: "",
      players: "",
      comment: "",
      agreed: false,
    });

    handleClose();
  };

  const getAvailableTimes = useCallback(() => {
    const times = [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
      "22:00",
    ];

    // Фильтрация времени для сегодняшнего дня
    if (bookingData.date) {
      const today = new Date();
      const isToday = bookingData.date === format(today, "yyyy-MM-dd");
      const currentHour = today.getHours();

      if (isToday) {
        return times.filter((time) => {
          const timeHour = Number.parseInt(time.split(":")[0]);
          return timeHour > currentHour + 1;
        });
      }
    }

    return times;
  }, [bookingData.date]);

  // Сброс времени при изменении даты
  useEffect(() => {
    if (bookingData.date) {
      const availableTimes = getAvailableTimes();
      if (!availableTimes.includes(bookingData.time)) {
        setBookingData((prev) => ({ ...prev, time: "" }));
      }
    }
  }, [bookingData.date, bookingData.time]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity duration-500 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full h-full bg-white text-slate-900 transition-all duration-700 ease-out overflow-y-auto ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header - Fixed */}
        <div
          className={`sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-all duration-700 delay-200 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleClose}
            className="text-slate-600 hover:text-slate-900 transition-colors p-2 -ml-2"
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-sm sm:text-base lg:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] text-center text-slate-700">
            БРОНИРОВАНИЕ ДОРОЖКИ
          </h1>

          <button
            onClick={handleClose}
            className="text-slate-600 hover:text-slate-900 transition-colors p-2 -mr-2"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div
          className={`min-h-[calc(100vh-80px)] flex items-center transition-all duration-700 delay-300 ease-out py-8 sm:py-12 lg:py-16 ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {/* Mobile Layout */}
            <div className="block lg:hidden">
              <div className="max-w-sm mx-auto space-y-8">
                {/* Title for Mobile */}
                <div
                  className={`text-center transition-all duration-700 delay-300 ease-out ${
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-4 text-slate-900">
                    NA DUBROVKE
                    <br />
                    <span className="block text-orange-500">BOWLING</span>
                  </h2>
                  <div className="text-sm text-slate-600 mb-2 ">
                    <Link
                      href="tel:+375291867825"
                      className="flex items-center justify-center"
                    >
                      <Phone className="mr-2 w-5 h-5" />
                      +375 (29) 186-78-25
                    </Link>
                  </div>
                </div>

                {/* Form for Mobile */}
                <div
                  className={`transition-all duration-700 delay-400 ease-out ${
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <h3 className="text-base font-light tracking-wide mb-6 text-center text-slate-700">
                    ЗАБРОНИРОВАТЬ ДОРОЖКУ
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Имя
                      </Label>
                      <Input
                        value={bookingData.name}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            name: e.target.value,
                          })
                        }
                        className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        placeholder="Иван"
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Телефон
                      </Label>
                      <Input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            phone: e.target.value,
                          })
                        }
                        className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        placeholder="+375 (29) 123-45-67"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Email
                      </Label>
                      <Input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            email: e.target.value,
                          })
                        }
                        className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        placeholder="example@gmail.com"
                      />
                    </div>

                    {/* Date and Time - Side by side on mobile */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-sm font-light tracking-wide">
                          Дата
                        </Label>
                        <input
                          type="date"
                          value={bookingData.date}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              date: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors text-sm"
                          min={format(new Date(), "yyyy-MM-dd")}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-600 text-sm font-light tracking-wide">
                          Время
                        </Label>
                        <select
                          value={bookingData.time}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              time: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer text-sm"
                          disabled={!bookingData.date}
                          required
                        >
                          <option value="" className="bg-white text-slate-900">
                            {bookingData.date ? "Время" : "Дата"}
                          </option>
                          {getAvailableTimes().map((time) => (
                            <option
                              key={time}
                              value={time}
                              className="bg-white text-slate-900"
                            >
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Lanes and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-600 text-sm font-light tracking-wide">
                          Дорожек
                        </Label>
                        <select
                          value={bookingData.lanes}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              lanes: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer text-sm"
                          required
                        >
                          <option value="" className="bg-white text-slate-900">
                            Кол-во
                          </option>
                          <option value="1" className="bg-white text-slate-900">
                            1 дорожка
                          </option>
                          <option value="2" className="bg-white text-slate-900">
                            2 дорожки
                          </option>
                          <option value="3" className="bg-white text-slate-900">
                            3 дорожки
                          </option>
                          <option value="4" className="bg-white text-slate-900">
                            4 дорожки
                          </option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-slate-600 text-sm font-light tracking-wide">
                          Длительность
                        </Label>
                        <select
                          value={bookingData.duration}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              duration: e.target.value,
                            })
                          }
                          className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer text-sm"
                          required
                        >
                          <option value="" className="bg-white text-slate-900">
                            Часов
                          </option>
                          <option value="1" className="bg-white text-slate-900">
                            1 час
                          </option>
                          <option
                            value="1.5"
                            className="bg-white text-slate-900"
                          >
                            1.5 часа
                          </option>
                          <option value="2" className="bg-white text-slate-900">
                            2 часа
                          </option>
                          <option value="3" className="bg-white text-slate-900">
                            3 часа
                          </option>
                          <option value="4" className="bg-white text-slate-900">
                            4 часа
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Players */}
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Количество игроков
                      </Label>
                      <select
                        value={bookingData.players}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            players: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer text-sm"
                        required
                      >
                        <option value="" className="bg-white text-slate-900">
                          Выберите
                        </option>
                        <option value="2" className="bg-white text-slate-900">
                          2 игрока
                        </option>
                        <option value="3" className="bg-white text-slate-900">
                          3 игрока
                        </option>
                        <option value="4" className="bg-white text-slate-900">
                          4 игрока
                        </option>
                        <option value="5" className="bg-white text-slate-900">
                          5 игроков
                        </option>
                        <option value="6" className="bg-white text-slate-900">
                          6 игроков
                        </option>
                        <option value="7" className="bg-white text-slate-900">
                          7 игроков
                        </option>
                        <option value="8" className="bg-white text-slate-900">
                          8 игроков
                        </option>
                        <option value="10" className="bg-white text-slate-900">
                          10+ игроков
                        </option>
                      </select>
                    </div>

                    {/* Comment */}
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Комментарий
                      </Label>
                      <textarea
                        value={bookingData.comment}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            comment: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors resize-none text-sm"
                        rows={2}
                        placeholder="Дополнительные пожелания..."
                      />
                    </div>

                    {/* Agreement Checkbox */}
                    <div className="flex items-start space-x-3 pt-2">
                      <input
                        type="checkbox"
                        id="agreement-mobile"
                        checked={bookingData.agreed}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            agreed: e.target.checked,
                          })
                        }
                        className="mt-1 w-4 h-4 bg-transparent border border-slate-400 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
                      />
                      <Label
                        htmlFor="agreement-mobile"
                        className="text-slate-600 text-xs font-light leading-relaxed cursor-pointer"
                      >
                        Согласие на обработку персональных данных
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
                      >
                        <span>ОТПРАВИТЬ</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Left Side - Title */}
              <div
                className={`flex flex-col justify-center transition-all duration-700 delay-300 ease-out ${
                  isAnimating
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-8"
                }`}
              >
                <h2 className="text-6xl xl:text-7xl 2xl:text-8xl font-black leading-none tracking-tight text-slate-900">
                  NA DUBROVKE
                  <br />
                  <span className="block mt-4 text-orange-500">BOWLING</span>
                </h2>

                {/* Phone Number */}
                <div className="mt-16 xl:mt-24 2xl:mt-32">
                  <Link href="tel:+375291867825" className="flex items-center">
                    <Phone className="mr-2 w-5 h-5" />
                    +375 (29) 186-78-25
                  </Link>
                </div>
              </div>

              {/* Right Side - Form */}
              <div
                className={`flex flex-col justify-center w-full max-w-md mx-auto transition-all duration-700 delay-400 ease-out ${
                  isAnimating
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
              >
                <h3 className="text-xl font-light tracking-wide mb-12 text-slate-700">
                  ЗАБРОНИРОВАТЬ ДОРОЖКУ
                </h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Имя
                    </Label>
                    <Input
                      value={bookingData.name}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, name: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      placeholder=""
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Телефон
                    </Label>
                    <Input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          phone: e.target.value,
                        })
                      }
                      className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      placeholder=""
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Email
                    </Label>
                    <Input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          email: e.target.value,
                        })
                      }
                      className="bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      placeholder=""
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Дата
                    </Label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors"
                      min={format(new Date(), "yyyy-MM-dd")}
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Время
                    </Label>
                    <select
                      value={bookingData.time}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, time: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                      disabled={!bookingData.date}
                      required
                    >
                      <option value="" className="bg-white text-slate-900">
                        {bookingData.date
                          ? "Выберите время"
                          : "Сначала выберите дату"}
                      </option>
                      {getAvailableTimes().map((time) => (
                        <option
                          key={time}
                          value={time}
                          className="bg-white text-slate-900"
                        >
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lanes and Duration */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Дорожек
                      </Label>
                      <select
                        value={bookingData.lanes}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            lanes: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-white text-slate-900">
                          Кол-во
                        </option>
                        <option value="1" className="bg-white text-slate-900">
                          1 дорожка
                        </option>
                        <option value="2" className="bg-white text-slate-900">
                          2 дорожки
                        </option>
                        <option value="3" className="bg-white text-slate-900">
                          3 дорожки
                        </option>
                        <option value="4" className="bg-white text-slate-900">
                          4 дорожки
                        </option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-slate-600 text-sm font-light tracking-wide">
                        Длительность
                      </Label>
                      <select
                        value={bookingData.duration}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            duration: e.target.value,
                          })
                        }
                        className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                        required
                      >
                        <option value="" className="bg-white text-slate-900">
                          Время
                        </option>
                        <option value="1" className="bg-white text-slate-900">
                          1 час
                        </option>
                        <option value="1.5" className="bg-white text-slate-900">
                          1.5 часа
                        </option>
                        <option value="2" className="bg-white text-slate-900">
                          2 часа
                        </option>
                        <option value="3" className="bg-white text-slate-900">
                          3 часа
                        </option>
                        <option value="4" className="bg-white text-slate-900">
                          4 часа
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Players */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Количество игроков
                    </Label>
                    <select
                      value={bookingData.players}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          players: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 focus:border-orange-500 focus:outline-none transition-colors appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-white text-slate-900">
                        Выберите количество
                      </option>
                      <option value="2" className="bg-white text-slate-900">
                        2 игрока
                      </option>
                      <option value="3" className="bg-white text-slate-900">
                        3 игрока
                      </option>
                      <option value="4" className="bg-white text-slate-900">
                        4 игрока
                      </option>
                      <option value="5" className="bg-white text-slate-900">
                        5 игроков
                      </option>
                      <option value="6" className="bg-white text-slate-900">
                        6 игроков
                      </option>
                      <option value="7" className="bg-white text-slate-900">
                        7 игроков
                      </option>
                      <option value="8" className="bg-white text-slate-900">
                        8 игроков
                      </option>
                      <option value="10" className="bg-white text-slate-900">
                        10+ игроков
                      </option>
                    </select>
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <Label className="text-slate-600 text-sm font-light tracking-wide">
                      Комментарий
                    </Label>
                    <textarea
                      value={bookingData.comment}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          comment: e.target.value,
                        })
                      }
                      className="w-full bg-transparent border-0 border-b border-slate-300 rounded-none px-0 py-3 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Дополнительные пожелания..."
                    />
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex items-start space-x-3 pt-4">
                    <input
                      type="checkbox"
                      id="agreement-desktop"
                      checked={bookingData.agreed}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          agreed: e.target.checked,
                        })
                      }
                      className="mt-1 w-4 h-4 bg-transparent border border-slate-400 rounded text-orange-500 focus:ring-orange-500 focus:ring-2"
                    />
                    <Label
                      htmlFor="agreement-desktop"
                      className="text-slate-600 text-sm font-light leading-relaxed cursor-pointer"
                    >
                      Согласие на обработку персональных данных
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                    >
                      <span>ОТПРАВИТЬ</span>
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center ml-2">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
