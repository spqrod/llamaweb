import { translations, type Language } from "../lib/translations"

export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string
  features: string[]
  time: string
  price: string
  isAnnual?: boolean
  slug?: string
}

// Base service IDs
export const serviceIds = ["landing-page", "sitio-web-institucional", "tienda-online", "crm"] as const

// Helper function to get services in a specific language
export function getServices(language: Language = "es") {
  const t = translations[language].servicesData

  return [
    {
      id: "landing-page",
      slug: "landing-page",
      ...t.landingPage,
    },
    {
      id: "sitio-web-institucional",
      slug: "sitio-web-institucional",
      ...t.institutional,
    },
    {
      id: "tienda-online",
      slug: "tienda-online",
      ...t.ecommerce,
    },
    {
      id: "crm",
      slug: "crm",
      ...t.crm,
    },
  ]
}

// Export default Spanish services for backwards compatibility
export const services = getServices("es")

// Helper function to get service by ID with language support
export function getServiceById(id: string, language: Language = "es") {
  return getServices(language).find((service) => service.id === id)
}

// Helper function to get service by slug with language support
export function getServiceBySlug(slug: string, language: Language = "es") {
  return getServices(language).find((service) => service.slug === slug)
}
