import Link from "next/link"
import WhatsAppIcon from "./icons/WhatsAppIcon"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-4 cursor-pointer">
              <div className="text-3xl font-bold tracking-tight font-[family-name:var(--font-poppins)]">
                LLAMA<span className="text-yellow-400">WEB</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm">Creamos sitios web que impulsan tu negocio</p>
            <p className="text-gray-500 text-xs mt-2 italic">Buenos Aires, Argentina</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Navegación</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Inicio
              </Link>
              <Link href="/services" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Servicios
              </Link>
              <Link href="/projects" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Proyectos
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Nosotros
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Contacto</h3>
            <div className="space-y-3">
              <Link href="/contact" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Enviar Email
              </Link>
              <a
                href="https://wa.me/5491158979663?text=Hola%2C%20me%20interesa%20un%20sitio%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer"
              >
                <WhatsAppIcon />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-yellow-400">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Política de Privacidad
              </Link>
              <Link href="/terms" className="block text-gray-300 hover:text-white transition-colors cursor-pointer">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">© 2025 LLAMAWEB. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
