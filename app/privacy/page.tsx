"use client"

import { useEffect } from "react"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon"

export default function PrivacyPage() {
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

        <h1 className="text-5xl font-extrabold mb-8 font-[family-name:var(--font-poppins)]">Política de Privacidad</h1>

        <div className="space-y-8 text-gray-300">
          <p className="text-sm text-gray-500">Última actualización: Enero 2025</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">1. Información General</h2>
            <p>
              LLAMAWEB, con domicilio en Buenos Aires, Argentina, en cumplimiento de la Ley N° 25.326 de Protección de
              Datos Personales y su Decreto Reglamentario N° 1558/2001, informa sobre el tratamiento de datos personales
              que realiza a través de su sitio web y servicios.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">2. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de sus datos personales es LLAMAWEB. Para ejercer sus derechos o realizar
              consultas, puede contactarnos a través de WhatsApp (+54 11 5897 9663).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">3. Datos que Recopilamos</h2>
            <p>Recopilamos los siguientes tipos de datos personales:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Datos de identificación: nombre, apellido, documento de identidad</li>
              <li>Datos de contacto: dirección de correo electrónico, número de teléfono</li>
              <li>Datos de navegación: dirección IP, cookies, datos de uso del sitio web</li>
              <li>Datos comerciales: información sobre proyectos, presupuestos y servicios contratados</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">4. Finalidad del Tratamiento</h2>
            <p>Sus datos personales serán utilizados para:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Prestación de servicios de desarrollo web y diseño digital</li>
              <li>Comunicación relacionada con proyectos y servicios contratados</li>
              <li>Envío de información comercial y promocional (con su consentimiento previo)</li>
              <li>Cumplimiento de obligaciones legales y fiscales</li>
              <li>Mejora de nuestros servicios y experiencia del usuario</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">5. Base Legal del Tratamiento</h2>
            <p>El tratamiento de sus datos personales se basa en:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Su consentimiento expreso e informado</li>
              <li>La ejecución de un contrato del cual usted es parte</li>
              <li>El cumplimiento de obligaciones legales aplicables</li>
              <li>Nuestro interés legítimo en mejorar nuestros servicios</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">6. Conservación de Datos</h2>
            <p>
              Conservaremos sus datos personales durante el tiempo necesario para cumplir con las finalidades para las
              que fueron recopilados, incluyendo el cumplimiento de obligaciones legales, contables y fiscales. Una vez
              cumplidas estas finalidades, los datos serán eliminados o anonimizados de forma segura.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">7. Derechos del Titular</h2>
            <p>
              Conforme a la Ley N° 25.326, usted tiene derecho a ejercer los siguientes derechos sobre sus datos
              personales:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>Derecho de acceso:</strong> Conocer qué datos personales tenemos sobre usted
              </li>
              <li>
                <strong>Derecho de rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos
              </li>
              <li>
                <strong>Derecho de supresión:</strong> Solicitar la eliminación de sus datos personales
              </li>
              <li>
                <strong>Derecho de actualización:</strong> Mantener sus datos actualizados
              </li>
              <li>
                <strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos en determinadas
                circunstancias
              </li>
            </ul>
            <p>
              Para ejercer estos derechos, puede contactarnos a través de los medios indicados en esta política. Le
              responderemos en un plazo máximo de 10 días hábiles conforme a la normativa vigente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">8. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra el
              acceso no autorizado, la pérdida, destrucción o alteración. Estas medidas incluyen encriptación, controles
              de acceso, y procedimientos de seguridad actualizados regularmente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">9. Transferencia de Datos</h2>
            <p>
              No transferimos sus datos personales a terceros, excepto cuando sea necesario para la prestación de
              nuestros servicios (por ejemplo, servicios de hosting) o cuando estemos obligados por ley. En caso de
              transferencia internacional de datos, garantizamos que se cumplan los requisitos establecidos por la
              normativa argentina de protección de datos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">10. Cookies y Tecnologías Similares</h2>
            <p>
              Nuestro sitio web utiliza cookies y tecnologías similares para mejorar la experiencia del usuario y
              analizar el tráfico del sitio. Puede configurar su navegador para rechazar cookies, aunque esto puede
              afectar la funcionalidad del sitio.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">11. Menores de Edad</h2>
            <p>
              Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente datos
              personales de menores. Si tiene conocimiento de que un menor ha proporcionado datos personales, por favor
              contáctenos para que podamos eliminarlos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">12. Modificaciones a esta Política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Las
              modificaciones entrarán en vigor desde su publicación en el sitio web. Le recomendamos revisar
              periódicamente esta política para estar informado sobre cómo protegemos sus datos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">13. Autoridad de Aplicación</h2>
            <p>
              La Agencia de Acceso a la Información Pública es la autoridad de aplicación de la Ley N° 25.326. Tiene la
              atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las
              normas sobre protección de datos personales.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">14. Contacto</h2>
            <p>
              Para cualquier consulta sobre esta Política de Privacidad o sobre el tratamiento de sus datos personales,
              puede contactarnos a través de:
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
