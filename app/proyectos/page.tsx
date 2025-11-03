"use client"

import Link from "next/link"
import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ProjectDialog from "../components/ProjectDialog"

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
    {
      id: 1,
      name: "Dr. Zakharenko",
      category: "Veterinario",
      image: "/projects/drzakharenko-1.webp",
      screenshots: ["/projects/drzakharenko-1.webp", "/projects/drzakharenko-2.webp", "/projects/drzakharenko-3.webp"],
      mobileScreenshots: [
        "/projects/drzakharenko-mobile-1.webp",
        "/projects/drzakharenko-mobile-2.webp",
        "/projects/drzakharenko-mobile-3.webp",
      ],
      url: "https://drzakharenko.com.ar",
      description: "Sitio web profesional para consultorio veterinario.",
    },
    {
      id: 2,
      name: "Kalahari Biocare",
      category: "Productor",
      image: "/projects/kalahari-1.webp",
      screenshots: ["/projects/kalahari-1.webp", "/projects/kalahari-2.webp", "/projects/kalahari-3.webp"],
      mobileScreenshots: [
        "/projects/kalahari-mobile-1.webp",
        "/projects/kalahari-mobile-2.webp",
        "/projects/kalahari-mobile-3.webp",
      ],
      url: "https://kalaharibiocare.com",
      description: "Sitio web para productor de aceites naturales y mayorista para empresas cosméticas.",
    },
    {
      id: 3,
      name: "Abogado",
      category: "Legal",
      image: "/projects/abogado-1.webp",
      screenshots: ["/projects/abogado-1.webp", "/projects/abogado-2.webp", "/projects/abogado-3.webp"],
      mobileScreenshots: [
        "/projects/abogado-mobile-1.webp",
        "/projects/abogado-mobile-2.webp",
        "/projects/abogado-mobile-3.webp",
      ],
      url: "https://abogado-demo-2.vercel.app",
      description: "Sitio web profesional para estudio jurídico con información de servicios legales.",
    },
    {
      id: 4,
      name: "Daria Zherebtsova",
      category: "Portfolio",
      image: "/projects/daria-1.webp",
      screenshots: ["/projects/daria-1.webp", "/projects/daria-2.webp", "/projects/daria-3.webp"],
      mobileScreenshots: [
        "/projects/daria-mobile-1.webp",
        "/projects/daria-mobile-2.webp",
        "/projects/daria-mobile-3.webp",
      ],
      url: "https://dariazherebtsova.com",
      description: "Portfolio profesional para artista visual con galería de trabajos.",
    },
    {
      id: 5,
      name: "Duiker Travel",
      category: "Turismo",
      image: "/projects/duiker-1.webp",
      screenshots: ["/projects/duiker-1.webp", "/projects/duiker-2.webp"],
      mobileScreenshots: [
        "/projects/duiker-mobile-1.webp",
        "/projects/duiker-mobile-2.webp",
        "/projects/duiker-mobile-3.webp",
      ],
      url: "https://duikertravel.com",
      description: "Sitio web para agencia de viajes con información de destinos y paquetes turísticos.",
    },
  ]

  const selectedProjectData = projects.find((p) => p.id === selectedProject) || null

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
          <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">NUESTRO PORTAFOLIO</p>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            PROYECTOS REALIZADOS
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
            Explorá algunos de los sitios web que hemos creado para nuestros clientes
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-32 bg-[#1e1e1e]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <div className="p-6 bg-gray-900/50">
                  <span className="inline-block px-3 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-300">{project.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-sm text-yellow-400 font-bold">Click para ver más</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectDialog project={selectedProjectData} onClose={() => setSelectedProject(null)} />

      {/* CTA Section */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 font-[family-name:var(--font-poppins)]">
            ¿LISTO PARA TU PROYECTO?
          </h2>
          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contactanos hoy y creemos juntos algo increíble
          </p>
          <Link
            href="/contacto"
            className="inline-block px-8 py-4 bg-yellow-400 text-black rounded-full hover:bg-yellow-500 transition-all duration-300 font-bold cursor-pointer"
          >
            Empezar Ahora
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
