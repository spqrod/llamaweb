"use client"

import { useEffect } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon"

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="container mx-auto px-8 py-32 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeftIcon className="w-5 h-5" />
          Volver al inicio
        </Link>

        <h1 className="text-5xl font-extrabold mb-8 font-[family-name:var(--font-poppins)]">
          Términos y Condiciones de Servicio
        </h1>

        <div className="space-y-8 text-gray-300">
          <p className="text-sm text-gray-500">Última actualización: Enero 2025</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar los servicios de LLAMAWEB, usted acepta estar sujeto a estos Términos y Condiciones
              de Servicio, todas las leyes y regulaciones aplicables de la República Argentina, y acepta que es
              responsable del cumplimiento de todas las leyes locales aplicables. Si no está de acuerdo con alguno de
              estos términos, tiene prohibido usar o acceder a este sitio y sus servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Definiciones</h2>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>"Servicios":</strong> Se refiere a todos los servicios de desarrollo web, diseño digital,
                sistemas de gestión y cualquier otro servicio ofrecido por LLAMAWEB.
              </li>
              <li>
                <strong>"Cliente":</strong> Persona física o jurídica que contrata los servicios de LLAMAWEB.
              </li>
              <li>
                <strong>"Proyecto":</strong> Trabajo específico acordado entre LLAMAWEB y el Cliente.
              </li>
              <li>
                <strong>"Entregables":</strong> Productos, archivos o servicios que LLAMAWEB se compromete a entregar al
                Cliente.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Servicios Ofrecidos</h2>
            <p>LLAMAWEB ofrece los siguientes servicios:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Desarrollo de Landing Pages</li>
              <li>Desarrollo de Sitios Web Empresariales</li>
              <li>Sistemas de Gestión de Clientes (CRM)</li>
              <li>Diseño Digital y Publicidad</li>
              <li>Otros servicios relacionados con desarrollo web y marketing digital</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Proceso de Contratación</h2>
            <p>El proceso de contratación de servicios se realiza de la siguiente manera:</p>
            <ol className="list-decimal list-inside space-y-2 ml-4">
              <li>El Cliente contacta a LLAMAWEB a través de los canales oficiales (WhatsApp)</li>
              <li>Se realiza una consulta inicial para entender las necesidades del Cliente</li>
              <li>LLAMAWEB elabora un presupuesto detallado con alcance, plazos y costos</li>
              <li>El Cliente acepta el presupuesto y realiza el pago inicial acordado</li>
              <li>Se inicia el desarrollo del proyecto según los términos acordados</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Precios y Pagos</h2>
            <p>
              Los precios de nuestros servicios están expresados en pesos argentinos (ARS) y son orientativos. El precio
              final será determinado en el presupuesto específico para cada proyecto.
            </p>
            <p>Condiciones de pago:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Se requiere un pago inicial del 50% para comenzar el proyecto</li>
              <li>El 50% restante se abona al finalizar el proyecto y antes de la entrega final</li>
              <li>Los pagos se realizan mediante transferencia bancaria o medios de pago acordados</li>
              <li>Los precios pueden estar sujetos a ajustes por inflación o cambios en el alcance del proyecto</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Plazos de Entrega</h2>
            <p>
              Los plazos de entrega son estimados y se especifican en el presupuesto de cada proyecto. LLAMAWEB se
              compromete a cumplir con los plazos acordados, siempre que:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>El Cliente proporcione toda la información y materiales necesarios en tiempo y forma</li>
              <li>No haya cambios significativos en el alcance del proyecto</li>
              <li>Los pagos se realicen según lo acordado</li>
            </ul>
            <p>
              Los retrasos causados por el Cliente (falta de información, demoras en aprobaciones, etc.) extenderán
              proporcionalmente el plazo de entrega.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Revisiones y Modificaciones</h2>
            <p>
              Cada proyecto incluye un número determinado de revisiones sin cargo adicional, según lo especificado en el
              presupuesto. Las revisiones adicionales o cambios significativos en el alcance del proyecto pueden generar
              costos adicionales que serán comunicados y acordados previamente con el Cliente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Propiedad Intelectual</h2>
            <p>
              Una vez completado el pago total del proyecto, el Cliente adquiere los derechos de uso sobre los
              entregables finales. Sin embargo:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>LLAMAWEB retiene el derecho de usar el proyecto en su portfolio y materiales promocionales</li>
              <li>
                Los códigos, frameworks y herramientas de desarrollo utilizados permanecen como propiedad de LLAMAWEB o
                sus respectivos propietarios
              </li>
              <li>
                El Cliente no puede revender, redistribuir o reclamar autoría sobre el trabajo realizado por LLAMAWEB
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Garantías y Soporte</h2>
            <p>LLAMAWEB garantiza que:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Los sitios web desarrollados funcionarán correctamente en los navegadores modernos principales</li>
              <li>El código será limpio, organizado y siguiendo las mejores prácticas</li>
              <li>Los sitios serán responsive y se adaptarán a diferentes dispositivos</li>
            </ul>
            <p>
              Se ofrece un período de garantía de 30 días después de la entrega final para corregir errores o bugs sin
              costo adicional. Después de este período, el soporte técnico y las modificaciones estarán sujetos a
              tarifas adicionales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Responsabilidades del Cliente</h2>
            <p>El Cliente se compromete a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Proporcionar información precisa y completa sobre los requisitos del proyecto</li>
              <li>Entregar todos los materiales necesarios (textos, imágenes, logos) en tiempo y forma</li>
              <li>Realizar los pagos según lo acordado</li>
              <li>Responder a las consultas y solicitudes de aprobación en tiempo razonable</li>
              <li>Asegurar que tiene los derechos necesarios sobre todos los materiales proporcionados</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Limitación de Responsabilidad</h2>
            <p>
              LLAMAWEB no será responsable por daños indirectos, incidentales, especiales o consecuentes que resulten
              del uso o la imposibilidad de usar nuestros servicios. Nuestra responsabilidad total no excederá el monto
              pagado por el Cliente por el servicio específico en cuestión.
            </p>
            <p>LLAMAWEB no se hace responsable por:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Pérdida de datos causada por el Cliente o terceros</li>
              <li>Problemas de hosting o servicios de terceros</li>
              <li>Contenido proporcionado por el Cliente que viole derechos de terceros</li>
              <li>Cambios en tecnologías o plataformas de terceros que afecten el funcionamiento del sitio</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Cancelación y Reembolsos</h2>
            <p>El Cliente puede cancelar el proyecto en cualquier momento. En caso de cancelación:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                Si la cancelación ocurre antes de iniciar el trabajo, se reembolsará el 100% del pago inicial menos
                gastos administrativos
              </li>
              <li>
                Si la cancelación ocurre durante el desarrollo, se cobrará proporcionalmente por el trabajo realizado
                hasta ese momento
              </li>
              <li>No se realizan reembolsos una vez entregado el proyecto final</li>
            </ul>
            <p>
              LLAMAWEB se reserva el derecho de cancelar un proyecto si el Cliente incumple con sus obligaciones de pago
              o proporcionar información necesaria.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">13. Confidencialidad</h2>
            <p>
              LLAMAWEB se compromete a mantener la confidencialidad de toda la información proporcionada por el Cliente
              durante el desarrollo del proyecto. No compartiremos información confidencial con terceros sin el
              consentimiento expreso del Cliente, excepto cuando sea requerido por ley.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">14. Ley Aplicable y Jurisdicción</h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes de la República Argentina. Cualquier disputa que surja
              en relación con estos términos será sometida a la jurisdicción exclusiva de los tribunales ordinarios de
              la Ciudad Autónoma de Buenos Aires, Argentina.
            </p>
            <p>Normativa aplicable:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Código Civil y Comercial de la Nación Argentina</li>
              <li>Ley N° 24.240 de Defensa del Consumidor</li>
              <li>Ley N° 25.326 de Protección de Datos Personales</li>
              <li>Ley N° 11.723 de Propiedad Intelectual</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">15. Modificaciones a los Términos</h2>
            <p>
              LLAMAWEB se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las
              modificaciones entrarán en vigor desde su publicación en el sitio web. Los proyectos en curso se regirán
              por los términos vigentes al momento de su contratación.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">16. Defensa del Consumidor</h2>
            <p>Conforme a la Ley N° 24.240 de Defensa del Consumidor, el Cliente tiene derecho a:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Recibir información clara y detallada sobre los servicios contratados</li>
              <li>Revocar la aceptación durante el plazo de 10 días corridos contados a partir de la contratación</li>
              <li>Presentar reclamos ante la autoridad de aplicación correspondiente</li>
            </ul>
            <p>
              Para consultas o reclamos relacionados con la defensa del consumidor, puede contactar a la Dirección
              Nacional de Defensa del Consumidor o la autoridad local correspondiente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">17. Contacto</h2>
            <p>
              Para cualquier consulta sobre estos Términos y Condiciones o sobre nuestros servicios, puede contactarnos
              a través de:
            </p>
            <ul className="space-y-2 ml-4">
              <li>WhatsApp: +54 11 5897 9663</li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  )
}
