import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

import { presetIcons } from 'unocss'
import UnoCSS from 'unocss/vite'

import { presetUni } from 'unocss-preset-uni'
import { UnoCSSToUni } from 'unocss-preset-uni/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS({
      presets: [
        // presetUno(),
        presetUni(),
        presetIcons(),
        // ...
      ],
    }),
    UnoCSSToUni(),
    Inspect(),
  ],
})
