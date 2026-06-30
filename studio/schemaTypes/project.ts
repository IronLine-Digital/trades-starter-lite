import {defineType, defineField} from 'sanity'
import {Hammer} from 'lucide-react'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: Hammer,
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
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. "Residential", "Commercial", "Repair".',
    }),
    defineField({name: 'city', title: 'City', type: 'string'}),
    defineField({name: 'completedDate', title: 'Completed Date', type: 'date'}),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
  ],
  orderings: [
    {
      title: 'Most recent',
      name: 'completedDateDesc',
      by: [{field: 'completedDate', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'city', media: 'featuredImage'},
  },
})
