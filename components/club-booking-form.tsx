"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

export function ClubBookingForm() {
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    date: undefined as Date | undefined,
    time: "",
    guests: "",
    tableType: "",
    specialRequests: "",
    occasion: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Валидация
    if (!bookingData.name || !bookingData.phone || !bookingData.date || !bookingData.time || !bookingData.guests) {
      alert("Пожалуйста, заполните все обязательные поля")
      return
    }

    // Проверка даты (только четверг-воскресенье)
    const selectedDay = bookingData.date.getDay()
    if (selectedDay < 4 && selectedDay !== 0) {
      alert("Клуб работает только с четверга по воскресенье")
      return
    }

    // Проверка времени
    const timeHour = Number.parseInt(bookingData.time.split(":")[0])
    if (selectedDay === 0 && (timeHour < 20 || timeHour > 2)) {
      alert("В воскресенье клуб работает с 20:00 до 02:00")
      return
    } else if (selectedDay >= 4 && (timeHour < 22 || timeHour > 6)) {
      alert("С четверга по субботу клуб работает с 22:00 до 06:00")
      return
    }

    console.log("Club table booking:", bookingData)

    alert("Заявка на бронирование стола отправлена! Наш менеджер свяжется с вами в течение 30 минут для подтверждения.")

    // Сброс формы
    setBookingData({
      name: "",
      phone: "",
      email: "",
      date: undefined,
      time: "",
      guests: "",
      tableType: "",
      specialRequests: "",
      occasion: "",
    })
  }

  const isWeekendOrThursday = (date: Date) => {
    const day = date.getDay()
    return day >= 4 || day === 0 // Четверг (4), Пятница (5), Суббота (6), Воскресенье (0)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-gray-300">
          Имя *
        </Label>
        <Input
          id="name"
          value={bookingData.name}
          onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
          placeholder="Ваше имя"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone" className="text-gray-300">
          Телефон *
        </Label>
        <Input
          id="phone"
          type="tel"
          value={bookingData.phone}
          onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
          placeholder="+375 (29) 123-45-67"
          required
        />
      </div>

      <div>
        <Label htmlFor="email" className="text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          value={bookingData.email}
          onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
          placeholder="your@email.com"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Дата *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {bookingData.date ? format(bookingData.date, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700">
              <Calendar
                mode="single"
                selected={bookingData.date}
                onSelect={(date) => setBookingData({ ...bookingData, date })}
                disabled={(date) => date < new Date() || !isWeekendOrThursday(date)}
                className="text-white"
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-gray-500 mt-1">Клуб работает Чт-Вс</p>
        </div>

        <div>
          <Label className="text-gray-300">Время *</Label>
          <Select value={bookingData.time} onValueChange={(time) => setBookingData({ ...bookingData, time })}>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Время" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="20:00">20:00</SelectItem>
              <SelectItem value="20:30">20:30</SelectItem>
              <SelectItem value="21:00">21:00</SelectItem>
              <SelectItem value="21:30">21:30</SelectItem>
              <SelectItem value="22:00">22:00</SelectItem>
              <SelectItem value="22:30">22:30</SelectItem>
              <SelectItem value="23:00">23:00</SelectItem>
              <SelectItem value="23:30">23:30</SelectItem>
              <SelectItem value="00:00">00:00</SelectItem>
              <SelectItem value="00:30">00:30</SelectItem>
              <SelectItem value="01:00">01:00</SelectItem>
              <SelectItem value="01:30">01:30</SelectItem>
              <SelectItem value="02:00">02:00</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-gray-300">Количество гостей *</Label>
          <Select value={bookingData.guests} onValueChange={(guests) => setBookingData({ ...bookingData, guests })}>
            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Гостей" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="2">2 человека</SelectItem>
              <SelectItem value="4">4 человека</SelectItem>
              <SelectItem value="6">6 человек</SelectItem>
              <SelectItem value="8">8 человек</SelectItem>
              <SelectItem value="10">10 человек</SelectItem>
              <SelectItem value="12">12+ человек</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300">Тип стола</Label>
          <Select
            value={bookingData.tableType}
            onValueChange={(tableType) => setBookingData({ ...bookingData, tableType })}
          >
            <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Выберите" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="standard">Стандарт</SelectItem>
              <SelectItem value="vip">VIP зона</SelectItem>
              <SelectItem value="premium">Премиум</SelectItem>
              <SelectItem value="private">Приватная зона</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-300">Повод для визита</Label>
        <Select value={bookingData.occasion} onValueChange={(occasion) => setBookingData({ ...bookingData, occasion })}>
          <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Выберите повод" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="birthday">День рождения</SelectItem>
            <SelectItem value="corporate">Корпоратив</SelectItem>
            <SelectItem value="date">Свидание</SelectItem>
            <SelectItem value="friends">Встреча с друзьями</SelectItem>
            <SelectItem value="celebration">Празднование</SelectItem>
            <SelectItem value="business">Деловая встреча</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="specialRequests" className="text-gray-300">
          Особые пожелания
        </Label>
        <Textarea
          id="specialRequests"
          value={bookingData.specialRequests}
          onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
          className="bg-gray-900 border-gray-700 text-white"
          rows={3}
          placeholder="Украшение стола, особые напитки, музыкальные предпочтения..."
        />
      </div>

      <div className="bg-gray-800/50 p-4 rounded-lg">
        <h4 className="text-amber-400 font-semibold mb-2">Информация о бронировании:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Бронирование подтверждается менеджером</li>
          <li>• Минимальный заказ для VIP столов - 200 BYN</li>
          <li>• Отмена бронирования за 2 часа до визита</li>
          <li>• Дресс-код: smart casual</li>
        </ul>
      </div>

      <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3">
        ОТПРАВИТЬ ЗАЯВКУ
      </Button>
    </form>
  )
}
