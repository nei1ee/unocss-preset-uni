import type { PluginOption } from 'vite'
import { parse } from '@vue/compiler-sfc'
import MagicString from 'magic-string'

/**
 * Escape string to regular expression
 *
 * @param str String to be escaped
 * @returns Escaped string
 */
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Escape characters that the applet cannot support
 *
 * @param originStr Raw string
 * @param targetStr String to process
 * @returns Processed string
 */
function escapeCharacter(originStr: string, targetStr: string) {
  const str2RegExp = new RegExp(escapeRegExp(targetStr))
  let replaceStr = targetStr
  // dot
  if (targetStr.includes('.'))
    replaceStr = replaceStr.replace(/\./g, '-point-')
  // // div
  if (targetStr.includes('/'))
    replaceStr = replaceStr.replace(/\//g, '-div-')
  // colon
  if (targetStr.includes(':'))
    replaceStr = replaceStr.replace(/\:/g, '-c-')
  // percent
  if (targetStr.includes('%'))
    replaceStr = replaceStr.replace(/\%/g, '-pct')
  // !important
  if (targetStr.includes('!'))
    replaceStr = replaceStr.replace(/\!/g, 'i-')
  // hex
  if (targetStr.includes('#'))
    replaceStr = replaceStr.replace(/\#/g, '-h-')
  // paren
  if (targetStr.includes('('))
    replaceStr = replaceStr.replace(/\(/g, 'p-')
  if (targetStr.includes(')'))
    replaceStr = replaceStr.replace(/\)/g, '-q')
  // square
  if (targetStr.includes('['))
    replaceStr = replaceStr.replace(/\[/g, 'l-')
  if (targetStr.includes(']'))
    replaceStr = replaceStr.replace(/\]/g, '-r')
  // x,x to x-comma-x
  if (targetStr.includes(','))
    replaceStr = replaceStr.replace(/\,/g, '-comma-')
  return originStr.replace(str2RegExp, replaceStr)
}

// Regular expression of characters to be escaped
const charReg = /[.:%!#()[\/\],]/

/**
 * Handling `class`, `:class`, `hover-class` and `:hover-class`
 * @param code Raw string
 * @returns Processed string
 */
export function classProcess(code: string) {
  let strTemp = code
  const classMatches = code.match(/:?(hover-)?class=\".*?\"/g)
  if (classMatches?.length) {
    classMatches.forEach((classMatch) => {
      if (!charReg.test(classMatch))
        return
      if (classMatch.startsWith('class') || classMatch.startsWith('hover-class')) {
        strTemp = escapeCharacter(strTemp, classMatch)
      }
      else if (classMatch.startsWith(':class') || classMatch.startsWith(':hover-class')) {
        const reactiveClassMatches = classMatch.match(/'.*?'/g)
        if (reactiveClassMatches?.length) {
          reactiveClassMatches.forEach((reactiveClassMatch) => {
            if (charReg.test(reactiveClassMatch))
              strTemp = escapeCharacter(strTemp, reactiveClassMatch)
          })
        }
      }
    })
  }
  return strTemp
}

export function escape(code: string, id: string) {
  let s: MagicString | undefined
  const { descriptor } = parse(code)
  if (!descriptor.template?.content)
    return null
  const strTemp = classProcess(code)
  const str = () => s || (s = new MagicString(strTemp))
  return {
    map: str().generateMap({ file: id }),
    code: str().toString(),
  }
}

export function UnoCSSToUni(): PluginOption {
  return {
    name: 'vite:unocss-to-uni',
    enforce: 'pre',
    async transform(code: string, id: string) {
      if (!/\.vue$/.test(id))
        return null
      return escape.call(this, code, id)
    },
  }
}
