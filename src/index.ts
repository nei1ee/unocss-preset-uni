import type { Preset } from '@unocss/core'
import type { PresetMiniOptions, Theme } from '@unocss/preset-mini'
import { rules, shortcuts, theme, variants } from '@unocss/preset-wind'
import { preflights } from './preflights'
import { unoCSSToUniProcess } from './process'
import { variantColorMix } from './variants/mix'

export type { Theme }

export interface PresetUnoOptions extends PresetMiniOptions {}

export const presetUni = (options: PresetUnoOptions = {}): Preset<Theme> => {
  options.dark = options.dark ?? 'class'
  options.attributifyPseudo = options.attributifyPseudo ?? false

  return {
    name: 'unocss-preset-uni',
    theme,
    rules,
    shortcuts,
    variants: [
      ...variants(options),
      variantColorMix,
    ],
    options,
    preflights,
    postprocess: (util) => {
      util.selector = unoCSSToUniProcess(util.selector)
      return util
    },
    prefix: options.prefix,
  } as Preset
}

export default presetUni

