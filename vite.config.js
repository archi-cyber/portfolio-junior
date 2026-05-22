import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: change 'portfolio' to the name of your GitHub repository
// e.g. if your repo is https://github.com/archi-cyber/portfolio-junior
// then base should be '/portfolio-junior/'
export default defineConfig({
  plugins: [react()],
  base: '/portfolio-junior/',
})
