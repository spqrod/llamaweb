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
import { getServices } from "../data/services"
import { sendContactEmail } from "../actions/send-email"
import { useLanguage } from "../contexts/LanguageContext"

export default function ServicesPage() {
  // ============================================
  // LANGUAGE CONTEXT
  // ============================================
  const { t, language, getPath } = useLanguage()
  const services = getServices(language)

  // ============================================
  // STATE MANAGEMENT
  // ============================================

  // Track which service is currently in view (for navigation dots)
  const [activeService, setActiveService] = useState(0)

  // Show/hide the floating navigation based on scroll position
  const [showNavigation, setShowNavigation] = useState(false)

  // Track mouse position for 3D image effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Refs for each service section (for scroll tracking)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  // Ref for hero section (for navigation visibility)
  const heroRef = useRef<HTMLDivElement>(null)

  // Map service IDs to their image paths
  const serviceImages: Record<string, string> = {
    "landing-page": "/services/landing-page.png",
    "sitio-web-institucional": "/services/sitio-web-institucional.png",
    "tienda-online": "/services/tienda-online.png",
    crm: "/services/crm.png",
  }

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Anti-spam measures
  const [honeypot, setHoneypot] = useState("")
  const [formMountTime, setFormMountTime] = useState<number>(0)

  // ============================================
  // EFFECTS
  // ============================================

  // Track mouse movement for 3D image effect
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

  // Show/hide floating navigation based on scroll position
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

  // Track which service is currently in view using Intersection Observer
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

  // ============================================
  // HANDLERS
  // ============================================

  // Scroll to a specific service section
  const scrollToService = (index: number) => {
    serviceRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  // Handle contact form submission
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

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <Header />

      {/* ============================================ */}
      {/* FLOATING NAVIGATION (Desktop only) */}
      {/* Shows dots for each service, visible only when scrolled to services section */}
      {/* ============================================ */}
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
                {/* Navigation dot */}
                <div
                  className={`w-2 h-2 rounded-full border transition-all duration-300 ${
                    activeService === index
                      ? "border-yellow-400 bg-yellow-400 scale-125"
                      : "border-gray-500 bg-transparent"
                  }`}
                />
                {/* Service name */}
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

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* Full-screen intro with space background */}
      {/* ============================================ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/50 via-transparent to-[#1e1e1e]/80"></div>
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">{t.services.heading}</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            {t.services.heroTitle}
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">{t.services.heroDescription}</p>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICE SELECTOR SECTION */}
      {/* Grid of service cards for quick navigation */}
      {/* ============================================ */}
      <section className="py-16 md:py-24 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 font-[family-name:var(--font-poppins)]">
                {t.services.selectorHeading}
              </h2>
              <p className="text-gray-400">{t.services.selectorDescription}</p>
            </div>

            {/* Service cards grid (2 columns on desktop) */}
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

            {/* Scroll indicator */}
            <div className="flex flex-col items-center mt-16 animate-bounce">
              <p className="text-sm text-gray-400 mb-2">{t.services.scrollCta}</p>
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* INDIVIDUAL SERVICE SECTIONS */}
      {/* ============================================ */}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:items-center">
                {/* LEFT COLUMN - All text content */}
                <div className="space-y-6 md:space-y-8">
                  {/* Service number and title */}
                  <div>
                    <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                      {t.services.service} {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
                      {service.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-lg text-gray-300">{service.description}</p>

                  {/* Mobile image - shown only on mobile, between description and incluye */}
                  <div className="lg:hidden">
                    <img
                      src={serviceImages[service.id] || "/placeholder.svg"}
                      alt={service.title}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>

                  {/* Incluye list */}
                  <div>
                    <h4 className="text-sm font-bold text-yellow-400 mb-4">{t.services.includes}</h4>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base text-gray-300">
                          <CheckCircleIcon className="text-yellow-400 w-5 h-5 flex-shrink-0 mt-1" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Time and Price */}
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <ClockIcon className="text-yellow-400 w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">{t.services.time}</p>
                        <p className="text-lg font-bold">{service.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center">
                        <DollarIcon className="text-yellow-400 w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">{t.services.price}</p>
                        <p className="text-lg font-bold text-yellow-400">{service.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={getPath("/contacto")}
                    className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
                  >
                    {t.services.consult}
                  </Link>
                </div>

                {/* RIGHT COLUMN - Image (desktop only) */}
                <div className="hidden lg:block">
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

      {/* ============================================ */}
      {/* "ALL SERVICES COME WITH" SECTION */}
      {/* Lists common features included in all services */}
      {/* ============================================ */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#1e1e1e] to-[#2a2a2a]">
        <div className="container mx-auto px-4 md:px-8">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
              {t.services.allInclude}
            </h2>
          </div>

          {/* 2-column grid: image on left (desktop) / top (mobile), features list on right (desktop) / bottom (mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
            {/* Llama with laptop image */}
            <div className="flex justify-center order-2 lg:order-1">
              <img
                src="/llama-with-laptop.webp"
                alt="Llama con Laptop"
                className="w-full max-w-md h-auto object-contain"
              />
            </div>

            {/* Features list */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Feature: Custom Design */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{t.services.customDesign}</h3>
                </div>
              </div>

              {/* Feature: 10 Year Guarantee */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <ShieldIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.guarantee}</h3>
                  <p className="text-gray-300 text-sm">{t.services.guaranteeDescription}</p>
                </div>
              </div>

              {/* Feature: Domain, Hosting, Email */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircleIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.domainHosting}</h3>
                  <p className="text-gray-300 text-sm">{t.services.domainHostingDescription}</p>
                </div>
              </div>

              {/* Feature: Responsive Design */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <MobileIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.responsiveDesign}</h3>
                  <p className="text-gray-300 text-sm">{t.services.responsiveDescription}</p>
                </div>
              </div>

              {/* Feature: Extreme Speed */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <LightningIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.extremeSpeed}</h3>
                  <p className="text-gray-300 text-sm">{t.services.speedDescription}</p>
                </div>
              </div>

              {/* Feature: Maximum Security */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <ShieldIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.maxSecurity}</h3>
                  <p className="text-gray-300 text-sm">{t.services.securityDescription}</p>
                </div>
              </div>

              {/* Feature: SEO Optimized */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-full bg-yellow-400/10 flex items-center justify-center flex-shrink-0">
                  <SearchIcon className="text-yellow-400 w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{t.services.seoOptimized}</h3>
                  <p className="text-gray-300 text-sm">{t.services.seoDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACT SECTION */}
      {/* CTA and contact form with space background */}
      {/* ============================================ */}
      <section className="relative min-h-screen py-16 md:py-32 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img src="/space-3.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/50 via-transparent to-[#1e1e1e]/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          {/* 2-column grid: CTA text on left, contact form on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* ============================================ */}
            {/* LEFT COLUMN: CTA Text and WhatsApp button */}
            {/* ============================================ */}
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <div>
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
                  {t.services.ctaHeading}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                  {t.services.ctaTitle}
                </h2>
                <p className="text-base md:text-lg text-gray-300">{t.services.ctaDescription}</p>
              </div>

              {/* WhatsApp CTA button */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <a
                  href="https://wa.me/5491158979663?text=Hola!%20Me%20interesa%20crear%20un%20sitio%20web%20para%20mi%20negocio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold text-sm md:text-base"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  {t.contact.whatsapp}
                </a>
              </div>
            </div>

            {/* ============================================ */}
            {/* RIGHT COLUMN: Contact Form */}
            {/* ============================================ */}
            <div className="bg-[#2a2a2a]/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-700">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{t.services.formTitle}</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field (hidden, for spam prevention) */}
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

                {/* Name field */}
                <div>
                  <label htmlFor="services-name" className="block text-sm font-bold mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="services-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label htmlFor="services-email" className="block text-sm font-bold mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="services-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                {/* Phone field */}
                <div>
                  <label htmlFor="services-phone" className="block text-sm font-bold mb-2">
                    {t.contact.phone}
                  </label>
                  <input
                    type="tel"
                    id="services-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-white"
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="services-message" className="block text-sm font-bold mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="services-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#1e1e1e]/50 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-white"
                    placeholder={t.contact.messagePlaceholder}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t.contact.submitting : t.contact.submit}
                </button>

                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400 text-center text-sm">
                    {t.contact.successMessage}
                  </div>
                )}

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center text-sm">
                    {t.contact.errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <Footer />
    </div>
  )
}
