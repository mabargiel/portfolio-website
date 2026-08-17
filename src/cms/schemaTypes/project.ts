import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'localeString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      type: 'localeString',
      description: 'First part of the eyebrow line, for example "Workflow engine"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      type: 'string',
      description: 'Leave empty when the client cannot be named',
    }),
    defineField({
      name: 'period',
      type: 'localeString',
      description: 'Shown as written, for example "2025-now". Not a date, because engagements overlap',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'current',
      type: 'boolean',
      description: 'Drives the eyebrow colour: gold while running, rust once finished',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      type: 'localeText',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outcome',
      type: 'localeText',
      description: 'The pull quote. About your part in it, not about the product',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stack',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'links',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'url',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'images',
      type: 'array',
      description: 'One shot, or a pair shown stacked. Projects with a diagram need none',
      of: [
        defineField({
          name: 'shot',
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'localeString',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      validation: (rule) => rule.max(2),
    }),
    defineField({
      name: 'diagram',
      type: 'string',
      description: 'Selects a diagram drawn in code. Projects without one use their image',
      options: {
        list: [
          {title: 'Workflow engine', value: 'workflow-engine'},
          {title: 'Data blend', value: 'data-blend'},
          {title: 'Backends for frontends', value: 'bff'},
        ],
      },
    }),
    defineField({
      name: 'onCv',
      type: 'boolean',
      description: 'Include this project in the downloadable CV',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Priority order, lowest first. The list is not chronological',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Priority',
      name: 'priority',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title.en', subtitle: 'kind.en', media: 'images.0'},
  },
})
