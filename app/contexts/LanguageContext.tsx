"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { translations, type Language, type TranslationKeys } from "../lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationKeys
  getPath: (path: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const spanishToEnglishPaths: { [key: string]: string } = {
  "/servicios": "/services",
  "/proyectos": "/projects",
  "/nosotros": "/about",
  "/contacto": "/contact",
  "/privacidad": "/privacy",
  "/terminos": "/terms",
}

const englishToSpanishPaths: { [key: string]: string } = Object.fromEntries(
  Object.entries(spanishToEnglishPaths).map(([sp, en]) => [en, sp]),
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const getLanguageFromPath = (): Language => {
    if (pathname.startsWith("/en")) {
      return "en"
    }
    return "es"
  }

  const [language, setLanguageState] = useState<Language>(getLanguageFromPath())

  useEffect(() => {
    const langFromPath = getLanguageFromPath()
    setLanguageState(langFromPath)
    document.documentElement.lang = langFromPath
  }, [pathname])

  const setLanguage = (lang: Language) => {
    const currentLang = getLanguageFromPath()
    if (currentLang === lang) return

    // Convert current path to new language path
    if (lang === "en") {
      // Switch to English: add /en prefix and translate path
      const pathWithoutEn = pathname
      let translatedPath = pathWithoutEn
      Object.entries(spanishToEnglishPaths).forEach(([spanish, english]) => {
        translatedPath = translatedPath.replace(spanish, english)
      })
      const newPath = translatedPath === "/" ? "/en" : `/en${translatedPath}`
      router.push(newPath)
    } else {
      // Switch to Spanish: remove /en prefix and translate path back
      const pathWithoutEn = pathname.replace(/^\/en/, "") || "/"
      let translatedPath = pathWithoutEn
      Object.entries(englishToSpanishPaths).forEach(([english, spanish]) => {
        translatedPath = translatedPath.replace(english, spanish)
      })
      router.push(translatedPath)
    }
  }

  const getPath = (path: string): string => {
    if (language === "en") {
      let translatedPath = path
      Object.entries(spanishToEnglishPaths).forEach(([spanish, english]) => {
        translatedPath = translatedPath.replace(spanish, english)
      })
      return `/en${translatedPath}`
    }
    return path
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    getPath,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
