import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,json,txt,woff2}']
      },
      manifest: {
        name: 'Asahi x Family - Japanese Learning',
        short_name: 'Asahi x Family',
        description: 'Learn katakana and basic Japanese through anime-inspired lessons',
        theme_color: '#f59e0b',
        background_color: '#1e3a8a',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        icons: [
          {
            src: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🌅</text></svg>',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ],
        categories: ['education', 'language']
      }
    })
  ],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true,
    open: true
  },
  preview: {
    port: 4173,
    host: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  }
})