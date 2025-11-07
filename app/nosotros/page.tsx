"use client"

import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useLanguage } from "../contexts/LanguageContext"

export default function AboutPage() {
  const { t, language } = useLanguage()

  const getPath = (path: string) => {
    return language === "en" ? `/en${path}` : path
  }

  const team = [
    {
      name: t.about.member1Name,
      role: t.about.member1Role,
      description: t.about.member1Description,
      image: "/teammembers/rodion.webp",
    },
    {
      name: t.about.member2Name,
      role: t.about.member2Role,
      description: t.about.member2Description,
      image: "/teammembers/max.webp",
    },
    {
      name: t.about.member3Name,
      role: t.about.member3Role,
      description: t.about.member3Description,
      image: "/teammembers/eugenio.webp",
    },
  ]

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-3.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/30 via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">{t.about.heroHeading}</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            {t.about.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">{t.about.heroDescription}</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-32 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 md:mb-12">
              <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                {t.about.storyHeading}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-[family-name:var(--font-poppins)]">
                {t.about.storyTitle}
              </h2>
            </div>

            <div className="space-y-6 text-base md:text-lg text-gray-300 leading-relaxed">
              <p>{t.about.storyP1}</p>
              <p>{t.about.storyP2}</p>
              <p>{t.about.storyP3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">{t.about.teamHeading}</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
              {t.about.teamTitle}
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">{t.about.teamDescription}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-[#2a2a2a]/70 border border-gray-700 rounded-lg hover:border-yellow-400 transition-all duration-300 text-center"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-6 rounded-full overflow-hidden border-4 border-yellow-400">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">{member.name}</h3>
                <p className="text-yellow-400 text-sm md:text-base font-bold mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm md:text-base">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            {t.about.ctaTitle}
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{t.about.ctaDescription}</p>
          <Link
            href={getPath("/contacto")}
            className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold"
          >
            {t.about.ctaButton}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
