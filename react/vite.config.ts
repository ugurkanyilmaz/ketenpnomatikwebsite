import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
