import React, { useState, useEffect } from "react";
import Image from "next/image";

// План изменений:
// 1. Добавить пропс sizes для компонента Image, чтобы подбирать оптимальное разрешение под разные экраны.
// 2. Для мобильных устройств указать sizes="100vw", для планшетов и десктопов — соответствующие значения.
// 3. Установить quality=90 для Image для лучшего качества.
// 4. Оставить fill и object-cover для адаптивности.
// 5. Остальной код не трогаем.

export default function SliderBackground() {
  const images = [
    "/mainPageBg1.webp",
    "/mainPageBg2.webp",
    "/mainPageBg3.webp",
    "/mainPageBg4.webp",
    "/mainPageBg5.webp",
    "/mainPageBg6.webp",
    "/mainPageBg7.webp",
    "/mainPageBg8.webp",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // sizes: для мобильных 100vw, для планшетов 100vw, для десктопов 100vw (можно детализировать при необходимости)
  const imageSizes =
    "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw";

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Слайдер фон"
          fill
          priority={i === 0}
          quality={100}
          sizes={imageSizes}
          className={`absolute inset-48 object-cover w-full h-full transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
    </>
  );
}
