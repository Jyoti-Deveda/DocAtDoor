import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components")}`,
      services: `${path.resolve(__dirname, "./src/services")}`,
      styles: `${path.resolve(__dirname, "./src/styles")}`,
      util: `${path.resolve(__dirname, "./src/util")}`,
      pages: `${path.resolve(__dirname, "./src/pages")}`,
      assets: `${path.resolve(__dirname, "./src/assets")}`,
    }
  }
})
