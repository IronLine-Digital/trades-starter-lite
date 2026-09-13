import Link from 'next/link'
import {buttonVariants} from '@/components/ui/button'
import {SanityImage} from '@/components/site/sanity-image'
import {formatPhoneDisplay, formatPhoneHref} from '@/lib/format'
import type {BusinessInfo} from '@/lib/sanity-types'
import {Phone, BadgeCheck, ShieldCheck, MapPin} from 'lucide-react'

// Static hero driven by businessInfo — the lite replacement for the page-builder
// heroBlock. The headline is the business tagline (good H1 for SEO/value prop).
// With no heroImage set, the section falls back to solid charcoal.
export function Hero({info}: {info: BusinessInfo | null}) {
  const name = info?.businessName ?? 'Trades Starter'
  const headline = info?.tagline ?? 'Reliable, licensed work — done right the first time.'
  const areas = info?.serviceAreas ?? []

  return (
    <section className="relative isolate overflow-hidden bg-charcoal text-charcoal-foreground">
      {info?.heroImage?.asset && (
        <div className="absolute inset-0 -z-10" aria-hidden>
          {/* Decorative background: the H1 carries the meaning, so alt stays empty.
              It's the LCP element, so load it eagerly at high priority. */}
          <SanityImage
            image={info.heroImage}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
          />
          {/* Heavier on the left where the copy sits; lighter on the right so the
              photo's subject still reads. Solid on mobile, where text spans the width. */}
          <div className="absolute inset-0 bg-charcoal/75 lg:bg-transparent lg:bg-linear-to-r lg:from-charcoal/95 lg:via-charcoal/75 lg:to-charcoal/25" />
        </div>
      )}
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <p className="font-heading text-sm font-semibold uppercase tracking-widest text-brand">
          {name}
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{headline}</h1>

        {areas.length > 0 && (
          <p className="mt-4 inline-flex items-center gap-2 text-base text-charcoal-foreground/70">
            <MapPin className="h-4 w-4 text-brand" />
            Serving {areas.slice(0, 3).join(', ')}
            {areas.length > 3 ? ', and more' : ''}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({variant: 'brand', size: 'lg'})}>
            Get a free estimate
          </Link>
          {info?.phone && (
            <a
              href={formatPhoneHref(info.phone)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/25 px-5 text-base font-medium transition-colors hover:bg-white/10"
            >
              <Phone className="h-4 w-4 text-brand" />
              {formatPhoneDisplay(info.phone)}
            </a>
          )}
        </div>

        {(info?.licenseNumber || info?.insured) && (
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal-foreground/70">
            {info?.licenseNumber && (
              <span className="inline-flex items-center gap-1.5">
                <BadgeCheck className="h-4 w-4 text-brand" />
                Licensed #{info.licenseNumber}
              </span>
            )}
            {info?.insured && (
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand" />
                Fully insured
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
