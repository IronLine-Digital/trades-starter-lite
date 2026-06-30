import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/fetch'
import {
  businessInfoQuery,
  featuredServicesQuery,
  recentProjectsQuery,
} from '@/sanity/lib/queries'
import type {BusinessInfo, Service, Project} from '@/lib/sanity-types'
import {Hero} from '@/components/site/hero'
import {Cta} from '@/components/site/cta'
import {ServiceCard} from '@/components/site/service-card'
import {ProjectCard} from '@/components/site/project-card'
import {buttonVariants} from '@/components/ui/button'

export default async function HomePage() {
  const [info, services, projects] = await Promise.all([
    sanityFetch<BusinessInfo | null>(businessInfoQuery),
    sanityFetch<Service[]>(featuredServicesQuery),
    sanityFetch<Project[]>(recentProjectsQuery),
  ])

  return (
    <>
      <Hero info={info} />

      {services.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">What we do</h2>
            <p className="mt-3 text-muted-foreground">
              Licensed, insured, and ready to help with projects big and small.
            </p>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/services" className={buttonVariants({variant: 'outline'})}>
              View all services
            </Link>
          </div>
        </section>
      )}

      {projects.length > 0 && (
        <section className="bg-concrete/40">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight">Recent projects</h2>
              <p className="mt-3 text-muted-foreground">A look at some of our recent work.</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/projects" className={buttonVariants({variant: 'outline'})}>
                View all projects
              </Link>
            </div>
          </div>
        </section>
      )}

      <Cta info={info} />
    </>
  )
}
