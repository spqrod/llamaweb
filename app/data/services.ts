export interface Service {
  id: string
  title: string
  description: string
  shortDescription: string // Added short description for home page
  features: string[]
  time: string
  price: string
  isAnnual?: boolean
  slug?: string
}

export const services: Service[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    slug: "landing-page",
    description:
      "Páginas de aterrizaje diseñadas para convertir visitantes en clientes. Optimizadas para velocidad, SEO y conversión.",
    shortDescription: "Página única optimizada para convertir visitantes en clientes", // Added
    features: ["Formularios de contacto", "Botón de WhatsApp", "Integración con Google Analytics"],
    time: "Desde 3 días",
    price: "Desde $200.000",
  },
  {
    id: "sitio-web-institucional",
    title: "Sitio web institucional",
    slug: "sitio-web-institucional",
    description:
      "Sitios web completos para empresas que buscan establecer su presencia digital profesional y atraer nuevos clientes.",
    shortDescription: "Sitio web completo para establecer tu presencia digital profesional", // Added
    features: [
      "Múltiples páginas",
      "Formularios de contacto",
      "Botón de WhatsApp",
      "Integración con redes sociales",
      "Integración con Google Analytics",
    ],
    time: "Desde 5 días",
    price: "Desde $300.000",
  },
  {
    id: "tienda-online",
    title: "Tienda online",
    slug: "tienda-online",
    description:
      "Tiendas online completas con carrito de compras, pasarela de pagos y gestión de productos para vender en línea.",
    shortDescription: "Tienda online completa con carrito de compras y pasarela de pagos", // Added
    features: [
      "Carrito de compras",
      "Pasarela de pagos",
      "Gestión de productos",
      "Panel de administración",
      "Integración con Google Analytics",
    ],
    time: "Desde 30 días",
    price: "Desde $700.000",
  },
  {
    id: "crm",
    title: "CRM",
    slug: "crm",
    description:
      "Plataformas personalizadas para gestionar clientes, proyectos y operaciones de tu negocio de manera eficiente.",
    shortDescription: "Plataforma personalizada para gestionar clientes y operaciones", // Added
    features: [
      "Panel de administración",
      "Base de datos personalizada",
      "Reportes y analytics",
      "Integración con herramientas",
    ],
    time: "Desde 30 días",
    price: "Desde $2.000.000",
  },
]

// Helper function to get service by ID
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

// Helper function to get service by slug
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
