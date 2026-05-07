import { createClient } from '@sanity/client'

// Fallback to avoid crash if env vars are missing
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'dummy-project-id'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true
})
