
import { OPEN_SCOPE_DELIMETERS, CHARACTER_PAIRS } from './fixtures'

export const pad = (offset) => new Array(offset).fill(' ').join('')

export const DEFAULT_INDENT = pad(2)


export function isCharacterPair (left: string, right: string) {
  return OPEN_SCOPE_DELIMETERS.includes(left) && right === CHARACTER_PAIRS[left]
}

