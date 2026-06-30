import {NextRequest, NextResponse} from 'next/server'
import {z} from 'zod'

import {applicationSchema} from '@/lib/schemas/application'
import {writeClient} from '@/sanity/lib/client-write'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'
import {sendApplicationEmail} from '@/lib/email'

// POST /api/apply — same contract as /api/contact, writes an applicationSubmission.
export async function POST(req: NextRequest) {
  let parsed
  try {
    const json: unknown = await req.json()
    if (json && typeof json === 'object' && 'website' in json) {
      const hp = (json as {website?: unknown}).website
      if (typeof hp === 'string' && hp.length > 0) {
        return NextResponse.json({ok: true}, {status: 200})
      }
    }
    parsed = applicationSchema.parse(json)
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({error: 'validation', issues: err.issues}, {status: 400})
    }
    return NextResponse.json({error: 'bad_request'}, {status: 400})
  }

  const sourcePage = req.headers.get('referer')?.slice(0, 2048) ?? undefined

  try {
    await writeClient.create({
      _type: 'applicationSubmission',
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone,
      position: parsed.position,
      message: parsed.message,
      submittedAt: new Date().toISOString(),
      sourcePage,
    })
  } catch (err) {
    console.error('[api/apply] Sanity write failed', err)
    return NextResponse.json({error: 'storage_failed'}, {status: 502})
  }

  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)
  await sendApplicationEmail({application: parsed, info, sourcePage})

  return NextResponse.json({ok: true}, {status: 200})
}
