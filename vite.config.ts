import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/hermanscience-prompt-cqi-roi-calculator/',
  plugins: [react()],
})