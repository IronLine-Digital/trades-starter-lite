// Server-only Sanity client for write operations (form submissions).
// Never import this from a client component — it carries SANITY_API_WRITE_TOKEN.
import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token && process.env.NODE_ENV !== 'test') {
  console.warn('[sanity] SANITY_API_WRITE_TOKEN not set — form submissions will fail to save.')
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  perspective: 'published',
})
