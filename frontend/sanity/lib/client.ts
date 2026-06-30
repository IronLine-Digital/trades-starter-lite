import {createClient} from 'next-sanity'

import {apiVersion, dataset, projectId} from '../env'

// Public read client. Lite has no visual editing, so there's no stega encoding
// and no draft-mode/live client — published reads served from Sanity's CDN.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})
