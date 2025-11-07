"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import WhatsAppIcon from "../components/icons/WhatsAppIcon"
import LocationIcon from "../components/icons/LocationIcon"
import { sendContactEmail } from "../actions/send-email"
import { useLanguage } from "../contexts/LanguageContext"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [honeypot, setHoneypot] = useState("")
  const [formMountTime, setFormMountTime] = useState<number>(0)

  useEffect(() => {
    setFormMountTime(Date.now())
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact page form submission started")
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail({
        ...formData,
        honeypot,
        timestamp: formMountTime,
      })

      if (result.success) {
        console.log("[v0] Contact page form submitted successfully")
        setSubmitStatus("success")

        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "conversion", {
            send_to: "AW-17685819489/BsZ4CIfmtrcbEOHgoPFB",
            value: 1.0,
            currency: "ARS",
          })
        }

        setFormData({ name: "", email: "", phone: "", message: "" })
        setHoneypot("")
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        console.error("[v0] Contact page form error:", result.error)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Contact page form exception:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      {/* Contact Info Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-1.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/30 via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column - Info */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">{t.contact.heading}</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                  {t.contact.title}
                </h1>
                <p className="text-base md:text-lg text-gray-300">{t.contact.heroDescription}</p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="text-yellow-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.contact.whatsappLabel}</p>
                    <p className="font-bold">{t.contact.whatsappNumber}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="text-yellow-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{t.contact.locationLabel}</p>
                    <p className="font-bold">{t.contact.locationAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center mt-8 lg:mt-0">
              <img
                src="/llama-with-iphone.webp"
                alt="Llama con iPhone"
                className="w-64 md:w-full max-w-md h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                {t.contact.formHeading}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                {t.contact.formSubtitle}
              </h2>
              <p className="text-base md:text-lg text-gray-300">{t.contact.formDescription}</p>
            </div>

            <div className="bg-[#2a2a2a]/60 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                    {t.contact.successMessage}
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                    {t.contact.errorMessageAlt}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
