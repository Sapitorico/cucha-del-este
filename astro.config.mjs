// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import vercel from '@astrojs/vercel'

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    svg: true,
  },
})
