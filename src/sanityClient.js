import { createClient } from '@sanity/client'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || ''
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

// Only create a real client if project ID is configured
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true
    })
  : null

export const isSanityConfigured = !!projectId
