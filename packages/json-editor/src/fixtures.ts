export enum Character {
  OPEN_SQUARE_BRACKET = '[',
  CLOSE_SQUARE_BRACKET = ']',
  OPEN_CURLY_BRACKET = '{',
  CLOSE_CURLY_BRACKET = '}',
  DOUBLE_QUOTE = '"'
}

export const CHARACTER_PAIRS = {
  [Character.OPEN_SQUARE_BRACKET]: Character.CLOSE_SQUARE_BRACKET,
  [Character.OPEN_CURLY_BRACKET]: Character.CLOSE_CURLY_BRACKET,
  [Character.DOUBLE_QUOTE]: Character.DOUBLE_QUOTE
}

export const OPEN_SCOPE_DELIMETERS = Object.keys(CHARACTER_PAIRS)
