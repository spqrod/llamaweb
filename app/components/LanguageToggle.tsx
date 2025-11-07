"use client"

import { useLanguage } from "../contexts/LanguageContext"

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-[#2a2a2a] rounded-full p-1">
      <button
        onClick={() => setLanguage("es")}
        className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
          language === "es" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
        }`}
        aria-label="Español"
      >
        ES
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer ${
          language === "en" ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
        }`}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
