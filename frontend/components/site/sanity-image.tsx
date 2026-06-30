'use client'

// Client Component because next/image's `loader` prop is a function — and
// functions cannot be passed across the RSC boundary. Marking the wrapper
// 'use client' keeps the loader bundled into the client chunk; Server pages
// can still render <SanityImage> because the `image` prop is plain JSON.

import Image, {type ImageLoaderProps} from 'next/image'
import {urlFor} from '@/sanity/lib/image'
import type {SanityImage as SanityImageType} from '@/lib/sanity-types'
import {cn} from '@/lib/utils'

type SanityImageProps = {
  image: SanityImageType | undefined | null
  alt?: string
  className?: string
  sizes?: string
  priority?: boolean
  fetchPriority?: 'high' | 'low' | 'auto'
  quality?: number
} & ({fill: true; width?: never; height?: never} | {fill?: false; width?: number; height?: number})

// Custom loader: bypasses Vercel's /_next/image optimizer and lets Sanity's CDN
// handle resize + format conversion directly (auto=format → AVIF/WebP).
function sanityLoader({src, width, quality}: ImageLoaderProps): string {
  const sep = src.includes('?') ? '&' : '?'
  return `${src}${sep}w=${width}&q=${quality ?? 75}&auto=format&fit=max`
}

export function SanityImage({
  image,
  alt,
  className,
  sizes,
  priority,
  fetchPriority,
  quality,
  fill,
  width,
  height,
}: SanityImageProps) {
  if (!image?.asset) return null

  const dims = image.asset.metadata?.dimensions
  const lqip = image.asset.metadata?.lqip
  const resolvedAlt = alt ?? image.alt ?? ''

  const intrinsicWidth = width ?? dims?.width
  const intrinsicHeight = height ?? dims?.height

  const src = urlFor(image as Parameters<typeof urlFor>[0]).url()

  const tooSmallForBlur =
    !fill &&
    intrinsicWidth != null &&
    intrinsicHeight != null &&
    (intrinsicWidth < 40 || intrinsicHeight < 40)

  const commonProps = {
    src,
    loader: sanityLoader,
    sizes,
    priority,
    fetchPriority,
    quality,
    placeholder: lqip && !tooSmallForBlur ? ('blur' as const) : undefined,
    blurDataURL: lqip && !tooSmallForBlur ? lqip : undefined,
    className: cn(className),
  }

  if (fill) {
    return <Image {...commonProps} alt={resolvedAlt} fill />
  }

  if (!intrinsicWidth || !intrinsicHeight) {
    return (
      <Image
        {...commonProps}
        alt={resolvedAlt}
        width={intrinsicWidth ?? 1200}
        height={intrinsicHeight ?? 800}
      />
    )
  }

  return (
    <Image {...commonProps} alt={resolvedAlt} width={intrinsicWidth} height={intrinsicHeight} />
  )
}
