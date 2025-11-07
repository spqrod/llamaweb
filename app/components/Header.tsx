"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import WhatsAppIcon from "./icons/WhatsAppIcon"
import CloseIcon from "./icons/CloseIcon"
import { useLanguage } from "../contexts/LanguageContext"
import LanguageToggle from "./LanguageToggle"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === "/" || pathname === "/en"
  const { t, getPath } = useLanguage()

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault()
      scrollToTop()
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-black/80 backdrop-blur-sm">
        <Link
          href={getPath("/")}
          onClick={handleLogoClick}
          className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity font-[family-name:var(--font-poppins)] cursor-pointer"
        >
          LLAMA<span className="text-yellow-400">WEB</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <a
            href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition-colors cursor-pointer"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
          <LanguageToggle />
          <Link
            href={getPath("/servicios")}
            className="text-base font-medium hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
          >
            {t.nav.services}
          </Link>
          <Link
            href={getPath("/proyectos")}
            className="text-base font-medium hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
          >
            {t.nav.projects}
          </Link>
          <Link
            href={getPath("/nosotros")}
            className="text-base font-medium hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
          >
            {t.nav.about}
          </Link>
          <Link
            href={getPath("/contacto")}
            className="text-base font-medium hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
          >
            {t.nav.contact}
          </Link>
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="lg:hidden flex flex-col gap-1.5 w-8 hover:opacity-70 transition-opacity cursor-pointer"
        >
          <span className="h-0.5 w-full bg-white"></span>
          <span className="h-0.5 w-full bg-white"></span>
          <span className="h-0.5 w-full bg-white"></span>
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-black/90 backdrop-blur-md border-l border-gray-800 transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-8">
            <div className="flex items-center justify-between mb-12">
              <Link
                href={getPath("/")}
                onClick={() => {
                  setMenuOpen(false)
                  if (isHome) scrollToTop()
                }}
                className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity font-[family-name:var(--font-poppins)] cursor-pointer"
              >
                LLAMA<span className="text-yellow-400">WEB</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="mb-8">
              <LanguageToggle />
            </div>

            <nav className="space-y-6">
              <Link
                href={getPath("/servicios")}
                onClick={() => setMenuOpen(false)}
                className="block text-3xl font-bold hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
              >
                {t.nav.services}
              </Link>
              <Link
                href={getPath("/proyectos")}
                onClick={() => setMenuOpen(false)}
                className="block text-3xl font-bold hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
              >
                {t.nav.projects}
              </Link>
              <Link
                href={getPath("/nosotros")}
                onClick={() => setMenuOpen(false)}
                className="block text-3xl font-bold hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
              >
                {t.nav.about}
              </Link>
              <Link
                href={getPath("/contacto")}
                onClick={() => setMenuOpen(false)}
                className="block text-3xl font-bold hover:text-yellow-400 transition-colors font-[family-name:var(--font-poppins)] cursor-pointer"
              >
                {t.nav.contact}
              </Link>
            </nav>

            <div className="mt-12 pt-12 border-t border-gray-800">
              <a
                href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors cursor-pointer"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            </div>

            <div className="mt-8">
              <Link
                href={getPath("/privacidad")}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-400 hover:text-white transition-colors mb-2 cursor-pointer"
              >
                {t.nav.privacy}
              </Link>
              <Link
                href={getPath("/terminos")}
                onClick={() => setMenuOpen(false)}
                className="block text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                {t.nav.terms}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
