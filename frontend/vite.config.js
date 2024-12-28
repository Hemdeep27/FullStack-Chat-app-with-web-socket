import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Explicitly set the output directory
    assetsDir: 'assets', // Directory for static assets within 'dist'
  },
})
