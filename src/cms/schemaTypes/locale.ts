import {defineField, defineType} from 'sanity'

const description = 'Polish is optional. Empty falls back to English on the site'

export const localeString = defineType({
  name: 'localeString',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'pl', title: 'Polski', type: 'string', description}),
  ],
})

export const localeText = defineType({
  name: 'localeText',
  title: 'Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'pl', title: 'Polski', type: 'text', rows: 4, description}),
  ],
})
