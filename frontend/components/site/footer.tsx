import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo, Hours} from '@/lib/sanity-types'
import {DAY_LABELS, formatHourTime, formatPhoneDisplay, formatPhoneHref} from '@/lib/format'
import {Globe, MapPin, Phone, Mail, ShieldCheck, BadgeCheck} from 'lucide-react'

const NAV = [
  {label: 'Services', href: '/services'},
  {label: 'Projects', href: '/projects'},
  {label: 'Careers', href: '/careers'},
  {label: 'Contact', href: '/contact'},
]

export async function Footer() {
  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)
  const year = new Date().getFullYear()

  // Fallback keeps the page from ending abruptly when businessInfo is missing.
  if (!info) return <FallbackFooter year={year} />

  return (
    <footer className="mt-24 bg-charcoal text-charcoal-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="font-heading text-base font-semibold tracking-wide">{info.businessName}</h3>
          {info.tagline && <p className="mt-2 text-sm text-charcoal-foreground/70">{info.tagline}</p>}
          <ul className="mt-4 space-y-2 text-sm">
            {info.phone && (
              <li>
                <a
                  href={formatPhoneHref(info.phone)}
                  className="inline-flex items-center gap-2 font-medium hover:text-brand"
                >
                  <Phone className="h-4 w-4 text-brand" />
                  {formatPhoneDisplay(info.phone)}
                </a>
              </li>
            )}
            {info.email && (
              <li>
                <a href={`mailto:${info.email}`} className="inline-flex items-center gap-2 hover:text-brand">
                  <Mail className="h-4 w-4 text-brand" />
                  {info.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal-foreground/80">
            Address &amp; Hours
          </h4>
          {info.address && (
            <address className="mt-3 text-sm not-italic text-charcoal-foreground/70">
              <span className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  {info.address.street && (
                    <>
                      {info.address.street}
                      <br />
                    </>
                  )}
                  {[info.address.city, info.address.state].filter(Boolean).join(', ')} {info.address.zip}
                </span>
              </span>
            </address>
          )}
          {info.hours && <HoursTable hours={info.hours} />}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal-foreground/80">
            Service Areas
          </h4>
          {info.serviceAreas && info.serviceAreas.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {info.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-charcoal-foreground/70"
                >
                  {area}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-charcoal-foreground/60">Contact us for coverage.</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-widest text-charcoal-foreground/80">
            Follow
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {info.social?.facebook && (
              <li>
                <a
                  href={info.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 text-charcoal-foreground/70 hover:text-brand"
                >
                  <Globe className="h-4 w-4 text-brand" /> Facebook
                </a>
              </li>
            )}
            {info.social?.instagram && (
              <li>
                <a
                  href={info.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 text-charcoal-foreground/70 hover:text-brand"
                >
                  <Globe className="h-4 w-4 text-brand" /> Instagram
                </a>
              </li>
            )}
            {info.social?.google && (
              <li>
                <a
                  href={info.social.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-2 text-charcoal-foreground/70 hover:text-brand"
                >
                  <Globe className="h-4 w-4 text-brand" /> Google Business
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-4 text-xs text-charcoal-foreground/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {year} {info.businessName}
            </span>
            {info.licenseNumber && (
              <span className="inline-flex items-center gap-1">
                <BadgeCheck className="h-3.5 w-3.5 text-brand" />
                License #{info.licenseNumber}
              </span>
            )}
            {info.insured && (
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-brand" />
                Fully insured
              </span>
            )}
          </div>
          <div className="flex gap-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="hover:text-charcoal-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FallbackFooter({year}: {year: number}) {
  // Only reached when Sanity has no businessInfo yet. Same literal as Header/Hero.
  const siteName = 'Trades Starter'
  return (
    <footer className="mt-24 bg-charcoal text-charcoal-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 py-6 text-xs text-charcoal-foreground/60 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <span>
          © {year} {siteName}
        </span>
        <div className="flex gap-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              className="hover:text-charcoal-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

function HoursTable({hours}: {hours: Hours}) {
  return (
    <dl className="mt-3 space-y-0.5 text-xs text-charcoal-foreground/60">
      {DAY_LABELS.map(({key, label}) => {
        const day = hours[key]
        const closed = !day || day.closed
        return (
          <div key={key} className="flex justify-between gap-3">
            <dt className="font-medium text-charcoal-foreground/80">{label}</dt>
            <dd>{closed ? 'Closed' : `${formatHourTime(day?.open)} – ${formatHourTime(day?.close)}`}</dd>
          </div>
        )
      })}
    </dl>
  )
}
