import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'promoSlide',
  title: 'Promo Slides',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeText'
    }),
    defineField({
      name: 'mediaImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url'
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'url',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'ctaLink'
    }
  }
})

