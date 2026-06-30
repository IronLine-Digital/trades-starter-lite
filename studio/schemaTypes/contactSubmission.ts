import {defineType, defineField} from 'sanity'
import {Inbox} from 'lucide-react'

// Written by the site's /api/contact route. All fields are read-only in the
// Studio so editors never alter the original submission. The full kit adds a
// status/notes follow-up workflow — intentionally omitted here.
export default defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  icon: Inbox,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'phone', title: 'Phone', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Message', type: 'text', rows: 5, readOnly: true}),
    defineField({name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true}),
    defineField({name: 'sourcePage', title: 'Source Page', type: 'string', readOnly: true}),
  ],
  orderings: [
    {title: 'Newest first', name: 'submittedDesc', by: [{field: 'submittedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'email'},
    prepare({title, subtitle}) {
      return {title: title || 'Unnamed', subtitle: subtitle || ''}
    },
  },
})
