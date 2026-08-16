import {defineField, defineType} from 'sanity'

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'org',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'dateLabel',
      type: 'string',
      description: 'Shown as written, for example "Sep 2025 - now". Engagements overlap, so this is not a date range',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'current',
      type: 'boolean',
      description: 'Marks the entry as ongoing',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
      description: 'What the work was. Avoid anything that states you are still employed there',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Newest first, lowest number first',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'role', subtitle: 'org'},
  },
})
