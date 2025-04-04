import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,
    port: 5173, 
    strictPort: true, 
    proxy: {
      '/portfolios': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
        secure: false,
      },
      '/images': {
        target: 'http://192.168.1.65:3000', 
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
