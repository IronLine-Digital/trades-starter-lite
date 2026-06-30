import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/fetch'
import {activeJobPostingsQuery} from '@/sanity/lib/queries'
import type {JobPosting} from '@/lib/sanity-types'
import {JobCard} from '@/components/site/job-card'
import {ApplyForm} from '@/components/site/apply-form'
import {PageHeader} from '@/components/site/page-header'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Open positions and how to apply.',
}

export default async function CareersPage() {
  const jobs = await sanityFetch<JobPosting[]>(activeJobPostingsQuery)
  const positions = jobs.map((j) => j.title)

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Careers"
        subtitle="We're a tight, respectful crew that does great work. If that sounds like you, we'd like to hear from you."
      />

      {jobs.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          No open positions right now — check back soon, or reach out through our contact page.
        </p>
      ) : (
        <>
          <div className="mt-10 grid gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>

          <section className="mt-16">
            <h2 className="text-2xl font-bold tracking-tight">Apply now</h2>
            <p className="mt-2 text-muted-foreground">
              Pick the role you&rsquo;re interested in and tell us a bit about yourself.
            </p>
            <div className="mt-6 max-w-2xl">
              <ApplyForm positions={positions} />
            </div>
          </section>
        </>
      )}
    </div>
  )
}
