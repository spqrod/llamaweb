"use client"

import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProjectsSection from "../components/ProjectsSection"
import { useLanguage } from "../contexts/LanguageContext"

export default function ProjectsPage() {
  const { t, language } = useLanguage()

  const getPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/30 via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">{t.projects.heroHeading}</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            {t.projects.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">{t.projects.heroDescription}</p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-32 bg-[#1e1e1e]">
        <ProjectsSection showAll={true} showHeader={false} showCTA={false} />
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            {t.projects.ctaTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t.projects.ctaDescription}</p>
          <Link
            href={getPath("/contacto")}
            className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold cursor-pointer"
          >
            {t.projects.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
