import {defineType, defineField} from 'sanity'
import {Briefcase} from 'lucide-react'

const EMPLOYMENT_TYPES = [
  {title: 'Full-time', value: 'full_time'},
  {title: 'Part-time', value: 'part_time'},
  {title: 'Contract', value: 'contract'},
  {title: 'Seasonal', value: 'seasonal'},
  {title: 'Apprenticeship', value: 'apprenticeship'},
] as const

export default defineType({
  name: 'jobPosting',
  title: 'Job Posting',
  type: 'document',
  icon: Briefcase,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {list: EMPLOYMENT_TYPES.map((t) => ({title: t.title, value: t.value}))},
      initialValue: 'full_time',
    }),
    defineField({name: 'location', title: 'Location', type: 'string'}),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{type: 'string'}],
      description: 'One requirement per line. Rendered as a bullet list.',
    }),
    defineField({
      name: 'active',
      title: 'Active (accepting applications)',
      type: 'boolean',
      initialValue: true,
      description: 'Only active postings appear on the careers page and in the apply form.',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first.',
      initialValue: 0,
    }),
  ],
  orderings: [
    {title: 'Manual order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'employmentType', active: 'active'},
    prepare({title, subtitle, active}) {
      const label = subtitle ? subtitle.replace(/_/g, ' ') : ''
      return {title: title || 'Untitled', subtitle: `${active ? '● ' : '○ '}${label}`}
    },
  },
})
