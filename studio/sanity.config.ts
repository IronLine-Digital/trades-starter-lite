import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {schemaTypes} from './schemaTypes'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Singleton document IDs and the actions that don't make sense on them.
// businessInfo is one document per site — no list view, no create/delete.
const SINGLETONS: Record<string, string> = {
  businessInfo: 'businessInfo',
}
const SINGLETON_DISABLED_ACTIONS = new Set(['unpublish', 'delete', 'duplicate'])

export default defineConfig({
  name: 'default',
  title: 'Trades Starter Lite',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: businessInfo — surfaced as one document.
            S.listItem()
              .title('Business Info')
              .id('businessInfo')
              .child(
                S.document().schemaType('businessInfo').documentId('businessInfo'),
              ),

            S.divider(),

            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('project').title('Projects'),
            S.documentTypeListItem('jobPosting').title('Job Postings'),

            S.divider(),

            // Form submissions land here (read-only docs written by the site API).
            // Intentionally a plain list — the full kit adds a tracking dashboard.
            S.documentTypeListItem('contactSubmission').title('Contact Submissions'),
            S.documentTypeListItem('applicationSubmission').title('Application Submissions'),
          ]),
    }),
    visionTool(),
  ],
  schema: {types: schemaTypes},
  document: {
    // Strip create/delete/duplicate/unpublish on singleton document IDs so
    // editors can only update + publish them. Replaces the deprecated
    // `__experimental_actions` schema option.
    actions: (input, context) => {
      const singletonId = SINGLETONS[context.schemaType]
      const isSingletonDoc = singletonId && context.documentId === singletonId
      if (!isSingletonDoc) return input
      return input.filter(({action}) => action && !SINGLETON_DISABLED_ACTIONS.has(action))
    },
    // Hide singletons from the global "+" create menu.
    newDocumentOptions: (prev, {creationContext}) => {
      if (creationContext.type === 'global') {
        return prev.filter((t) => !Object.keys(SINGLETONS).includes(t.templateId))
      }
      return prev
    },
  },
})
