"use client"

import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ClockIcon from "../components/icons/ClockIcon"
import DollarIcon from "../components/icons/DollarIcon"
import CheckCircleIcon from "../components/icons/CheckCircleIcon"

export default function ServicesPage() {
  const services = [
    {
      title: "Desarrollo de Landing Page",
      description:
        "Páginas de aterrizaje diseñadas para convertir visitantes en clientes. Optimizadas para velocidad, SEO y conversión.",
      features: ["Diseño responsive", "Optimización SEO", "Formularios de contacto", "Integración con analytics"],
      time: "Desde 3 días",
      price: "Desde $300.000",
    },
    {
      title: "Sitio Web Empresarial",
      description:
        "Sitios web completos para empresas que buscan establecer su presencia digital profesional y atraer nuevos clientes.",
      features: [
        "Múltiples páginas",
        "Diseño responsive",
        "Integración con redes sociales",
        "Optimización para buscadores",
      ],
      time: "Desde 5 días",
      price: "Desde $500.000",
    },
    {
      title: "Sistema de Gestión de Clientes",
      description:
        "Plataformas personalizadas para gestionar clientes, proyectos y operaciones de tu negocio de manera eficiente.",
      features: [
        "Panel de administración",
        "Base de datos personalizada",
        "Reportes y analytics",
        "Integración con herramientas",
      ],
      time: "Desde 30 días",
      price: "Desde $2.000.000",
    },
    {
      title: "Marketing Digital",
      description:
        "Estrategias integrales de marketing digital para aumentar tu visibilidad online y atraer más clientes.",
      features: ["Gestión de redes sociales", "Campañas publicitarias", "Email marketing", "Análisis de resultados"],
      time: "Próximamente",
      price: "Próximamente",
      comingSoon: true,
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/space-2.webp" alt="" className="w-full h-full object-cover opacity-60 animate-space-pan-slow" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTROS SERVICIOS</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            SOLUCIONES DIGITALES
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Transformamos ideas en experiencias digitales que impulsan el crecimiento de tu negocio
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-32 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-8 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-yellow-400 transition-all duration-300 flex flex-col ${
                  service.comingSoon ? "opacity-60" : ""
                }`}
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    {service.comingSoon && (
                      <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full whitespace-nowrap">
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-yellow-400 mb-3">INCLUYE:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircleIcon
                            className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              service.comingSoon ? "text-gray-600" : "text-yellow-400"
                            }`}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                      <ClockIcon className={service.comingSoon ? "text-gray-600 w-5 h-5" : "text-yellow-400 w-5 h-5"} />
                      <span className={service.comingSoon ? "text-gray-600" : "text-gray-300"}>{service.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarIcon
                        className={service.comingSoon ? "text-gray-600 w-5 h-5" : "text-yellow-400 w-5 h-5"}
                      />
                      <span className={service.comingSoon ? "text-gray-600 font-bold" : "text-yellow-400 font-bold"}>
                        {service.price}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={service.comingSoon ? "#" : "/contact"}
                  className={`block w-full text-center px-6 py-3 border-2 rounded-lg font-bold transition-all duration-300 mt-auto ${
                    service.comingSoon
                      ? "border-gray-700 text-gray-600 cursor-not-allowed"
                      : "border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                  }`}
                  onClick={(e) => service.comingSoon && e.preventDefault()}
                >
                  {service.comingSoon ? "Próximamente" : "Consultar"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            ¿LISTO PARA EMPEZAR?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactanos hoy y llevemos tu proyecto al siguiente nivel
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold"
          >
            Hablemos de tu Proyecto
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
