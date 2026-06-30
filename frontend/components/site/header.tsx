import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'
import {buttonVariants} from '@/components/ui/button'
import {SanityImage} from './sanity-image'
import {formatPhoneDisplay, formatPhoneHref} from '@/lib/format'
import {Phone} from 'lucide-react'

const NAV = [
  {label: 'Services', href: '/services'},
  {label: 'Projects', href: '/projects'},
  {label: 'Careers', href: '/careers'},
  {label: 'Contact', href: '/contact'},
]

export async function Header() {
  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)
  const businessName = info?.businessName ?? 'Trades Starter'

  return (
    <header className="sticky top-0 z-40 w-full bg-charcoal text-charcoal-foreground shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* LEFT: phone (click-to-call) */}
        {info?.phone ? (
          <a
            href={formatPhoneHref(info.phone)}
            className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-charcoal-foreground"
          >
            <Phone className="h-4 w-4 text-brand" aria-hidden />
            <span className="hidden sm:inline">{formatPhoneDisplay(info.phone)}</span>
            <span className="sm:hidden">Call us</span>
          </a>
        ) : (
          <span />
        )}

        {/* CENTER (md+): logo + business name links to home */}
        <Link
          href="/"
          className="hidden items-center gap-2 text-charcoal-foreground hover:opacity-90 md:flex"
        >
          {info?.logo?.asset && (
            <SanityImage image={info.logo} width={32} height={32} className="h-8 w-8 object-contain" />
          )}
          <span className="font-heading text-lg font-semibold tracking-wide">{businessName}</span>
        </Link>

        {/* CENTER NAV (md+) */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="text-charcoal-foreground/70 transition-colors hover:text-charcoal-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT: brand CTA */}
        <Link
          href="/contact"
          prefetch={false}
          className={buttonVariants({variant: 'brand', size: 'sm'}) + ' min-h-11'}
        >
          Get a free estimate
        </Link>
      </div>

      {/* Mobile name row + disclosure menu */}
      <div className="border-t border-white/10 md:hidden">
        <details className="group">
          <summary className="flex h-11 cursor-pointer list-none items-center justify-between px-4 text-sm font-medium text-charcoal-foreground/80 marker:hidden">
            <span className="font-heading text-base tracking-wide text-charcoal-foreground">
              {businessName}
            </span>
            <span className="text-xs uppercase tracking-widest text-charcoal-foreground/60 group-open:hidden">
              Menu
            </span>
            <span className="hidden text-xs uppercase tracking-widest text-charcoal-foreground/60 group-open:inline">
              Close
            </span>
          </summary>
          <nav className="flex flex-col gap-1 px-4 pb-3 text-sm">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="rounded-md px-2 py-3 text-charcoal-foreground/80 hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  )
}
