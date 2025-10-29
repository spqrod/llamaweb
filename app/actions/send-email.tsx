"use server"

import nodemailer from "nodemailer"

export async function sendContactEmail(formData: {
  name: string
  email: string
  phone: string
  message: string
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      replyTo: formData.email,
      subject: `Nuevo mensaje de contacto de ${formData.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Teléfono:</strong> ${formData.phone || "No proporcionado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${formData.message}</p>
      `,
      text: `
        Nuevo mensaje de contacto
        
        Nombre: ${formData.name}
        Email: ${formData.email}
        Teléfono: ${formData.phone || "No proporcionado"}
        Mensaje: ${formData.message}
      `,
    }

    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("[v0] Error sending email:", error)
    return { success: false, error: "Error al enviar el mensaje" }
  }
}
