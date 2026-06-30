import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {PortableTextRenderer} from './portable-text'
import {humanize} from '@/lib/format'
import type {JobPosting} from '@/lib/sanity-types'
import {Briefcase, MapPin, Check} from 'lucide-react'

export function JobCard({job}: {job: JobPosting}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          {job.employmentType && (
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-brand" />
              {humanize(job.employmentType)}
            </span>
          )}
          {job.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-brand" />
              {job.location}
            </span>
          )}
        </div>
        <CardTitle className="font-heading text-xl tracking-wide">{job.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {job.description && (
          <div className="text-sm">
            <PortableTextRenderer value={job.description} />
          </div>
        )}
        {job.requirements && job.requirements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold">Requirements</h4>
            <ul className="mt-2 space-y-1.5">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
