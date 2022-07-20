import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import Unocss from 'unocss/vite'
import {
  presetIcons,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetUni } from 'unocss-preset-uni'
import { UnoCSSToUni } from 'unocss-preset-uni/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({
      presets: [
        // presetUno(),
        presetUni(),
        presetIcons(),
      ],
      transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
      ],
    }),
    UnoCSSToUni(),
    Inspect(),
  ],
})
