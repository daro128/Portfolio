import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY)

// Create a free account at https://www.emailjs.com, add an email service + template,
// then set VITE_EMAILJS_SERVICE_ID / VITE_EMAILJS_TEMPLATE_ID / VITE_EMAILJS_PUBLIC_KEY
// in your .env file (see .env.example). Until then this throws so callers can fall back.
export async function sendContactMessage({ name, email, message }) {
  if (!isEmailConfigured) {
    throw new Error('EmailJS is not configured. Add VITE_EMAILJS_* keys to your .env file.')
  }

  return emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    { from_name: name, from_email: email, message },
    { publicKey: PUBLIC_KEY }
  )
}
