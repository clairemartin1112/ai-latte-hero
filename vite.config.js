import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves this site under /ai-latte-hero/, while Vercel uses the domain root.
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/ai-latte-hero/',
  plugins: [react()],
})
