import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      type: 'string',
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
      type: 'string',
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
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outcome',
      type: 'text',
      rows: 3,
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
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
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
    select: {title: 'title', subtitle: 'kind', media: 'image'},
  },
})
