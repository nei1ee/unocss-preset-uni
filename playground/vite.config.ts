import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import UnoCSS from 'unocss/vite'

import { presetUni } from 'unocss-preset-uni'
import { UnoCSSToUni } from 'unocss-preset-uni/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      presets: [
        // presetUno(),
        presetUni(),
        // ...
      ],
    }),
    UnoCSSToUni(),
    Inspect(),
  ],
})
