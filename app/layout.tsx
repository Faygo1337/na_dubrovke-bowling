import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Na Dubrovke - Боулинг и Клуб в Могилеве",
  description: "Лучший боулинг-клуб в Могилеве. Боулинг, ресторан, бар и развлечения для всей семьи.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
          {children}
          {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
