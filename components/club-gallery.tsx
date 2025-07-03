"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

export default function ClubGallery() {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const galleryImages = [
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 1" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 2" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 3" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 4" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 5" },
    { src: "/placeholder.svg?height=400&width=600", alt: "Интерьер клуба 6" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {galleryImages.map((image, i) => (
        <div key={i} className="relative group overflow-hidden rounded-lg">
          {!loadedImages.has(i) && <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg"></div>}
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            width={600}
            height={400}
            className={`w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 ${
              loadedImages.has(i) ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => handleImageLoad(i)}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-white" />
          </div>
        </div>
      ))}
    </div>
  )
}
