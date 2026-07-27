import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this site under /ai-latte-hero/, not the domain root.
export default defineConfig({
  base: '/ai-latte-hero/',
  plugins: [react()],
})
