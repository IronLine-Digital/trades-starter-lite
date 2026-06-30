import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/fetch'
import {businessInfoQuery} from '@/sanity/lib/queries'
import type {BusinessInfo} from '@/lib/sanity-types'
import {ContactForm} from '@/components/site/contact-form'
import {PageHeader} from '@/components/site/page-header'
import {DAY_LABELS, formatHourTime, formatPhoneDisplay, formatPhoneHref} from '@/lib/format'
import {Phone, Mail, MapPin, Clock} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for a free estimate.',
}

export default async function ContactPage() {
  const info = await sanityFetch<BusinessInfo | null>(businessInfoQuery)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Contact us"
        subtitle="Tell us what you need and we'll get back to you within one business day."
      />

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        {/* Business details */}
        <div className="space-y-6 text-sm">
          {info?.phone && (
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="font-semibold">Phone</p>
                <a href={formatPhoneHref(info.phone)} className="text-muted-foreground hover:text-brand">
                  {formatPhoneDisplay(info.phone)}
                </a>
              </div>
            </div>
          )}

          {info?.email && (
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="font-semibold">Email</p>
                <a href={`mailto:${info.email}`} className="text-muted-foreground hover:text-brand">
                  {info.email}
                </a>
              </div>
            </div>
          )}

          {info?.address && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="font-semibold">Address</p>
                <address className="not-italic text-muted-foreground">
                  {info.address.street && (
                    <>
                      {info.address.street}
                      <br />
                    </>
                  )}
                  {[info.address.city, info.address.state].filter(Boolean).join(', ')}{' '}
                  {info.address.zip}
                </address>
              </div>
            </div>
          )}

          {info?.hours && (
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="font-semibold">Hours</p>
                <dl className="mt-1 space-y-0.5 text-muted-foreground">
                  {DAY_LABELS.map(({key, label}) => {
                    const day = info.hours?.[key]
                    const closed = !day || day.closed
                    return (
                      <div key={key} className="flex gap-4">
                        <dt className="w-10 font-medium text-foreground/80">{label}</dt>
                        <dd>
                          {closed
                            ? 'Closed'
                            : `${formatHourTime(day?.open)} – ${formatHourTime(day?.close)}`}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            </div>
          )}

          {info?.serviceAreas && info.serviceAreas.length > 0 && (
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 text-brand" />
              <div>
                <p className="font-semibold">Service areas</p>
                <p className="text-muted-foreground">{info.serviceAreas.join(' · ')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Form */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Send a message</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
