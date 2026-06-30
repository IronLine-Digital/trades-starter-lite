import {Card, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {SanityImage} from './sanity-image'
import {formatDate} from '@/lib/format'
import type {Project} from '@/lib/sanity-types'
import {MapPin} from 'lucide-react'

export function ProjectCard({project}: {project: Project}) {
  return (
    <Card className="h-full">
      {project.featuredImage && (
        <div className="relative aspect-[4/3] overflow-hidden">
          <SanityImage
            image={project.featuredImage}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        {project.category && (
          <span className="w-fit rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {project.category}
          </span>
        )}
        <CardTitle className="text-lg">{project.title}</CardTitle>
      </CardHeader>
      <CardFooter className="justify-between text-xs text-muted-foreground">
        {project.city && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {project.city}
          </span>
        )}
        {project.completedDate && <span>{formatDate(project.completedDate)}</span>}
      </CardFooter>
    </Card>
  )
}
