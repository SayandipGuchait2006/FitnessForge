import nodemailer from 'nodemailer'

type NotifyPayload = {
  subject: string
  text: string
}

function getSmtpTransport() {
  const host = process.env.SMTP_HOST?.trim()
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
  const user = process.env.SMTP_USER?.trim()
  const pass = process.env.SMTP_PASS?.trim()
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

async function sendAdminEmail({ subject, text }: NotifyPayload) {
  const to = process.env.ADMIN_NOTIFY_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim()
  if (!to) return
  const from = process.env.SMTP_FROM?.trim() || process.env.ADMIN_EMAIL?.trim()
  const transport = getSmtpTransport()
  if (!transport || !from) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[notify] SMTP not configured; skip email:', subject)
    }
    return
  }
  await transport.sendMail({
    from,
    to,
    subject: `[Avenger Gym] ${subject}`,
    text,
  })
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim()
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim()
  if (!token || !chatId) return
  const url = `https://api.telegram.org/bot${token}/sendMessage`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text.slice(0, 4000),
      disable_web_page_preview: true,
    }),
  })
  if (!res.ok) {
    console.error('[notify] Telegram failed', await res.text())
  }
}

export async function notifyAdmin(payload: NotifyPayload) {
  try {
    await Promise.allSettled([sendAdminEmail(payload), sendTelegram(payload.text)])
  } catch (e) {
    console.error('[notify] notifyAdmin error', e)
  }
}
