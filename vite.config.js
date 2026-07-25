import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/MindMirrorAI/',
  server: {
    proxy: {
      '/n8n-proxy': {
        target: 'https://rushil13.app.n8n.cloud',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/n8n-proxy/, ''),
      }
    }
  }
})
