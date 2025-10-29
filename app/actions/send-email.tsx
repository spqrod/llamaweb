"use server"

import nodemailer from "nodemailer"

interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export async function sendContactEmail(data: ContactFormData) {
  console.log("[v0] Email sending initiated")

  try {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("[v0] Missing SMTP environment variables")
      throw new Error("SMTP configuration is incomplete")
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Nuevo mensaje de contacto de ${data.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Teléfono:</strong> ${data.phone}</p>` : ""}
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
      `,
    }

    await transporter.sendMail(mailOptions)
    console.log("[v0] Email sent successfully")

    return { success: true }
  } catch (error) {
    console.error("[v0] Email sending failed:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
