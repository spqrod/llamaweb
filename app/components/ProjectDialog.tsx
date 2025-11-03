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
  url: string
  description: string
}

interface ProjectDialogProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const [currentScreenshot, setCurrentScreenshot] = useState(0)

  useEffect(() => {
    if (project) {
      setCurrentScreenshot(0)
    }
  }, [project])

  if (!project) return null

  const handlePrevScreenshot = () => {
    setCurrentScreenshot((prev) => (prev === 0 ? project.screenshots.length - 1 : prev - 1))
  }

  const handleNextScreenshot = () => {
    setCurrentScreenshot((prev) => (prev === project.screenshots.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center" onClick={onClose}>
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-6 -right-6 z-10 bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg cursor-pointer"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        <div className="relative overflow-hidden">
          <div className="relative">
            <img
              src={project.screenshots[currentScreenshot] || "/placeholder.svg"}
              alt={`${project.name} - Screenshot ${currentScreenshot + 1}`}
              className="w-auto h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />

            {/* Navigation Arrows - Only show if more than 1 screenshot */}
            {project.screenshots.length > 1 && (
              <>
                <button
                  onClick={handlePrevScreenshot}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-yellow-400/80 hover:bg-yellow-400 text-black p-3 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  onClick={handleNextScreenshot}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-400/80 hover:bg-yellow-400 text-black p-3 rounded-full transition-all duration-300 cursor-pointer"
                  aria-label="Siguiente"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}
          </div>

          {/* Navigation Dots */}
          {project.screenshots.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center gap-2 py-2 px-4 bg-black/50 rounded-full">
              {project.screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentScreenshot(index)}
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
