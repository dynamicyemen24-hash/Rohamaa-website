/**
 * Sanity Configuration for Rohamaa Website
 * Headless CMS Integration with Vite + React
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

// استخراج projectId من متغيرات البيئة الخاصة بـ Vite (import.meta.env)
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'xd0ohyiz'
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'rohamaa-studio',
  title: 'لوحة تحكم رحماء بينهم',
  projectId,
  dataset,
  
  // Base path for Studio
  basePath: '/admin/studio',

  // Plugins
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})