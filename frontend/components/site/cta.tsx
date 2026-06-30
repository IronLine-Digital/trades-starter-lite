import Link from 'next/link'
import {formatPhoneDisplay, formatPhoneHref} from '@/lib/format'
import type {BusinessInfo} from '@/lib/sanity-types'
import {Phone} from 'lucide-react'

// Closing call-to-action band. Brand background, high-contrast buttons.
export function Cta({info}: {info: BusinessInfo | null}) {
  return (
    <section className="bg-brand text-brand-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight">Ready to get started?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-brand-foreground/90">
          Tell us about your project and we&rsquo;ll get back to you within one business day with a
          free estimate.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-charcoal px-6 text-base font-medium text-charcoal-foreground transition-colors hover:bg-charcoal/90"
          >
            Get a free estimate
          </Link>
          {info?.phone && (
            <a
              href={formatPhoneHref(info.phone)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-brand-foreground/40 px-6 text-base font-medium transition-colors hover:bg-brand-foreground/10"
            >
              <Phone className="h-4 w-4" />
              {formatPhoneDisplay(info.phone)}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
