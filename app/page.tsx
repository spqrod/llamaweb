"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CloseIcon from "./components/icons/CloseIcon"
import MobileIcon from "./components/icons/MobileIcon"
import LightningIcon from "./components/icons/LightningIcon"
import ShieldIcon from "./components/icons/ShieldIcon"
import SearchIcon from "./components/icons/SearchIcon"
import ChatIcon from "./components/icons/ChatIcon"
import WhatsAppIcon from "./components/icons/WhatsAppIcon"
import HandshakeIcon from "./components/icons/HandshakeIcon"
import { sendContactEmail } from "./actions/send-email"
import { services } from "./data/services"
import ProjectDialog from "./components/ProjectDialog"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesAnimated, setServicesAnimated] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentSlide, setCurrentSlide] = useState(0) // Track current slide for highlighting

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
    if (menuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !headerVisible) {
        setHeaderVisible(true)
      }

      if (servicesRef.current && !servicesAnimated) {
        const rect = servicesRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.7) {
          setTimeout(() => {
            setServicesAnimated(true)
          }, 1500)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headerVisible, servicesAnimated])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20
      const y = (e.clientY / window.innerHeight - 0.5) * 20
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    console.log("[v0] Home page loaded")
    setFormMountTime(Date.now())

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const handleScroll = () => {
      const scrollPosition = slider.scrollLeft
      const slideWidth = slider.clientWidth
      const newSlide = Math.round(scrollPosition / slideWidth)
      setCurrentSlide(newSlide)
    }

    slider.addEventListener("scroll", handleScroll)
    return () => slider.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth
      sliderRef.current.scrollBy({ left: -slideWidth, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.clientWidth
      sliderRef.current.scrollBy({ left: slideWidth, behavior: "smooth" })
    }
  }

  const projects = [
    {
      id: 1,
      name: "Dr. Zakharenko",
      category: "Veterinaria",
      description: "Sitio web profesional para consultorio veterinario con sistema de turnos online.",
      image: "/projects/drzakharenko-1.webp",
      screenshots: ["/projects/drzakharenko-1.webp", "/projects/drzakharenko-2.webp", "/projects/drzakharenko-3.webp"],
      url: "https://drzakharenko.com.ar",
    },
    {
      id: 2,
      name: "Kalahari Biocare",
      category: "E-commerce",
      description: "Tienda online de productos naturales y cosméticos con carrito de compras integrado.",
      image: "/projects/kalahari-1.webp",
      screenshots: ["/projects/kalahari-1.webp", "/projects/kalahari-2.webp", "/projects/kalahari-3.webp"],
      url: "https://kalaharibiocare.com",
    },
    {
      id: 3,
      name: "Abogado",
      category: "Legal",
      description: "Sitio web profesional para estudio jurídico con información de servicios legales.",
      image: "/projects/abogado-1.webp",
      screenshots: ["/projects/abogado-1.webp", "/projects/abogado-2.webp", "/projects/abogado-3.webp"],
      url: "https://abogado-demo-2.vercel.app",
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Dr. Zakharenko",
      role: "Veterinario",
      company: "Consultorio Veterinario",
      text: "Excelente trabajo. El sitio web superó mis expectativas y mis clientes ahora pueden agendar turnos fácilmente. Muy profesionales y rápidos.",
      image: "/testimonials/zakharenko.webp",
    },
    {
      id: 2,
      name: "Monica Robson",
      role: "Directora",
      company: "Kalahari Biocare",
      text: "Nuestra tienda online está funcionando perfectamente. Totalmente recomendados.",
      image: "/testimonials/monica.webp",
    },
    {
      id: 3,
      name: "Dr. Mendoza",
      role: "Abogado",
      company: "Consultorio particular",
      text: "El equipo de Llama Web transformó nuestra visión en realidad. El sitio es moderno, rápido y exactamente lo que necesitábamos para crecer.",
      image: "/testimonials/carlos.jpg",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Home page contact form submission started")
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const result = await sendContactEmail({
        ...formData,
        honeypot,
        timestamp: formMountTime,
      })

      if (result.success) {
        console.log("[v0] Home page contact form submitted successfully")
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
        console.error("[v0] Home page contact form error:", result.error)
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("[v0] Home page form exception:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      <div className="relative">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:pb-0 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-1.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/30 via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column on Desktop - Header and Content */}
              <div className="w-full space-y-6 md:space-y-8 text-center lg:text-left">
                {/* Header */}
                <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                  <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest">DIGITAL HECHO BIEN</p>
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight font-[family-name:var(--font-poppins)]">
                    LANZAMOS SITIOS WEB
                  </h1>
                </div>

                {/* Content - Hidden on mobile, shown on desktop */}
                <div className="hidden lg:block space-y-4 md:space-y-6 text-left">
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    Creamos sitios web modernos y profesionales que impulsan tu negocio. Diseño, desarrollo y
                    lanzamiento de tu presencia digital en tiempo récord.
                  </p>
                  <button
                    onClick={scrollToContact}
                    className="px-6 md:px-8 py-3 md:py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
                  >
                    Tu sitio web en 3 días
                  </button>
                </div>
              </div>

              {/* Right Column on Desktop - Image */}
              <div className="flex justify-center">
                <img
                  src="/llama-floating-in-space.webp"
                  alt="Llama Astronauta"
                  className="w-64 md:w-96 lg:w-full max-w-lg h-auto object-contain animate-float-3d"
                />
              </div>

              {/* Content - Shown on mobile only */}
              <div className="w-full lg:hidden space-y-4 md:space-y-6 text-center">
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  Creamos sitios web modernos y profesionales que impulsan tu negocio. Diseño, desarrollo y lanzamiento
                  de tu presencia digital en tiempo récord.
                </p>
                <button
                  onClick={scrollToContact}
                  className="px-6 md:px-8 py-3 md:py-4 border-2 border-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
                >
                  Conectá con Nosotros
                </button>
              </div>
            </div>
          </div>

          {/* Section Number */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">01</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="relative min-h-screen bg-[#1e1e1e] py-16 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-8 md:space-y-12">
              {/* Header */}
              <div className="text-center">
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTROS SERVICIOS</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-[family-name:var(--font-poppins)]">
                  TIPOS DE SITIOS WEB QUE HACEMOS
                </h2>
              </div>

              {/* Grid for image and services */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-end">
                {/* Image - First on desktop */}
                <div className="relative flex flex-col justify-end h-full order-2 lg:order-1">
                  <div className="relative">
                    <img
                      src="/llama-with-laptop.webp"
                      alt="Llama con Laptop"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Services - Second on desktop */}
                <div className="space-y-4 md:space-y-6 order-3 lg:order-2">
                  {services.slice(0, 4).map((service, index) => (
                    <div
                      key={service.id}
                      className={`p-4 md:p-6 border-l-4 border-l-transparent border border-gray-700 rounded-lg hover:border-yellow-400 hover:border-l-yellow-400 hover:bg-yellow-400/5 transition-all duration-300 ${
                        servicesAnimated ? `animate-service-hover-${index + 1}` : ""
                      }`}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">{service.title}</h3>
                      <p className="text-gray-300 text-sm">{service.shortDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">02</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        <section className="relative py-8 bg-[#1e1e1e]">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col items-center animate-bounce">
              <p className="text-yellow-400 text-sm font-bold mb-2">SEGUÍ EXPLORANDO</p>
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Slider Section */}
        <section className="relative py-16 md:py-32 bg-[#1e1e1e]">
          <div className="container mx-auto px-4 md:px-8">
            {/* Slider Container */}
            <div className="relative">
              {/* Slider */}
              <div
                ref={sliderRef}
                className="flex gap-0 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {services.map((service, index) => (
                  <div key={service.id} className="flex-shrink-0 w-full snap-center">
                    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-[70vh] px-4 md:px-8">
                      {/* Service Name - Always first on mobile */}
                      <div className="w-full lg:hidden">
                        <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                          SERVICIO {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="text-3xl md:text-4xl font-extrabold mb-4 font-[family-name:var(--font-poppins)]">
                          {service.title}
                        </h3>
                      </div>

                      <div className="w-full lg:pl-8 flex justify-center lg:order-2 relative">
                        {/* Mobile arrows - positioned on image, more transparent */}
                        {currentSlide > 0 && (
                          <button
                            onClick={scrollLeft}
                            className="lg:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-yellow-400/50 hover:bg-yellow-400/70 text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-yellow-400/50"
                            aria-label="Servicio anterior"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                        )}

                        {currentSlide < services.length - 1 && (
                          <button
                            onClick={scrollRight}
                            className="lg:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-yellow-400/50 hover:bg-yellow-400/70 text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border-2 border-yellow-400/50"
                            aria-label="Siguiente servicio"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}

                        <div className="relative perspective-1000 w-full max-w-lg">
                          <div
                            className="transform transition-transform duration-200 ease-out"
                            style={{
                              transform: `perspective(1000px) rotateY(${-12 + mousePosition.x * 0.3}deg) rotateX(${5 + mousePosition.y * 0.3}deg)`,
                            }}
                          >
                            <img
                              src={`/services/${service.slug}.png`}
                              alt={service.title}
                              className="w-full h-auto object-contain rounded-xl"
                              style={{
                                boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.4), -3px -3px 12px rgba(250, 204, 21, 0.05)",
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Text Content - Third on mobile (description, time/price, button), first on desktop */}
                      <div className="w-full space-y-6 lg:order-1">
                        {/* Service Name - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:block">
                          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                            SERVICIO {String(index + 1).padStart(2, "0")}
                          </p>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 font-[family-name:var(--font-poppins)]">
                            {service.title}
                          </h3>
                        </div>

                        {/* Description */}
                        <p className="text-lg text-gray-300 mb-6">{service.description}</p>

                        {/* Time and Price */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg">
                            <span className="text-gray-400">Tiempo: </span>
                            <span className="text-white font-bold">{service.time}</span>
                          </div>
                          <div className="px-4 py-2 bg-[#2a2a2a] border border-gray-700 rounded-lg">
                            <span className="text-gray-400">Precio: </span>
                            <span className="text-yellow-400 font-bold">{service.price}</span>
                          </div>
                        </div>

                        {/* Button */}
                        <Link
                          href="/servicios"
                          className="inline-block px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold"
                        >
                          Ver Más Detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {currentSlide > 0 && (
                <button
                  onClick={scrollLeft}
                  className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-full items-center justify-center transition-all duration-300 shadow-lg border-2 border-yellow-400"
                  aria-label="Servicio anterior"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {currentSlide < services.length - 1 && (
                <button
                  onClick={scrollRight}
                  className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-14 h-14 bg-yellow-400/80 hover:bg-yellow-400 text-black rounded-full items-center justify-center transition-all duration-300 shadow-lg border-2 border-yellow-400"
                  aria-label="Siguiente servicio"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}

              {/* Slider Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (sliderRef.current) {
                        const scrollAmount = sliderRef.current.clientWidth * index
                        sliderRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" })
                      }
                    }}
                    className={`w-3 h-3 rounded-full border-2 border-yellow-400 transition-all duration-300 ${
                      currentSlide === index ? "bg-yellow-400 scale-125" : "hover:bg-yellow-400"
                    }`}
                    aria-label={`Ir a servicio ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">03</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative min-h-screen py-16 md:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col gap-8 md:gap-12">
              {/* Header - Always first */}
              <div className="text-center">
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">POR QUÉ ELEGIRNOS</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                  BENEFICIOS DE NUESTROS SITIOS WEB
                </h2>
                <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                  Creamos experiencias digitales que impulsan tu negocio hacia el futuro
                </p>
              </div>

              {/* Grid for image and benefits */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
                {/* Image - Second on mobile, last on desktop */}
                <div className="flex justify-center items-end lg:order-2">
                  <img
                    src="/llama-floating-in-space-2.webp"
                    alt="Llama Flotando"
                    className="w-64 md:w-80 lg:w-full max-w-md h-auto object-contain"
                  />
                </div>

                {/* Benefits List - Third on mobile, first on desktop */}
                <div className="space-y-4 md:space-y-6 lg:order-1">
                  {/* Benefit 1 - LLAMA Guarantee */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <HandshakeIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">La Garantía LLAMA de 10 Años</h3>
                      <p className="text-gray-300 text-sm">
                        Garantizamos que tu sitio web estará funcionando. Y si algo se rompe, lo arreglamos sin costo
                        alguno para vos.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 - Responsive Design */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <MobileIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Diseño Responsive</h3>
                      <p className="text-gray-300 text-sm">
                        Perfectamente adaptado a todos los dispositivos: móviles, tablets y escritorio.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 - Speed */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <LightningIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Velocidad Extrema</h3>
                      <p className="text-gray-300 text-sm">
                        Sitios optimizados que cargan en menos de 2 segundos, mejorando la experiencia del usuario.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 4 - Security */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <ShieldIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Seguridad Máxima</h3>
                      <p className="text-gray-300 text-sm">
                        Protección avanzada contra amenazas con certificados SSL y encriptación.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 5 - SEO */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <SearchIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">SEO Optimizado</h3>
                      <p className="text-gray-300 text-sm">
                        Configuración técnica perfecta para que Google te encuentre y posicione.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 6 - Support */}
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-[#2a2a2a]/60 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <ChatIcon className="text-yellow-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Soporte Continuo</h3>
                      <p className="text-gray-300 text-sm">
                        Asistencia técnica permanente para resolver cualquier duda o problema.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">04</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        <section className="relative py-16 md:py-32 bg-[#1e1e1e]">
          <div className="container mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">TESTIMONIOS</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                LO QUE DICEN NUESTROS CLIENTES
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                La satisfacción de nuestros clientes es nuestra mejor carta de presentación
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-[#2a2a2a] border border-gray-700 rounded-lg p-6 md:p-8 hover:border-yellow-400 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg?height=64&width=64"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <p className="text-xs text-yellow-400">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">04</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative min-h-screen bg-[#1e1e1e] py-16 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTRO TRABAJO</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                PROYECTOS REALIZADOS
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
                Mirá algunos de los sitios web que hemos creado para nuestros clientes
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className="group relative overflow-hidden rounded-lg border border-gray-700 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-6 bg-[#2a2a2a]/70">
                    <span className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">{project.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-[#1e1e1e]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-xs md:text-sm text-yellow-400 font-bold">Click para ver más</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="text-center">
              <Link
                href="/proyectos"
                className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
              >
                Ver Todos los Proyectos
              </Link>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">05</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-[#1e1e1e]/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div className="relative w-full max-w-6xl h-[85vh]">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute -top-6 -right-6 z-10 bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg cursor-pointer"
                aria-label="Cerrar"
              >
                <CloseIcon />
              </button>
              <ProjectDialog
                project={projects.find((p) => p.id === selectedProject) || null}
                onClose={() => setSelectedProject(null)}
              />
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section ref={contactRef} className="relative min-h-screen py-16 md:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-3.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e] via-[#1e1e1e]/50 to-[#1e1e1e]"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              {/* Left Column - Info */}
              <div className="w-full space-y-6 md:space-y-8 text-center lg:text-left">
                <div>
                  <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">HABLEMOS</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                    EMPECEMOS TU PROYECTO
                  </h2>
                </div>
                <div className="flex gap-4 justify-center lg:justify-start">
                  <a
                    href="https://wa.me/5491158979663?text=Hola!%20Me%20interesa%20crear%20un%20sitio%20web%20para%20mi%20negocio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="bg-[#2a2a2a]/60 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-700">
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
                    <label htmlFor="home-name" className="block text-sm font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="home-name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-email" className="block text-sm font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="home-email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-phone" className="block text-sm font-bold mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="home-phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-white"
                      placeholder="+54 11 1234 5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="home-message" className="block text-sm font-bold mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="home-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#1e1e1e]/70 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-white"
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

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">06</span>
            <span className="text-gray-500"> / 06</span>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
