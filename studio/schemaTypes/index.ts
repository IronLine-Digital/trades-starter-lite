import type {SchemaTypeDefinition} from 'sanity'

import businessInfo from './businessInfo'
import service from './service'
import project from './project'
import jobPosting from './jobPosting'
import contactSubmission from './contactSubmission'
import applicationSubmission from './applicationSubmission'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Content
  businessInfo,
  service,
  project,
  jobPosting,
  // Form submissions (written by the site API, read-only in Studio)
  contactSubmission,
  applicationSubmission,
]
