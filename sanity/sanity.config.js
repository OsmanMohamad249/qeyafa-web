import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import schemas from './schema'

export default defineConfig({
  name: 'qeyafa-studio',
  title: 'Qeyafa CMS',
  projectId: '1ie3hi3t',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemas
  }
})
