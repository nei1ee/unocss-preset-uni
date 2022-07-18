# preset-uni

The `UniApp` preset for [UnoCSS](https://github.com/unocss/unocss), fork from [@unocss/preset-uno](https://github.com/unocss/unocss/tree/main/packages/preset-uno) and modified to adapt to the uni-app miniprogram.

> Please note that this preset is more like a playground at the current stage to experiment with the possibility of UnoCSS and also as a reference for making a custom preset. It does NOT follow semver and subjects to changes without further notice. We don't recommend using it on serious works. Use custom rules instead to ensure a stable outcome.

## Installation

```bash
npm i -D preset-uni
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

import { presetUni } from 'preset-uni'
import { UnoCSSToUni } from 'preset-uni/vite'

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
    }),
    // Make sure it's behind Unocss()
    UnoCSSToUni(),
  ],
})
```

## Usages

This preset is trying to provide a common superset of the popular utilities-first framework, including Tailwind CSS, Windi CSS, Bootstrap, Tachyons, etc.

For example, both `ml-3` (Tailwind), `ms-2` (Bootstrap), `ma4` (Tachyons), `mt-10px` (Windi CSS) are valid.

```css
.ma4 { margin: 1rem; }
.ml-3 { margin-left: 0.75rem; }
.ms-2 { margin-inline-start: 0.5rem; }
.mt-10px { margin-top: 10px; }
```

For more details about the default preset, you can check out our [playground](https://unocss.antfu.me/) and try out. Meanwhile, you can also check out [the implementations](https://github.com/unocss/unocss/tree/main/packages).

## Change

### CSS selector transform

| form | to      | sample                 |
| ---- | ------- | ---------------------- |
| [`*,::before,::after`](https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/preflights.ts) | [`page`](./src/preflights.ts) | - |
| `\.` | `-point-` | `p-0.5` -> `p-0-point-5` |
| `\/` | `-div-` | `p-1/2` -> `p-1-div-2` |
| `\:` | `-c-` | `dark:text-green-500` -> `dark-c-text-green-500` |
| `\%` | `-pct` | `opacity-10%` -> `opacity-10-pct` |
| `\!` | `i-` | `!bg-black` -> `i-bg-black` |
| `\#` | `-h-` | `bg-#121212` -> `bg--h-121212` |
| `\(` | `p-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hslp-2.7,81.9%,69.6%)]` |
| `\)` | `-q` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%-q]` |
| `\[` | `l-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-l-hsl(2.7,81.9%,69.6%)]` |
| `\]` | `-r` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7,81.9%,69.6%)-r` |
| `\,` | `-comma-` | `bg-[hsl(2.7,81.9%,69.6%)]` -> `bg-[hsl(2.7-comma-81.9%-comma-69.6%)]` |

## License

MIT License &copy; 2022-PRESENT [Neil Lee](https://github.com/zguolee)
