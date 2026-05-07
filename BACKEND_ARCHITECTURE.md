# Phase 4 — Dynamic Backend Integration Plan

## Task Checklist
- [x] Recommend a headless CMS that pairs with React/Vite and supports bilingual content.
- [x] Define content models for Partners, Promo Slides, and Journey Steps.
- [x] Describe the integration strategy for `Home.jsx`, including loading states and component refactors.

---

## 1. Recommended CMS: **Sanity v3**

| Requirement | Why Sanity Fits |
| --- | --- |
| React/Vite friendly | Official `@sanity/client` SDK with tree-shakable ESM build works seamlessly in Vite. |
| Localization | Built-in Internationalization plugin (`@sanity/code-input` + `@sanity/document-internationalization`) allows field-level locales (en/ar) without duplicating schemas. |
| Media uploads | Studio ships with asset pipeline (images/files) + CDN; supports custom validation and metadata. |
| Hosting/Admin | Sanity Studio can be deployed as a standalone admin panel (Sanity Managed Hosting, Vercel, Netlify) or embedded inside this repo via `sanity` subfolder. |
| Developer experience | GROQ querying, real-time content subscriptions, portable text, role-based access, and webhooks for incremental rebuilds. |

### Installation & Setup Steps
```bash
# 1. Install Sanity CLI globally (optional but handy)
npm install -g @sanity/cli

# 2. Bootstrap a new Sanity project inside the repo
cd C:/Users/HP/WebstormProjects/qeyafa-web
sanity init --dataset production --project "qeyafa" --create-project "Qeyafa CMS" --template clean

# 3. Add localization + schema dependencies inside the sanity folder
cd sanity
npm install @sanity/vision @sanity/code-input sanity-plugin-internationalized-array

# 4. Run the studio locally
npm run dev
```
> **Note:** Keep `.env` files outside of Git history. Required vars for the front-end will include `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET`, and optionally a read-only token if you need private datasets.

---

## 2. Content Models

Below are the Sanity schema definitions at a high level (pseudo-code). Each schema should include `preview` settings and slug/ordering rules as needed.

### `partner`
```js
{
  name: 'partner',
  title: 'Partners',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Partner Name', validation: Rule => Rule.required() },
    { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true }, validation: Rule => Rule.required() },
    { name: 'websiteUrl', type: 'url', title: 'Website URL' }
  ],
  preview: {
    select: { title: 'name', media: 'logo' }
  }
}
```

### `promoSlide`
```js
{
  name: 'promoSlide',
  title: 'Promo Slides',
  type: 'document',
  fields: [
    { name: 'title', type: 'internationalizedArrayString', title: 'Title', validation: Rule => Rule.required() },
    { name: 'mediaType', type: 'string', options: { list: ['image', 'video'] }, initialValue: 'video' },
    { name: 'mediaUrl', type: 'url', title: 'Media URL', validation: Rule => Rule.required() },
    { name: 'ctaLink', type: 'url', title: 'CTA Link', validation: Rule => Rule.required() },
    { name: 'isActive', type: 'boolean', title: 'Is Active?', initialValue: true }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'mediaType'
    }
  }
}
```
> `internationalizedArrayString` comes from the `sanity-plugin-internationalized-array`, storing `{_type: 'internationalizedArrayString', en: '...', ar: '...'}`. Alternative: use custom objects with `localeString` type.

### `journeyStep`
```js
{
  name: 'journeyStep',
  title: 'Journey Steps',
  type: 'document',
  fields: [
    { name: 'stepNumber', type: 'number', title: 'Step Number', validation: Rule => Rule.min(1).required() },
    { name: 'title', type: 'internationalizedArrayString', title: 'Title', validation: Rule => Rule.required() },
    { name: 'description', type: 'internationalizedArrayText', title: 'Description', validation: Rule => Rule.required() }
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'stepNumber'
    }
  },
  orderings: [
    {
      title: 'Step Number Asc',
      name: 'stepAsc',
      by: [{ field: 'stepNumber', direction: 'asc' }]
    }
  ]
}
```

---

## 3. Front-End Integration Plan

### Data Fetching Strategy
1. **Client Setup**: Create `src/lib/sanity.js` exporting a configured client:
   ```js
   import { createClient } from '@sanity/client'

   export const sanityClient = createClient({
     projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
     dataset: import.meta.env.VITE_SANITY_DATASET,
     apiVersion: '2024-01-01',
     useCdn: true
   })
   ```
2. **Queries**: Define GROQ queries for each model under `src/queries/home.groq.js` (e.g., `*[_type == "partner"] | order(_createdAt asc)`), selecting localized fields via `[locale]` syntax.
3. **Loader Hook**: Create `useHomeContent` hook:
   ```js
   import { useEffect, useState } from 'react'
   import { sanityClient } from '@/lib/sanity'
   import { getHomeContent } from '@/queries/home'

   export function useHomeContent(locale) {
     const [data, setData] = useState({ partners: [], promoSlides: [], steps: [] })
     const [loading, setLoading] = useState(true)

     useEffect(() => {
       let isMounted = true
       setLoading(true)
       sanityClient.fetch(getHomeContent(locale)).then(result => {
         if (isMounted) {
           setData(result)
           setLoading(false)
         }
       }).catch(() => setLoading(false))
       return () => { isMounted = false }
     }, [locale])

     return { ...data, loading }
   }
   ```
   `getHomeContent` can compose the three queries into one response `{ partners, promoSlides, steps }`.

### Component Refactors
- **`PromoSection.jsx`**
  - Accept `slides` prop.
  - If multiple slides, implement a carousel (e.g., `framer-motion` or `keen-slider`).
  - Fallback to static placeholder when `slides` is empty.
  - Render localized titles via `slide.title[locale]`.

- **`Partners` marquee in `Home.jsx`**
  - Replace static `partners` array with CMS data.
  - Use Sanity image URLs via `@sanity/image-url` helper to handle DPR/format.

- **`JourneyStepper.jsx`**
  - Accept `steps` prop.
  - Sort by `stepNumber` before rendering.
  - Replace translation lookups with CMS-provided localized text.

### Loading & Error States
- **Skeletons**: While `loading === true`, render shimmering placeholders:
  - Partners: show 4 grey boxes with animated pulse.
  - Promo: display `Skeleton` component matching video aspect ratio.
  - Journey: render muted circles/lines.
- **Fallback Copy**: If CMS data fails (`steps.length === 0`), keep the existing translation-based defaults to avoid blank UI.

---

## Summary
1. **CMS**: Adopt Sanity for rapid, localized content management.
2. **Schemas**: Define `partner`, `promoSlide`, and `journeyStep` with locale-aware fields and required validations.
3. **Integration**: Add a Sanity client, queries, and a `useHomeContent` hook to hydrate `PromoSection`, partners marquee, and `JourneyStepper`. Provide graceful skeleton fallbacks and retain existing translations as backups.

This architecture unlocks non-technical editing of the homepage assets while keeping the React front-end performant and fully localized.

