import {defineType, defineField} from 'sanity'
import {Wrench} from 'lucide-react'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: Wrench,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (R) => R.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'string',
      description: 'One sentence (max 160 chars). Used on service cards.',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description:
        'Optional Lucide icon name (e.g. "Wrench", "Zap", "Droplets", "Thermometer"). Shown when no featured image is set.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. "HVAC Repair", "Plumbing", "Roofing".',
    }),
    defineField({name: 'featured', title: 'Featured', type: 'boolean', initialValue: false}),
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
    {title: 'Name (A→Z)', name: 'nameAsc', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'category', media: 'featuredImage'},
  },
})
