import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { raw } from 'vite-plugin-raw'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    raw({
      match: /\.did$/,
    })
  ],
})
