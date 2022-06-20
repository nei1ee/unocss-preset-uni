import type { Preset } from '@unocss/core'
import type { PresetMiniOptions, Theme } from '@unocss/preset-mini'
import { rules, shortcuts, theme, variants } from '@unocss/preset-wind'
import { unoCSSToUniProcess } from './process'
import { preflights } from './preflights'
import { variantColorMix } from './variants/mix'

export type { Theme }

export interface PresetUnoOptions extends PresetMiniOptions {}

export const presetUni = (options: PresetUnoOptions = {}): Preset<Theme> => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false

  return {
    name: 'preset-uni',
    theme,
    rules,
    shortcuts,
    variants: [
      ...variants(options),
      variantColorMix,
    ],
    options,
    preflights,
    postprocess: t => ({
      ...t,
      selector: unoCSSToUniProcess(t.selector),
    }),
  }
}

export default presetUni
