"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CloseIcon from "./components/icons/CloseIcon"
import ClockIcon from "./components/icons/ClockIcon"
import DollarIcon from "./components/icons/DollarIcon"
import MobileIcon from "./components/icons/MobileIcon"
import LightningIcon from "./components/icons/LightningIcon"
import ShieldIcon from "./components/icons/ShieldIcon"
import SearchIcon from "./components/icons/SearchIcon"
import ChatIcon from "./components/icons/ChatIcon"
import WhatsAppIcon from "./components/icons/WhatsAppIcon"
import HandshakeIcon from "./components/icons/HandshakeIcon"

export default function Home() {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesAnimated, setServicesAnimated] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const projects = [
    {
      id: 1,
      name: "Dr. Zakharenko",
      category: "Médico",
      description: "Sitio web profesional para consultorio médico con sistema de turnos online.",
      image: "/projects/drzakharenko-screenshot.webp",
      url: "https://drzakharenko.com.ar",
    },
    {
      id: 2,
      name: "Kalahari Biocare",
      category: "E-commerce",
      description: "Tienda online de productos naturales y cosméticos con carrito de compras integrado.",
      image: "/projects/kalaharibiocare-screenshot.webp",
      url: "https://kalaharibiocare.com",
    },
    {
      id: 3,
      name: "Duiker Travel",
      category: "Turismo",
      description: "Agencia de viajes con catálogo de destinos y sistema de reservas.",
      image:
        "https://xurtccytrzafbfk3.public.blob.vercel-storage.com/agent-assets/ef9e8de27250caf1486db88802a7495f07778bce3fc7bde78f6a8d6d541259d0.jpeg",
      url: "https://duikertravels.com",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 md:pb-0 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-1.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
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
                    PREPARATE PARA DESPEGAR
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
                    Conectá con Nosotros
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
            <span className="text-gray-500"> / 05</span>
          </div>
        </section>

        {/* Services Section */}
        <section ref={servicesRef} className="relative min-h-screen bg-black py-16 md:py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="space-y-8 md:space-y-12">
              {/* Header */}
              <div className="text-center">
                <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTROS SERVICIOS</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-[family-name:var(--font-poppins)]">
                  LO QUE HACEMOS
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
                  {/* Service 1 */}
                  <div
                    className={`p-4 md:p-6 border-l-4 border-l-transparent border border-gray-800 rounded-lg hover:border-yellow-400 hover:border-l-yellow-400 hover:bg-yellow-400/5 transition-all duration-300 ${
                      servicesAnimated ? "animate-service-hover-1" : ""
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Desarrollo de Landing Page</h3>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-gray-300">Desde 3 días</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-yellow-400 font-bold">Desde $300.000</span>
                      </div>
                    </div>
                  </div>

                  {/* Service 2 */}
                  <div
                    className={`p-4 md:p-6 border-l-4 border-l-transparent border border-gray-800 rounded-lg hover:border-yellow-400 hover:border-l-yellow-400 hover:bg-yellow-400/5 transition-all duration-300 ${
                      servicesAnimated ? "animate-service-hover-2" : ""
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Sitio Web Empresarial</h3>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-gray-300">Desde 5 días</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-yellow-400 font-bold">Desde $500.000</span>
                      </div>
                    </div>
                  </div>

                  {/* Service 3 */}
                  <div
                    className={`p-4 md:p-6 border-l-4 border-l-transparent border border-gray-800 rounded-lg hover:border-yellow-400 hover:border-l-yellow-400 hover:bg-yellow-400/5 transition-all duration-300 ${
                      servicesAnimated ? "animate-service-hover-3" : ""
                    }`}
                  >
                    <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Sistema de Gestión de Clientes</h3>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-gray-300">Desde 30 días</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon className="text-yellow-400 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-yellow-400 font-bold">Desde $2.000.000</span>
                      </div>
                    </div>
                  </div>

                  {/* Service 4 - Coming Soon */}
                  <div
                    className={`p-4 md:p-6 border-l-4 border-l-transparent border border-gray-800 rounded-lg opacity-50 cursor-not-allowed ${
                      servicesAnimated ? "animate-service-hover-4" : ""
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-3 md:mb-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-500">Marketing Digital</h3>
                      <span className="px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full">Próximamente</span>
                    </div>
                    <div className="flex flex-wrap gap-4 md:gap-6 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-gray-600">Por definir</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarIcon className="text-gray-600 w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-gray-600">Por definir</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">02</span>
            <span className="text-gray-500"> / 05</span>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="relative min-h-screen py-16 md:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
                  <div className="flex gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300">
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
            <span className="text-yellow-400 text-xl md:text-2xl">03</span>
            <span className="text-gray-500"> / 05</span>
          </div>
        </section>

        {/* Projects Section */}
        <section className="relative min-h-screen bg-black py-16 md:py-32">
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
                  className="group relative overflow-hidden rounded-lg border border-gray-800 hover:border-yellow-400 transition-all duration-300 cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 md:p-6 bg-gray-900/50">
                    <span className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mb-2">{project.name}</h3>
                    <p className="text-xs md:text-sm text-gray-300">{project.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-xs md:text-sm text-yellow-400 font-bold">Click para ver más</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
              >
                Ver Todos los Proyectos
              </Link>
            </div>
          </div>

          {/* Section Number */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">04</span>
            <span className="text-gray-500"> / 05</span>
          </div>
        </section>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
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
              <div className="w-full h-full rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <iframe
                  src={projects.find((p) => p.id === selectedProject)?.url}
                  className="w-full h-full rounded-lg"
                  title={projects.find((p) => p.id === selectedProject)?.name}
                />
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section ref={contactRef} className="relative min-h-screen py-16 md:py-32 overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <img src="/space-3.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
              {/* Left Column - Info */}
              <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                <div>
                  <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">HABLEMOS</p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
                    EMPECEMOS TU PROYECTO
                  </h2>
                  <p className="text-base md:text-lg text-gray-300">
                    ¿Tenés una idea? Estamos listos para hacerla realidad. Contactanos y llevemos tu negocio al
                    siguiente nivel.
                  </p>
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
              <div className="bg-black/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-gray-800">
                <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">O envianos un mensaje</h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const message = `Hola! Mi nombre es ${formData.get("name")}. Email: ${formData.get("email")}. Teléfono: ${formData.get("phone")}. Mensaje: ${formData.get("message")}`
                    window.open(`https://wa.me/5491158979663?text=${encodeURIComponent(message)}`, "_blank")
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm md:text-base"
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
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors text-sm md:text-base"
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
                      name="phone"
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-sm md:text-base"
                      placeholder="+54 11 1234 5678"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg focus:border-yellow-400 focus:outline-none transition-colors resize-none text-sm md:text-base"
                      placeholder="Contanos sobre tu proyecto..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Section Number */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-10 text-sm font-bold">
            <span className="text-yellow-400 text-xl md:text-2xl">05</span>
            <span className="text-gray-500"> / 05</span>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
