import type { Preflight, PreflightContext } from '@unocss/core'
import { entriesToCss } from '@unocss/core'
import type { Theme } from '@unocss/preset-mini'

export const preflights: Preflight[] = [
  {
    layer: 'preflights',
    getCSS(ctx: PreflightContext<Theme>) {
      if (ctx.theme.preflightBase)
        return `page{${entriesToCss(Object.entries(ctx.theme.preflightBase))}}`
    },
  },
]

