import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS === 'true' ? '/gmae-box/' : './',
  server: {
    host: true,
    port: 5173,
  },
  test: {
    include: ['src/**/*.test.ts'],
  },
})
