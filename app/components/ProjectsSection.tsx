"use client"

import { useState, memo } from "react"
import ProjectDialog from "./ProjectDialog"
import { useLanguage } from "../contexts/LanguageContext"

interface ProjectsSectionProps {
  showAll?: boolean
  showHeader?: boolean
  showCTA?: boolean
}

const ProjectsSection = memo(function ProjectsSection({
  showAll = false,
  showHeader = true,
  showCTA = false,
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const { t, getPath } = useLanguage()

  console.log("[v0] ProjectsSection - Rendering, selectedProject:", selectedProject)

  const allProjects = [
    {
      id: 1,
      name: t.projects.items.drZakharenko.name,
      category: t.projects.items.drZakharenko.category,
      image: "/projects/drzakharenko-1.webp",
      screenshots: ["/projects/drzakharenko-1.webp", "/projects/drzakharenko-2.webp", "/projects/drzakharenko-3.webp"],
      mobileScreenshots: [
        "/projects/drzakharenko-mobile-1.webp",
        "/projects/drzakharenko-mobile-2.webp",
        "/projects/drzakharenko-mobile-3.webp",
      ],
      url: "https://drzakharenko.com.ar",
      description: t.projects.items.drZakharenko.description,
    },
    {
      id: 2,
      name: t.projects.items.kalahari.name,
      category: t.projects.items.kalahari.category,
      image: "/projects/kalahari-1.webp",
      screenshots: ["/projects/kalahari-1.webp", "/projects/kalahari-2.webp", "/projects/kalahari-3.webp"],
      mobileScreenshots: [
        "/projects/kalahari-mobile-1.webp",
        "/projects/kalahari-mobile-2.webp",
        "/projects/kalahari-mobile-3.webp",
      ],
      url: "https://kalaharibiocare.com",
      description: t.projects.items.kalahari.description,
    },
    {
      id: 3,
      name: t.projects.items.abogado.name,
      category: t.projects.items.abogado.category,
      image: "/projects/abogado-1.webp",
      screenshots: ["/projects/abogado-1.webp", "/projects/abogado-2.webp", "/projects/abogado-3.webp"],
      mobileScreenshots: [
        "/projects/abogado-mobile-1.webp",
        "/projects/abogado-mobile-2.webp",
        "/projects/abogado-mobile-3.webp",
      ],
      url: "https://abogado-demo-2.vercel.app",
      description: t.projects.items.abogado.description,
    },
    {
      id: 4,
      name: t.projects.items.daria.name,
      category: t.projects.items.daria.category,
      image: "/projects/daria-1.webp",
      screenshots: ["/projects/daria-1.webp", "/projects/daria-2.webp", "/projects/daria-3.webp"],
      mobileScreenshots: [
        "/projects/daria-mobile-1.webp",
        "/projects/daria-mobile-2.webp",
        "/projects/daria-mobile-3.webp",
      ],
      url: "https://dariazherebtsova.com",
      description: t.projects.items.daria.description,
    },
    {
      id: 5,
      name: t.projects.items.duiker.name,
      category: t.projects.items.duiker.category,
      image: "/projects/duiker-1.webp",
      screenshots: ["/projects/duiker-1.webp", "/projects/duiker-2.webp"],
      mobileScreenshots: [
        "/projects/duiker-mobile-1.webp",
        "/projects/duiker-mobile-2.webp",
        "/projects/duiker-mobile-3.webp",
      ],
      url: "https://duikertravel.com",
      description: t.projects.items.duiker.description,
    },
  ]

  const projects = showAll ? allProjects : allProjects.slice(0, 3)
  const selectedProjectData = allProjects.find((p) => p.id === selectedProject) || null

  return (
    <>
      <div className="container mx-auto px-4 md:px-8">
        {showHeader && (
          <div className="text-center mb-12 md:mb-16">
            <p className="text-yellow-400 text-xs md:text-sm font-bold tracking-widest mb-4">
              {showAll ? t.projects.heroHeading : t.projects.heading}
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 md:mb-6 font-[family-name:var(--font-poppins)]">
              {showAll ? t.projects.heroTitle : t.projects.title}
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto px-4">
              {showAll ? t.projects.heroDescription : t.projects.description}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                console.log("[v0] ProjectsSection - Project clicked:", project.name, "id:", project.id)
                setSelectedProject(project.id)
              }}
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
                <p className="text-xs md:text-sm text-yellow-400 font-bold">{t.projects.clickToSeeMore}</p>
              </div>
            </div>
          ))}
        </div>

        {showCTA && (
          <div className="text-center">
            <a
              href={getPath("/proyectos")}
              className="inline-block px-6 md:px-8 py-3 md:py-4 border-2 border-yellow-400 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold text-sm md:text-base cursor-pointer"
            >
              {t.projects.cta}
            </a>
          </div>
        )}
      </div>

      <ProjectDialog
        project={selectedProjectData}
        onClose={() => {
          console.log("[v0] ProjectsSection - Closing dialog")
          setSelectedProject(null)
        }}
      />
    </>
  )
})

export default ProjectsSection
