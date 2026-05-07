import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name (English)',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'nameLocalized',
      title: 'Partner Name (Localized)',
      type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL',
      type: 'url'
    })
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo'
    }
  }
})
