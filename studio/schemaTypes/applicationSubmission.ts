import {defineType, defineField} from 'sanity'
import {UserPlus} from 'lucide-react'

// Written by the site's /api/apply route. All fields are read-only in the Studio.
export default defineType({
  name: 'applicationSubmission',
  title: 'Application Submission',
  type: 'document',
  icon: UserPlus,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Phone', type: 'string', readOnly: true}),
    defineField({name: 'position', title: 'Position', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 5, readOnly: true}),
    defineField({name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true}),
    defineField({name: 'sourcePage', title: 'Source Page', type: 'string', readOnly: true}),
  ],
  orderings: [
    {title: 'Newest first', name: 'submittedDesc', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'position'},
    prepare({title, subtitle}) {
      return {title: title || 'Unnamed', subtitle: subtitle ? `Applied: ${subtitle}` : ''}
    },
  },
})
