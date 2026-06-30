import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'

import {dataset, projectId} from '../env'

const imageBuilder = createImageUrlBuilder({projectId, dataset})

// Usage:
//   urlFor(image).width(800).height(600).fit('crop').auto('format').url()
//   urlFor(image).width(20).blur(10).url()  // blur placeholder
//
// Always pair `fit('crop')` with `.auto('format')` so Sanity respects hotspots
// AND serves WebP/AVIF when the browser supports it.
export const urlFor = (source: SanityImageSource) => imageBuilder.image(source)
