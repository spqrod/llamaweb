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

export const services: Service[] = [
  {
    id: "landing-page",
    title: "Landing Page",
    slug: "landing-page",
    description:
      "Una sola página web diseñada para convertir visitantes en clientes. Ideal para promocionar un producto, servicio o evento específico. Todo el contenido está en una única página optimizada para velocidad, SEO y conversión.",
    shortDescription: "Sitio web de una sola página optimizado para convertir visitantes en clientes",
    features: [
      "Diseño personalizado a tu marca",
      "Dominio web, Hosting Premium y 1 Correo Corporativo",
      "Formularios de contacto",
      "Botón de WhatsApp",
      "Integración con Google Analytics",
    ],
    time: "3 días",
    price: "$200.000",
  },
  {
    id: "sitio-web-institucional",
    title: "Sitio web institucional",
    slug: "sitio-web-institucional",
    description:
      "Sitio web completo con múltiples páginas (aproximadamente 5 páginas: Inicio, Servicios, Nosotros, Contacto, etc.). Ideal para empresas que buscan establecer su presencia digital profesional con información detallada sobre sus servicios, equipo y valores.",
    shortDescription: "Sitio web completo con múltiples páginas para establecer tu presencia digital profesional",
    features: [
      "Diseño personalizado a tu marca",
      "Dominio web, Hosting Premium y 1 Correo Corporativo",
      "Múltiples páginas",
      "Formularios de contacto",
      "Botón de WhatsApp",
      "Integración con Google Analytics",
    ],
    time: "5 días",
    price: "$300.000",
  },
  {
    id: "tienda-online",
    title: "Tienda online",
    slug: "tienda-online",
    description:
      "Tiendas online completas con carrito de compras, pasarela de pagos y gestión de productos para vender en línea.",
    shortDescription: "Tienda online completa con carrito de compras y pasarela de pagos",
    features: [
      "Diseño personalizado a tu marca",
      "Dominio web, Hosting Premium y 1 Correo Corporativo",
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
    shortDescription: "Plataforma personalizada para gestionar clientes y operaciones",
    features: [
      "Diseño personalizado a tu marca",
      "Dominio web, Hosting Premium y 1 Correo Corporativo",
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
