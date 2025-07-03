"use client"

import type React from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn"
  delay?: number
}

export function AnimatedSection({ children, className = "", animation = "fadeInUp", delay = 0 }: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  })

  const animationClasses = {
    fadeInUp: isIntersecting ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0",
    fadeInLeft: isIntersecting ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0",
    fadeInRight: isIntersecting ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0",
    fadeIn: isIntersecting ? "opacity-100" : "opacity-0",
    scaleIn: isIntersecting ? "scale-100 opacity-100" : "scale-95 opacity-0",
  }

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
