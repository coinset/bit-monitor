import preact from '@preact/preset-vite'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [preact(), Unocss({})]
})
