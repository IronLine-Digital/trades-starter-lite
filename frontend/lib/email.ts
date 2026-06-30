// Resend wrapper for owner notifications. Silently no-ops when RESEND_API_KEY or
// OWNER_EMAIL are unset so the forms keep working before email is wired up.
import {Resend} from 'resend'

import type {ContactFormValues} from './schemas/contact'
import type {ApplicationFormValues} from './schemas/application'
import type {BusinessInfo} from './sanity-types'

type SendResult = {sent: boolean; reason?: string}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c] ?? c,
  )
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px 0;color:#666;width:110px;">${escapeHtml(label)}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`
}

async function deliver(args: {
  businessName: string
  subject: string
  html: string
  text: string
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY
  const ownerEmail = process.env.OWNER_EMAIL
  if (!apiKey || !ownerEmail) {
    console.warn('[email] Skipping notification — RESEND_API_KEY or OWNER_EMAIL unset.')
    return {sent: false, reason: 'credentials_missing'}
  }
  const resend = new Resend(apiKey)
  try {
    // `onboarding@resend.dev` is Resend's sandbox sender (works without DNS).
    // Verify your domain and change this to something@your-domain before launch.
    const result = await resend.emails.send({
      from: `${args.businessName} <onboarding@resend.dev>`,
      to: [ownerEmail],
      subject: args.subject,
      html: args.html,
      text: args.text,
    })
    if ('error' in result && result.error) {
      console.error('[email] Resend error', result.error)
      return {sent: false, reason: 'resend_error'}
    }
    return {sent: true}
  } catch (err) {
    console.error('[email] Resend threw', err)
    return {sent: false, reason: 'resend_threw'}
  }
}

export async function sendContactEmail(args: {
  contact: ContactFormValues
  info: BusinessInfo | null
  sourcePage?: string
}): Promise<SendResult> {
  const {contact, info, sourcePage} = args
  const businessName = info?.businessName ?? 'Trades Starter'
  const subject = `New contact — ${contact.name}`
  const text = [
    `New contact for ${businessName}`,
    '',
    `Name:  ${contact.name}`,
    `Email: ${contact.email}`,
    `Phone: ${contact.phone}`,
    sourcePage ? `Source: ${sourcePage}` : null,
    '',
    'Message:',
    contact.message,
  ]
    .filter((l) => l !== null)
    .join('\n')
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 16px;">New contact for ${escapeHtml(businessName)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row('Name', contact.name)}
        ${row('Email', contact.email)}
        ${row('Phone', contact.phone)}
        ${sourcePage ? row('Source', sourcePage) : ''}
      </table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(contact.message)}</p>
    </div>`
  return deliver({businessName, subject, html, text})
}

export async function sendApplicationEmail(args: {
  application: ApplicationFormValues
  info: BusinessInfo | null
  sourcePage?: string
}): Promise<SendResult> {
  const {application, info, sourcePage} = args
  const businessName = info?.businessName ?? 'Trades Starter'
  const subject = `New application — ${application.name} (${application.position})`
  const text = [
    `New job application for ${businessName}`,
    '',
    `Name:     ${application.name}`,
    `Email:    ${application.email}`,
    `Phone:    ${application.phone}`,
    `Position: ${application.position}`,
    sourcePage ? `Source:   ${sourcePage}` : null,
    '',
    'Message:',
    application.message || '(none)',
  ]
    .filter((l) => l !== null)
    .join('\n')
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto;padding:24px;">
      <h2 style="margin:0 0 16px;">New application for ${escapeHtml(businessName)}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row('Name', application.name)}
        ${row('Email', application.email)}
        ${row('Phone', application.phone)}
        ${row('Position', application.position)}
        ${sourcePage ? row('Source', sourcePage) : ''}
      </table>
      <h3 style="margin:24px 0 8px;">Message</h3>
      <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(application.message || '(none)')}</p>
    </div>`
  return deliver({businessName, subject, html, text})
}
