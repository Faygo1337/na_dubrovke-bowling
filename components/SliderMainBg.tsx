import React, { useState, useEffect } from "react";
import Image from "next/image";

// Слайдер фона для приветственного блока
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
  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Слайдер фон"
          fill
          priority={i === 0}
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
          style={{ pointerEvents: "none" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-transparent" />
    </>
  );
}
