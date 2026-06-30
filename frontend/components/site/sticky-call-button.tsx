import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'
import {formatPhoneHref} from '@/lib/format'
import {Phone} from 'lucide-react'

// Mobile-only fixed bottom bar: tap-to-call + estimate. Hidden on md+ where the
// header already exposes both actions.
export async function StickyCallButton() {
  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)
  if (!info?.phone) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex border-t border-white/10 bg-charcoal md:hidden">
      <a
        href={formatPhoneHref(info.phone)}
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-charcoal-foreground"
      >
        <Phone className="h-4 w-4 text-brand" aria-hidden />
        Call now
      </a>
      <Link
        href="/contact"
        className="flex flex-1 items-center justify-center bg-brand py-3.5 text-sm font-semibold text-brand-foreground"
      >
        Free estimate
      </Link>
    </div>
  )
}
