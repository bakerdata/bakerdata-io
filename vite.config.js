import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  // For custom domain (bakerdata.io) keep base as '/'.
  // For github.io subdomain (no custom domain), change to '/repo-name/'
  base: '/',
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
})
