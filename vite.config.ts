import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // The site is served from the domain root (Cloudflare Pages). An absolute
  // base keeps nested routes such as /zh/friends working on a hard refresh.
  base: '/',
  plugins: [react(), tailwindcss()],
})
