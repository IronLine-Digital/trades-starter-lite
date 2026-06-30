import {client} from './client'

// Lite has no visual editing / Live Content API. This thin wrapper centralizes
// the read client + ISR revalidation so pages don't repeat fetch options.
// Published content is served from Sanity's CDN and re-checked every 60s.
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  return client.fetch<T>(query, params, {next: {revalidate: 60}})
}
