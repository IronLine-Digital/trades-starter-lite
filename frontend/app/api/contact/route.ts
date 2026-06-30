import {NextRequest, NextResponse} from 'next/server'
import {z} from 'zod'

import {contactSchema} from '@/lib/schemas/contact'
import {writeClient} from '@/sanity/lib/client-write'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'
import {sendContactEmail} from '@/lib/email'

// POST /api/contact
//   200 {ok:true}                    on success (and on honeypot — silent reject)
//   400 {error:'validation'|...}     on bad payload
//   502 {error:'storage_failed'}     on Sanity write failure
// Email is best-effort — Resend failures are logged, never returned as 5xx.
export async function POST(req: NextRequest) {
  let parsed
  try {
    const json: unknown = await req.json()
    // Honeypot: a populated `website` field means a bot filled every input.
    // Return 200 so it logs success and moves on.
    if (json && typeof json === 'object' && 'website' in json) {
      const hp = (json as {website?: unknown}).website
      if (typeof hp === 'string' && hp.length > 0) {
        return NextResponse.json({ok: true}, {status: 200})
      }
    }
    parsed = contactSchema.parse(json)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({error: 'validation', issues: err.issues}, {status: 400})
    }
    return NextResponse.json({error: 'bad_request'}, {status: 400})
  }

  // Cap the referer defensively before persisting an untrusted header.
  const sourcePage = req.headers.get('referer')?.slice(0, 2048) ?? undefined

  try {
    await writeClient.create({
      _type: 'contactSubmission',
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      message: parsed.message,
      submittedAt: new Date().toISOString(),
      sourcePage,
    })
  } catch (err) {
    console.error('[api/contact] Sanity write failed', err)
    return NextResponse.json({error: 'storage_failed'}, {status: 502})
  }

  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)
  await sendContactEmail({contact: parsed, info, sourcePage})

  return NextResponse.json({ok: true}, {status: 200})
}
