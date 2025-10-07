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
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
      }
    }
  },
  optimizeDeps: {
    include: ['pdfjs-dist']
  }
})
