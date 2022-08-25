# unocss-preset-uni

[![Version](https://img.shields.io/npm/v/unocss-preset-uni.svg?style=flat-square&logo=npm) ![Downloads](https://img.shields.io/npm/dm/preset-uni.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/unocss-preset-uni)

:warning: `unocss-preset-uni` has been migrated to `unocss-applet` and fixed the existing issues, maybe you can use [unocss-applet](https://github.com/unocss-applet/unocss-applet).

<br>

The `UniApp` preset for [UnoCSS](https://github.com/unocss/unocss), fork from [@unocss/preset-uno](https://github.com/unocss/unocss/tree/main/packages/preset-uno) and modified to transform some CSS selector that mini-program can't use.

## Installation

```bash
npm i unocss-preset-uni unocss --save-dev # with npm
yarn add unocss-preset-uni unocss -D # with yarn
pnpm add unocss-preset-uni unocss -D # with pnpm
```

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetIcons } from 'unocss'

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
    }),
    // Make sure it's behind Unocss()
    UnoCSSToUni(),
  ],
})
```

## TODO
- [ ] parse string in `TS` file.
- [ ] parse string in `<script></script>`.
- [ ] type error.

## Change

### CSS selector transform

| form | to      | sample                 |
| ---- | ------- | ---------------------- |
| [`*,::before,::after`](https://github.com/unocss/unocss/blob/main/packages/preset-mini/src/preflights.ts) | [`page,::before,::after`](./src/preflights.ts) | - |
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
