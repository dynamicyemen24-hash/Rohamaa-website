import { defineConfig } from 'vite'
import * as path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Core React
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/scheduler/')) {
            return 'vendor-core'
          }
          // MUI
          if (id.includes('node_modules/@emotion/') || id.includes('node_modules/@mui/')) {
            return 'vendor-mui'
          }
          // Radix UI
          if (id.includes('node_modules/@radix-ui/')) {
            return 'vendor-radix'
          }
          // Recharts (large)
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-') || id.includes('node_modules/victory-')) {
            return 'vendor-charts'
          }
          // Form libraries
          if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/react-dnd') || id.includes('node_modules/dnd-core')) {
            return 'vendor-form'
          }
          // Lucide (large icon library)
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }
          // Supabase
          if (id.includes('node_modules/@supabase/')) {
            return 'vendor-supabase'
          }
          // Motion/Framer
          if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom') || id.includes('node_modules/motion-utils')) {
            return 'vendor-motion'
          }
          // Utility libraries
          if (id.includes('node_modules/date-fns') || id.includes('node_modules/clsx') || id.includes('node_modules/class-variance-authority') || id.includes('node_modules/tailwind-merge')) {
            return 'vendor-utils'
          }
          // Lodash (large)
          if (id.includes('node_modules/lodash')) {
            return 'vendor-lodash'
          }
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    modulePreload: {
      polyfill: true,
    },
  },
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: false,
    },
  },
  plugins: [
    tailwindcss(),
    react(),
  ],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react',
      '@supabase/supabase-js',
    ],
  },
})