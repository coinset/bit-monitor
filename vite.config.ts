import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import Unocss from 'unocss/vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [preact(), Unocss({})]
})
