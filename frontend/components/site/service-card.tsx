import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {SanityImage} from './sanity-image'
import type {Service} from '@/lib/sanity-types'
import {
  Wrench,
  Zap,
  Droplets,
  Thermometer,
  Lightbulb,
  Gauge,
  Plug,
  Hammer,
  BatteryCharging,
  ShieldCheck,
  Cable,
  type LucideIcon,
} from 'lucide-react'

// Map the schema's `icon` string to a Lucide component. Falls back to Wrench.
// Buyers can extend this list for their trade.
const ICONS: Record<string, LucideIcon> = {
  Wrench,
  Zap,
  Droplets,
  Thermometer,
  Lightbulb,
  Gauge,
  Plug,
  Hammer,
  BatteryCharging,
  ShieldCheck,
  Cable,
}

export function ServiceCard({service}: {service: Service}) {
  const Icon = (service.icon && ICONS[service.icon]) || Wrench
  return (
    <Card className="h-full">
      {service.featuredImage && (
        <div className="relative aspect-[16/10] overflow-hidden">
          <SanityImage
            image={service.featuredImage}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-brand">
          <Icon className="h-5 w-5" aria-hidden />
          {service.category && (
            <CardDescription className="text-xs uppercase tracking-widest text-brand">
              {service.category}
            </CardDescription>
          )}
        </div>
        <CardTitle className="font-heading text-lg tracking-wide">{service.name}</CardTitle>
      </CardHeader>
      {service.shortDescription && (
        <CardContent>
          <p className="line-clamp-3 text-sm text-muted-foreground">{service.shortDescription}</p>
        </CardContent>
      )}
    </Card>
  )
}
