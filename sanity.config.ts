/**
 * Sanity Configuration for Rohamaa Website
 * Headless CMS Integration with Vite + React
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from 'sanity/vision'
import { schemaTypes } from './src/sanity/schema'

// استخراج projectId من متغيرات البيئة الخاصة بـ Vite (import.meta.env)
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'rohamaa-website'
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
    structureTool({
      structure: (S) =>
        S.list()
          .title('المحتوى')
          .items([
            S.listItem()
              .title('لوحة التحكم')
              .icon(() => '📊')
              .child(S.documentTypeList('dashboard').title('لوحة التحكم')),
            
            S.divider(),
            
            S.listItem()
              .title('الأخبار')
              .icon(() => '📰')
              .child(S.documentTypeList('news').title('الأخبار')),
            
            S.listItem()
              .title('قصص النجاح')
              .icon(() => '⭐')
              .child(S.documentTypeList('successStory').title('قصص النجاح')),
            
            S.listItem()
              .title('المشاريع')
              .icon(() => '📁')
              .child(S.documentTypeList('project').title('المشاريع')),
            
            S.listItem()
              .title('التقارير')
              .icon(() => '📄')
              .child(S.documentTypeList('report').title('التقارير')),
            
            S.listItem()
              .title('الوسائط')
              .icon(() => '🖼️')
              .child(S.documentTypeList('media').title('الوسائط')),
            
            S.listItem()
              .title('الشركاء')
              .icon(() => '🤝')
              .child(S.documentTypeList('partner').title('الشركاء')),
            
            S.listItem()
              .title('طلبات التواصل')
              .icon(() => '✉️')
              .child(S.documentTypeList('contactRequest').title('طلبات التواصل')),
            
            S.listItem()
              .title('المتطوعون')
              .icon(() => '👥')
              .child(S.documentTypeList('volunteer').title('المتطوعون')),
            
            S.listItem()
              .title('المشتركون')
              .icon(() => '✅')
              .child(S.documentTypeList('subscriber').title('المشتركون')),
            
            S.listItem()
              .title('المستخدمون')
              .icon(() => '⚙️')
              .child(S.documentTypeList('user').title('المستخدمون')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})