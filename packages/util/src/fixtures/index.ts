export enum Block {
  UNSTYLED = 'unstyled',
  PARAGRAPH = 'unstyled',
  OL = 'ordered-list-item',
  UL = 'unordered-list-item',
  H1 = 'header-one',
  H2 = 'header-two',
  H3 = 'header-three',
  H4 = 'header-four',
  H5 = 'header-five',
  H6 = 'header-six',
  CODE = 'code-block',
  BLOCKQUOTE = 'blockquote',
  PULLQUOTE = 'pullquote',
  ATOMIC = 'atomic',
  IMAGE = 'atomic:image',
  VIDEO = 'atomic:video',
  TABLE = 'atomic:table',
  GIST = 'atomic:gist',
  SCRIPT = 'atomic:script',
  TODO = 'todo'
}

export enum Inline {
  BOLD = 'BOLD',
  CODE = 'CODE',
  ITALIC = 'ITALIC',
  STRIKETHROUGH = 'STRIKETHROUGH',
  UNDERLINE = 'UNDERLINE',
  HIGHLIGHT ='HIGHLIGHT'
}

export enum Entity {
  IMAGE = 'IMG',
  LINK = 'LINK',
  CODE = 'CODE'
}

export enum Command {
  BACKSPACE = 'backspace',
  BACKSPACE_WORD = 'backspace-word',
  BACKSPACE_TO_START_OF_LINE = 'backspace-to-start-of-line',
  DELETE = 'delete',
  DELETE_WORD = 'delete-word',
  DELETE_TO_END_OF_BLOCK = 'delete-to-end-of-block',

  EDITOR_SAVE = 'editor-save',
  TAB = 'tab',
  BOLD = 'bold',
  ITALIC = 'italic',
  UNDERLINE = 'underline',
  ARROW_UP = 'arrow-up',
  ARROW_DOWN = 'arrow-down',
  ARROW_LEFT = 'arrow-left',
  ARROW_RIGHT = 'arrow-right'
}

export enum ChangeType {
  ADJUST_DEPTH = 'adjust-depth',
  APPLY_ENTITY = 'apply-entity',
  BACKSPACE_CHARACTER = 'backspace-character',
  CHANGE_BLOCK_DATA = 'change-block-data',
  CHANGE_BLOCK_TYPE = 'change-block-type',
  CHANGE_INLINE_STYLE = 'change-inline-style',
  MOVE_BLOCK = 'move-block',
  DELETE_CHARACTER = 'delete-character',
  INSERT_CHARACTERS = 'insert-characters',
  INSERT_FRAGMENT = 'insert-fragment',
  REDO = 'redo',
  REMOVE_RANGE = 'remove-range',
  SPELLCHECK_CHANGE = 'spellcheck-change',
  SPLIT_BLOCK = 'split-block',
  UNDO = 'undo',
  REMOVE_BLOCK = 'remove-block'
}

export enum Key {
  BACKSPACE = 8,
  TAB = 9,
  SAVE = 83,
  ESCAPE = 27,
  ENTER = 13,
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40
}

export enum Direction {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export const DELETE_COMMANDS = new Set([
  Command.BACKSPACE,
  Command.BACKSPACE_WORD,
  Command.BACKSPACE_TO_START_OF_LINE,
  Command.DELETE,
  Command.DELETE_WORD,
  Command.DELETE_TO_END_OF_BLOCK
])

export const BLOCK_TOKENS = [
  {
    type: Block.TODO,
    regexp: /^\[\]$/
  },
  {
    type: Block.H1,
    regexp: /^#{1}$/
  },
  {
    type: Block.H2,
    regexp: /^#{2}$/
  },
  {
    type: Block.H3,
    regexp: /^#{3}$/
  },
  {
    type: Block.H4,
    regexp: /^#{4}$/
  },
  {
    type: Block.BLOCKQUOTE,
    regexp: /^>$/
  },
  {
    type: Block.UL,
    regexp: /^-$/
  },
  {
    type: Block.OL,
    regexp: /^[*\d]\.?$/
  },
  {
    type: Block.CODE,
    regexp: /^`{3}[\w-]*/
  }
]

export const INLINE_TOKENS = [
  {
    style: Inline.BOLD,
    regexp: /__([\s\S]+?)__/m
  },
  {
    style: Inline.BOLD,
    regexp: /\*\*([\s\S]+?)\*\*(?!\*)/m
  },
  {
    style: Inline.ITALIC,
    regexp: /\*((?:\*\*|[\s\S])+?)\*(?!\*)/m
  },
  {
    style: Inline.CODE,
    regexp: /(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/m
  },
  {
    style: Inline.STRIKETHROUGH,
    regexp: /~~(?=\S)([\s\S]*?\S)~~/m
  }
]

export enum Syntax {
  DEPRECATED_KEY = 'language',
  KEY = 'syntax'
}

export const HANDLED = 'handled'
export const NOT_HANDLED = 'not-handled'
