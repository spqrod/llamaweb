"use client"

import { useState, useEffect } from "react"
import CloseIcon from "./icons/CloseIcon"
import ChevronLeftIcon from "./icons/ChevronLeftIcon"
import ChevronRightIcon from "./icons/ChevronRightIcon"

interface Project {
  id: number
  name: string
  category: string
  image: string
  screenshots: string[]
  mobileScreenshots?: string[]
  url: string
  description: string
}

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    console.log("[v0] ProjectDialog - currentScreenshot changed:", currentScreenshot)
  }, [currentScreenshot])

  useEffect(() => {
    console.log("[v0] ProjectDialog - project changed:", project?.name)
  }, [project])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Use project instead of project.id to prevent unnecessary resets
  useEffect(() => {
    if (project) {
      console.log("[v0] ProjectDialog - Resetting to screenshot 0 for project:", project.name)
      setCurrentScreenshot(0)
    }
  }, [project])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [project])

  if (!project) return null

  const screenshots = isMobile && project.mobileScreenshots ? project.mobileScreenshots : project.screenshots

  const handlePrevScreenshot = () => {
    console.log("[v0] ProjectDialog - handlePrevScreenshot called, current:", currentScreenshot)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreenshot((prev) => {
        const newIndex = prev === 0 ? screenshots.length - 1 : prev - 1
        console.log("[v0] ProjectDialog - Setting prev screenshot from", prev, "to", newIndex)
        return newIndex
      })
      setIsTransitioning(false)
    }, 150)
  }

  const handleNextScreenshot = () => {
    console.log("[v0] ProjectDialog - handleNextScreenshot called, current:", currentScreenshot)
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreenshot((prev) => {
        const newIndex = prev === screenshots.length - 1 ? 0 : prev + 1
        console.log("[v0] ProjectDialog - Setting next screenshot from", prev, "to", newIndex)
        return newIndex
      })
      setIsTransitioning(false)
    }, 150)
  }

  const handleDotClick = (index: number) => {
    console.log("[v0] ProjectDialog - handleDotClick called with index:", index)
    if (index !== currentScreenshot) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentScreenshot(index)
        setIsTransitioning(false)
      }, 150)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-8 md:p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 z-10 bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.9)] cursor-pointer"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        {screenshots.length > 1 && (
          <>
            <button
              onClick={handlePrevScreenshot}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full transition-all duration-300 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
              aria-label="Anterior"
            >
              <ChevronLeftIcon />
            </button>
            <button
              onClick={handleNextScreenshot}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-yellow-400 hover:bg-yellow-500 text-black p-3 rounded-full transition-all duration-300 cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.9)]"
              aria-label="Siguiente"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        <div className="relative">
          <img
            src={screenshots[currentScreenshot] || "/placeholder.svg"}
            alt={`${project.name} - Screenshot ${currentScreenshot + 1}`}
            className={`w-auto h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />

          {screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 py-2 px-4 bg-black/50 rounded-full">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    index === currentScreenshot ? "bg-yellow-400 w-8" : "bg-gray-400 hover:bg-gray-300 w-2"
                  }`}
                  aria-label={`Ver screenshot ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
