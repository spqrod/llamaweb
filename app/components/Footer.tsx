"use client"

import Link from "next/link"
import WhatsAppIcon from "./icons/WhatsAppIcon"
import { useLanguage } from "../contexts/LanguageContext"

export default function Footer() {
  const { t, language } = useLanguage()

  const getPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Description */}
          <div>
            <Link href={getPath("/")} className="inline-block mb-4 cursor-pointer">
              <div className="text-3xl font-bold tracking-tight font-[family-name:var(--font-poppins)]">
                LLAMA<span className="text-yellow-400">WEB</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">{t.footer.tagline}</p>
            <p className="text-gray-500 text-xs mt-2 italic">{t.footer.location}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">{t.footer.navigation}</h3>
            <div className="space-y-2">
              <Link
                href={getPath("/")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.home}
              </Link>
              <Link
                href={getPath("/servicios")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.services}
              </Link>
              <Link
                href={getPath("/proyectos")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.projects}
              </Link>
              <Link
                href={getPath("/nosotros")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.about}
              </Link>
              <Link
                href={getPath("/contacto")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.contact}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">{t.footer.contact}</h3>
            <div className="space-y-3">
              <Link
                href={getPath("/contacto")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.footer.sendEmail}
              </Link>
              <a
                href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">{t.footer.legal}</h3>
            <div className="space-y-2">
              <Link
                href={getPath("/privacidad")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.privacy}
              </Link>
              <Link
                href={getPath("/terminos")}
                className="block text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.terms}
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
