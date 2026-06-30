import {defineCliConfig} from 'sanity/cli'

// The CLI reads project credentials from SANITY_STUDIO_* env vars (see .env.example).
// Used by `sanity dev`, `sanity build`, `sanity deploy`, and `sanity exec` (seed).
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  // Keep Studio dependencies current with non-breaking auto-updates on deploy.
  deployment: {autoUpdates: true},
})
