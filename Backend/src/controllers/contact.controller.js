export function submitContact(req, res) {
  const { name, email, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email and message are required' })
  }

  // TODO: wire this up to a real mail transport (e.g. nodemailer) once you're ready.
  // For now the frontend talks to EmailJS directly, so this endpoint is a placeholder
  // for when you want the contact form to go through your own backend instead.
  console.log('Contact form submission:', { name, email, message })

  res.status(200).json({ message: 'Message received' })
}
