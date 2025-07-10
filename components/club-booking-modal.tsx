"use client";

import type React from "react";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { X, Home, ArrowRight } from "lucide-react";

interface ClubBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClubBookingModal({ isOpen, onClose }: ClubBookingModalProps) {
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
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
      !bookingData.time
    ) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (!bookingData.agreed) {
      alert("Необходимо согласие на обработку персональных данных");
      return;
    }

    // Проверка дня недели (пятница-воскресенье)
    const selectedDate = new Date(bookingData.date);
    const selectedDay = selectedDate.getDay();
    if (selectedDay < 5 && selectedDay !== 0) {
      alert("Клуб работает только с пятницы по воскресенье");
      return;
    }

    console.log("Club table booking:", bookingData);
    alert("Заявка отправлена! Мы свяжемся с вами в течение 15 минут.");

    // Сброс формы
    setBookingData({
      name: "",
      phone: "",
      date: "",
      time: "",
      agreed: false,
    });

    handleClose();
  };

  const getAvailableTimes = useCallback(() => {
    if (!bookingData.date) return [];

    const selectedDate = new Date(bookingData.date);
    const selectedDay = selectedDate.getDay();
    const today = new Date();
    const isToday = bookingData.date === format(today, "yyyy-MM-dd");
    const currentHour = today.getHours();

    let times = [];

    if (selectedDay === 0) {
      // Воскресенье: 20:00 - 02:00
      times = [
        "20:00",
        "20:30",
        "21:00",
        "21:30",
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
      ];
    } else {
      // Пятница-Суббота: 22:00 - 06:00
      times = [
        "22:00",
        "22:30",
        "23:00",
        "23:30",
        "00:00",
        "00:30",
        "01:00",
        "01:30",
        "02:00",
        "02:30",
        "03:00",
        "03:30",
        "04:00",
        "04:30",
        "05:00",
        "05:30",
        "06:00",
      ];
    }

    // Фильтруем прошедшие часы для сегодняшнего дня
    if (isToday) {
      times = times.filter((time) => {
        const timeHour = Number.parseInt(time.split(":")[0]);
        const adjustedHour = timeHour < 12 ? timeHour + 24 : timeHour;
        return adjustedHour > currentHour + 1;
      });
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
        className={`absolute inset-0 bg-black transition-opacity duration-500 ease-out ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full h-full bg-black text-white transition-all duration-700 ease-out overflow-y-auto ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header - Fixed */}
        <div
          className={`sticky top-0 z-10 bg-black/90 backdrop-blur-sm border-b border-white/10 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between transition-all duration-700 delay-200 ease-out ${
            isAnimating
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors p-2 -ml-2"
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <h1 className="text-sm sm:text-base lg:text-lg font-light tracking-[0.2em] sm:tracking-[0.3em] text-center">
            БРОНИРОВАНИЕ
          </h1>

          <button
            onClick={handleClose}
            className="text-white hover:text-gray-300 transition-colors p-2 -mr-2"
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
                  <h2 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight mb-4">
                    NA DUBROVKE
                    <br />
                    <span className="block">ЖДЕТ ВАС</span>
                  </h2>
                  <p className="text-sm text-white/60 mb-2">
                    +375 (29) 123-45-67
                  </p>
                </div>

                {/* Form for Mobile */}
                <div
                  className={`transition-all duration-700 delay-400 ease-out ${
                    isAnimating
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <h3 className="text-base font-light tracking-wide mb-6 text-center">
                    ЗАБРОНИРОВАТЬ СТОЛИК
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label className="text-white/60 text-sm font-light tracking-wide">
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
                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/40 focus:border-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label className="text-white/60 text-sm font-light tracking-wide">
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
                        className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/40 focus:border-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                        placeholder=""
                        required
                      />
                    </div>

                    {/* Date and Time - Side by side on mobile */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white/60 text-sm font-light tracking-wide">
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
                          className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus:border-white focus:outline-none transition-colors [color-scheme:dark] text-sm"
                          min={format(new Date(), "yyyy-MM-dd")}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white/60 text-sm font-light tracking-wide">
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
                          className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer text-sm"
                          disabled={!bookingData.date}
                          required
                        >
                          <option value="" className="bg-gray-900 text-white">
                            {bookingData.date ? "Время" : "Дата"}
                          </option>
                          {getAvailableTimes().map((time) => (
                            <option
                              key={time}
                              value={time}
                              className="bg-gray-900 text-white"
                            >
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
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
                        className="mt-1 w-4 h-4 bg-transparent border border-white/40 rounded text-amber-500 focus:ring-amber-500 focus:ring-2"
                      />
                      <Label
                        htmlFor="agreement-mobile"
                        className="text-white/60 text-xs font-light leading-relaxed cursor-pointer"
                      >
                        Согласие на обработку персональных данных
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
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
                <h2 className="text-6xl xl:text-7xl 2xl:text-8xl font-black leading-none tracking-tight">
                  NA DUBROVKE
                  <br />
                  <span className="block mt-4">ЖДЕТ ВАС</span>
                </h2>

                {/* Phone Number */}
                <div className="mt-16 xl:mt-24 2xl:mt-32">
                  <p className="text-lg xl:text-xl font-light">
                    +375 (29) 123-45-67
                  </p>
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
                <h3 className="text-xl font-light tracking-wide mb-12">
                  ЗАБРОНИРОВАТЬ СТОЛИК
                </h3>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label className="text-white/60 text-sm font-light tracking-wide">
                      Имя
                    </Label>
                    <Input
                      value={bookingData.name}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, name: e.target.value })
                      }
                      className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/40 focus:border-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      placeholder=""
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="text-white/60 text-sm font-light tracking-wide">
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
                      className="bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white placeholder:text-white/40 focus:border-white focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 outline-none"
                      placeholder=""
                      required
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2">
                    <Label className="text-white/60 text-sm font-light tracking-wide">
                      Дата
                    </Label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, date: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus:border-white focus:outline-none transition-colors [color-scheme:dark]"
                      min={format(new Date(), "yyyy-MM-dd")}
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="space-y-2">
                    <Label className="text-white/60 text-sm font-light tracking-wide">
                      Время
                    </Label>
                    <select
                      value={bookingData.time}
                      onChange={(e) =>
                        setBookingData({ ...bookingData, time: e.target.value })
                      }
                      className="w-full bg-transparent border-0 border-b border-white/20 rounded-none px-0 py-3 text-white focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      disabled={!bookingData.date}
                      required
                    >
                      <option value="" className="bg-gray-900 text-white">
                        {bookingData.date
                          ? "Выберите время"
                          : "Сначала выберите дату"}
                      </option>
                      {getAvailableTimes().map((time) => (
                        <option
                          key={time}
                          value={time}
                          className="bg-gray-900 text-white"
                        >
                          {time}
                        </option>
                      ))}
                    </select>
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
                      className="mt-1 w-4 h-4 bg-transparent border border-white/40 rounded text-amber-500 focus:ring-amber-500 focus:ring-2"
                    />
                    <Label
                      htmlFor="agreement-desktop"
                      className="text-white/60 text-sm font-light leading-relaxed cursor-pointer"
                    >
                      Согласие на обработку персональных данных
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-8 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-105"
                    >
                      <span>ОТПРАВИТЬ</span>
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center ml-2">
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
