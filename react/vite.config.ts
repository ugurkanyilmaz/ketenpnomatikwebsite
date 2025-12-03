import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Android >= 5'],
    }),
  ],
  assetsInclude: ['**/*.pdf'],
  server: {
    fs: {
      allow: ['..']
    },
    proxy: {
      '/php': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/php/, '')
      }
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
  }
})
