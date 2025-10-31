"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ClockIcon from "../components/icons/ClockIcon"
import DollarIcon from "../components/icons/DollarIcon"
import CheckCircleIcon from "../components/icons/CheckCircleIcon"
import MobileIcon from "../components/icons/MobileIcon"
import LightningIcon from "../components/icons/LightningIcon"
import ShieldIcon from "../components/icons/ShieldIcon"
import SearchIcon from "../components/icons/SearchIcon"
import WhatsAppIcon from "../components/icons/WhatsAppIcon"
import { services } from "../data/services"
import { sendContactEmail } from "../actions/send-email"

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0)
  const [showNavigation, setShowNavigation] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const heroRef = useRef<HTMLDivElement>(null)

  const serviceImages: Record<string, string> = {
    "landing-page": "/services/landing-page.png",
    "sitio-web-institucional": "/services/sitio-web-institucional.png",
    "tienda-online": "/services/tienda-online.png",
    crm: "/services/crm.png",
  }

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
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    setFormMountTime(Date.now())
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && serviceRefs.current[0] && serviceRefs.current[services.length - 1]) {
        const firstServiceTop = serviceRefs.current[0].offsetTop
        const lastServiceBottom =
          serviceRefs.current[services.length - 1].offsetTop + serviceRefs.current[services.length - 1].offsetHeight

        const scrollPos = window.scrollY + window.innerHeight / 2
        setShowNavigation(scrollPos >= firstServiceTop && scrollPos <= lastServiceBottom)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observers = serviceRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveService(index)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const scrollToService = (index: number) => {
    serviceRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail({
        ...formData,
        honeypot,
        timestamp: formMountTime,
      })

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", phone: "", message: "" })
        setHoneypot("")
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <Header />

      <nav
        className={`fixed right-8 bottom-8 z-40 hidden lg:block transition-opacity duration-300 ${
          showNavigation ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#2a2a2a]/80 backdrop-blur-md border border-gray-700 rounded-lg p-3">
          <div className="flex flex-col gap-3">
            {services.map((service, index) => (
              <button
                key={service.id}
                onClick={() => scrollToService(index)}
                className={`group flex items-center gap-3 transition-all duration-300 ${
                  activeService === index ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                    activeService === index
                      ? "border-yellow-400 bg-yellow-400 scale-125"
                      : "border-gray-500 bg-transparent"
                  }`}
                />
                <span
                  className={`font-bold whitespace-nowrap transition-all duration-300 ${
                    activeService === index ? "text-yellow-400 text-sm" : "text-gray-500 text-xs"
                  }`}
                >
                  {service.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/50 via-transparent to-[#1e1e1e]/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTROS SERVICIOS</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            CREAMOS TU SITIO WEB
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Transformamos ideas en experiencias digitales que impulsan el crecimiento de tu negocio
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-[family-name:var(--font-poppins)]">
                TIPOS DE SITIOS WEB QUE HACEMOS
              </h2>
              <p className="text-gray-400">Elegí el servicio que mejor se adapte a tus necesidades</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(index)}
                  className="p-6 bg-[#2a2a2a]/50 border border-gray-700 rounded-lg hover:border-yellow-400 transition-all duration-300 text-left group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold group-hover:text-yellow-400 transition-colors">{service.title}</h3>
                    <span className="text-xs text-gray-500">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-400">{service.shortDescription}</p>
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center mt-16 animate-bounce">
              <p className="text-sm text-gray-400 mb-2">Scrolleá para ver más</p>
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1e1e1e]">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              serviceRefs.current[index] = el
            }}
            className="min-h-screen flex items-center py-16 md:py-24 bg-[#1e1e1e]"
          >
            <div className="container mx-auto px-4 md:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-6">
                  <div>
                    <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                      SERVICIO {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                      {service.title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-8">{service.description}</p>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-yellow-400 mb-4">INCLUYE:</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base text-gray-300">
                          <CheckCircleIcon className="text-yellow-400 w-5 h-5 flex-shrink-0 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <ClockIcon className="text-yellow-400 w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Tiempo</p>
                        <p className="text-lg font-bold">{service.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <DollarIcon className="text-yellow-400 w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Precio</p>
                        <p className="text-lg font-bold text-yellow-400">{service.price}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contacto"
                    className="inline-block px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold"
                  >
                    Consultar
                  </Link>
                </div>

                <div className="lg:pl-8">
                  <div className="relative perspective-1000">
                    <div
                      className="transform transition-transform duration-200 ease-out"
                      style={{
                        transform: `perspective(1000px) rotateY(${-12 + mousePosition.x * 0.3}deg) rotateX(${5 + mousePosition.y * 0.3}deg)`,
                      }}
                    >
                      <img
                        src={serviceImages[service.id] || "/placeholder.svg"}
                        alt={service.title}
                        className="w-full h-auto object-cover rounded-xl"
                        style={{
                          boxShadow: "20px 20px 60px rgba(0, 0, 0, 0.8), -10px -10px 40px rgba(250, 204, 21, 0.1)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 md:py-32 bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
              TODOS SERVICIOS VIENEN CON:
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            <div className="flex justify-center order-2 lg:order-1">
              <img
                src="/llama-with-laptop.webp"
                alt="Llama con Laptop"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Diseño Personalizado a tu Marca</h3>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <ShieldIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">La Garantía de 10 Años</h3>
                  <p className="text-gray-300 text-sm">
                    Garantizamos que tu sitio web estará funcionando bien por 10 años. Y si algo se rompe, lo arreglamos
                    sin costo alguno para vos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Dominio tumarca.com.ar, Hosting Premium y Correo Corporativo
                  </h3>
                  <p className="text-gray-300 text-sm">Por 1 año GRATIS</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <MobileIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Diseño Responsivo</h3>
                  <p className="text-gray-300 text-sm">
                    Perfectamente adaptado a todos los dispositivos: móviles, tablets y escritorio.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <LightningIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Velocidad Extrema</h3>
                  <p className="text-gray-300 text-sm">
                    Sitios optimizados que cargan en menos de 3 segundos, mejorando la experiencia del usuario.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <ShieldIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Seguridad Máxima</h3>
                  <p className="text-gray-300 text-sm">
                    Protección avanzada contra amenazas con certificados SSL y encriptación.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <SearchIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">SEO Optimizado</h3>
                  <p className="text-gray-300 text-sm">
                    Configuración técnica perfecta para que Google te encuentre y posicione.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen py-16 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-3.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/50 via-transparent to-[#1e1e1e]/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div>
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">HABLEMOS</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                  EMPECEMOS TU PROYECTO
                </h2>
                <p className="text-base md:text-lg text-gray-300">
                  ¿Tenés una idea? Estamos listos para hacerla realidad. Contactanos y llevemos tu negocio al siguiente
                  nivel.
                </p>
              </div>
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://wa.me/5491158979663?text=Hola!%20Me%20interesa%20crear%20un%20sitio%20web%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold text-sm md:text-base"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="bg-[#2a2a2a]/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-700">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">O completá el formulario</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label htmlFor="services-name" className="block text-sm font-bold mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="services-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="services-email" className="block text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="services-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="services-phone" className="block text-sm font-bold mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="services-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder="+54 11 1234 5678"
                  />
                </div>
                <div>
                  <label htmlFor="services-message" className="block text-sm font-bold mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="services-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-white"
                    placeholder="Contanos sobre tu proyecto..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>

                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center text-sm">
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center text-sm">
                    Error al enviar. Intentá de nuevo o contactanos por WhatsApp.
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
