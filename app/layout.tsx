import type React from "react"
import { Poppins, Montserrat } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const poppins = Poppins({
  weight: ["800"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <title>LLAMAWEB - Desarrollo Web en Buenos Aires</title>
        <meta
          name="description"
          content="Estudio de desarrollo web en Buenos Aires. Creamos sitios web, landing pages y sistemas de gestión."
        />
        <link rel="icon" type="image/webp" sizes="32x32" href="/logo-white.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/logo-white.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-white.webp" />
        <link rel="shortcut icon" href="/logo-white.webp" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <style>{`
          .page-transition {
            animation: fadeIn 0.3s ease-in-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}</style>
      </head>
      <body className={`${montserrat.variable} ${poppins.variable} font-sans antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
