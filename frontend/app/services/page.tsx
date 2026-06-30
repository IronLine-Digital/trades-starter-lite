import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/fetch'
import {servicesQuery} from '@/sanity/lib/queries'
import type {Service} from '@/lib/sanity-types'
import {ServiceCard} from '@/components/site/service-card'
import {PageHeader} from '@/components/site/page-header'

export const metadata: Metadata = {
  title: 'Services',
  description: 'The services we offer for homes and businesses.',
}

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(servicesQuery)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Services"
        subtitle="From quick repairs to full installs — licensed and insured work you can count on."
      />

      {services.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Services are coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}
