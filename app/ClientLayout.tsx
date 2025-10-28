"use client"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()

  // Scroll to top on page navigation and add smooth page transition
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <div className="page-transition">{children}</div>
      <Analytics />
    </>
  )
}
