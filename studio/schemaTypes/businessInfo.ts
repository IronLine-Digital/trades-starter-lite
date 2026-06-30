import {defineType, defineField} from 'sanity'
import {Building2} from 'lucide-react'

// One day's open/close hours. Reused for all seven days below.
const dayHoursField = (day: string, title: string) =>
  defineField({
    name: day,
    title,
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: [
      defineField({name: 'closed', title: 'Closed', type: 'boolean', initialValue: false}),
      defineField({
        name: 'open',
        title: 'Open',
        type: 'string',
        placeholder: '08:00',
        hidden: ({parent}) => parent?.closed === true,
      }),
      defineField({
        name: 'close',
        title: 'Close',
        type: 'string',
        placeholder: '17:00',
        hidden: ({parent}) => parent?.closed === true,
      }),
    ],
  })

// Singleton — one document per site. Drives the header, footer, hero and contact page.
// Create/delete/duplicate are stripped via `document.actions` in sanity.config.ts.
export default defineType({
  name: 'businessInfo',
  title: 'Business Info',
  type: 'document',
  icon: Building2,
  fields: [
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'tradeType',
      title: 'Trade Type',
      type: 'string',
      description: 'Used for labeling and (in the full kit) Schema.org @type.',
      options: {
        list: [
          {title: 'Electrician', value: 'Electrician'},
          {title: 'Plumber', value: 'Plumber'},
          {title: 'HVAC', value: 'HVACBusiness'},
          {title: 'Roofing Contractor', value: 'RoofingContractor'},
          {title: 'House Painter', value: 'HousePainter'},
          {title: 'General Contractor', value: 'GeneralContractor'},
          {title: 'Locksmith', value: 'Locksmith'},
          {title: 'Landscaping', value: 'LandscapeArchitect'},
          {title: 'Local Business (generic)', value: 'LocalBusiness'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'LocalBusiness',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({name: 'email', title: 'Email', type: 'string'}),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({name: 'street', title: 'Street', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'state', title: 'State', type: 'string'}),
        defineField({name: 'zip', title: 'ZIP', type: 'string'}),
      ],
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Cities or neighborhoods served. Shown on the contact page and footer.',
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        dayHoursField('monday', 'Monday'),
        dayHoursField('tuesday', 'Tuesday'),
        dayHoursField('wednesday', 'Wednesday'),
        dayHoursField('thursday', 'Thursday'),
        dayHoursField('friday', 'Friday'),
        dayHoursField('saturday', 'Saturday'),
        dayHoursField('sunday', 'Sunday'),
      ],
    }),
    defineField({name: 'licenseNumber', title: 'License Number', type: 'string'}),
    defineField({name: 'insured', title: 'Insured', type: 'boolean', initialValue: true}),
    defineField({
      name: 'social',
      title: 'Social Links',
      type: 'object',
      options: {collapsible: true, collapsed: true},
      fields: [
        defineField({name: 'facebook', title: 'Facebook', type: 'url'}),
        defineField({name: 'instagram', title: 'Instagram', type: 'url'}),
        defineField({name: 'google', title: 'Google Business', type: 'url'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'businessName', subtitle: 'tagline'},
  },
})
