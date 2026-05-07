import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'journeyStep',
  title: 'Journey Steps',
  type: 'document',
  fields: [
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'stepNumber'
    }
  },
  orderings: [
    {
      title: 'Step Ascending',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }]
    }
  ]
})

