"use client"

import type React from "react"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import WhatsAppIcon from "../components/icons/WhatsAppIcon"
import LocationIcon from "../components/icons/LocationIcon"
import { sendContactEmail } from "../actions/send-email"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Contact page form submission started")
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail(formData)

      if (result.success) {
        console.log("[v0] Contact page form submitted successfully")
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
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
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Contact Info Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-1.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Left Column - Info */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">HABLEMOS</p>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                  EMPECEMOS TU PROYECTO
                </h1>
                <p className="text-base md:text-lg text-gray-300">
                  ¿Tenés una idea? Estamos listos para hacerla realidad. Contactanos y llevemos tu negocio al siguiente
                  nivel.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <a
                  href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="text-yellow-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">WhatsApp</p>
                    <p className="font-bold">+54 11 5897 9663</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800">
                  <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                    <LocationIcon className="text-yellow-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Ubicación</p>
                    <p className="font-bold">Buenos Aires, Argentina</p>
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">FORMULARIO</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                O ENVIANOS UN MENSAJE
              </h2>
              <p className="text-base md:text-lg text-gray-300">
                Completá el formulario y te contactaremos a la brevedad
              </p>
            </div>

            <div className="bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors"
                    placeholder="+54 11 1234 5678"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder="Contanos sobre tu proyecto..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                    Error al enviar el mensaje. Por favor, intentá de nuevo o contactanos por WhatsApp.
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
