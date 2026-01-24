import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  root: 'src',  // src contains index.html and main.tsx
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // React alias
    },
  },
  server: {
    port: 5173
  },
  publicDir: path.resolve(__dirname, 'public') // points to your project-level public folder
})
