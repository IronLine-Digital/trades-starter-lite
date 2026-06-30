import type {Metadata} from 'next'
import {sanityFetch} from '@/sanity/lib/fetch'
import {projectsQuery} from '@/sanity/lib/queries'
import type {Project} from '@/lib/sanity-types'
import {ProjectCard} from '@/components/site/project-card'
import {PageHeader} from '@/components/site/page-header'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'A gallery of our recent work.',
}

export default async function ProjectsPage() {
  const projects = await sanityFetch<Project[]>(projectsQuery)

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <PageHeader
        title="Projects"
        subtitle="Recent jobs we're proud of — quality work, done right."
      />

      {projects.length === 0 ? (
        <p className="mt-10 text-muted-foreground">Projects are coming soon.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
