import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' ? '/gmae-box/' : './',
  server: {
    host: true,
    port: 5173,
  },
})
