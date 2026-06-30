// Centralized, type-narrowed env access for Sanity. Importing from here gives a
// single throw site if required vars are missing rather than silent `undefined`s.

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing env var: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing env var: NEXT_PUBLIC_SANITY_DATASET',
)

// Pin the API version. Bump deliberately when you want new endpoint behavior.
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-01'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}
