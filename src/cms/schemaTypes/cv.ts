import {defineArrayMember, defineField, defineType} from 'sanity'

export const cv = defineType({
  name: 'cv',
  title: 'CV',
  type: 'document',
  description: 'One document. Feeds the downloadable PDF, not the site',
  fields: [
    defineField({
      name: 'headline',
      type: 'localeString',
      description: 'Sits under the name, for example "Full-stack engineer"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      type: 'localeString',
      description: 'City and country. Parsers look for this',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'localeText',
      description: 'Three or four sentences. The first thing a reader and a filter both read',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'skills',
      type: 'array',
      description: 'Grouped so a human can scan them and a parser can still read every term',
      of: [
        defineArrayMember({
          name: 'group',
          type: 'object',
          fields: [
            defineField({name: 'category', type: 'localeString'}),
            defineField({name: 'items', type: 'array', of: [{type: 'string'}]}),
          ],
          preview: {select: {title: 'category.en'}},
        }),
      ],
    }),
    defineField({
      name: 'education',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'entry',
          type: 'object',
          fields: [
            defineField({name: 'qualification', type: 'localeString'}),
            defineField({name: 'school', type: 'string'}),
            defineField({name: 'period', type: 'string', description: 'For example "2010-2014"'}),
          ],
          preview: {select: {title: 'qualification.en', subtitle: 'school'}},
        }),
      ],
    }),
    defineField({
      name: 'languages',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'entry',
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'localeString'}),
            defineField({
              name: 'level',
              type: 'localeString',
              description: 'Plain words rather than a scale, for example "native" or "fluent"',
            }),
          ],
          preview: {select: {title: 'name.en', subtitle: 'level.en'}},
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({title: 'CV'}),
  },
})
