import { EditorState, RichUtils } from 'draft-js'
import {
  getCurrentBlock,
  adjustBlockDepth,
  insertText,
  setNewBlock,
  resetBlockWithType,
  Block,
  Command,
  focusableBlockIsSelected,
  removeBlock,
  DELETE_COMMANDS,
  HANDLED,
  NOT_HANDLED
} from '@contentkit/util'

function toggleStyle (command, { setEditorState, getEditorState }) {
  setEditorState(
    RichUtils.toggleInlineStyle(
      getEditorState(),
      command.toUpperCase()
    )
  )

  return HANDLED
}

function handleBackspace ({ getEditorState, setEditorState }) {
  const editorState = getEditorState()
  const block = getCurrentBlock(editorState)
  const contentState = editorState.getCurrentContent()
  const firstBlock = contentState.getFirstBlock()
  if (
    block.getKey() === firstBlock.getKey() &&
    !block.getLength()
  ) {
    setEditorState(resetBlockWithType(editorState, Block.UNSTYLED))
    return HANDLED
  }
  return NOT_HANDLED
}

function onTab ({ getEditorState, setEditorState }) {
  const editorState = getEditorState()
  const block = getCurrentBlock(editorState)
  const blockType = block.getType()
  if (blockType.startsWith(Block.ATOMIC)) return

  if ([Block.UL, Block.OL].includes(blockType as Block)) {
    return setEditorState(adjustBlockDepth(editorState, 1, 4))
  }

  if (Block.CODE === blockType) {
    return setEditorState(insertText(editorState, '  '))
  }

  return setEditorState(setNewBlock(editorState, Block.CODE))
}

function handleKeyCommand (command: string, editorState: EditorState, eventTimeStamp: number, { setEditorState, getEditorState, blockKeyStore }) {
  if (DELETE_COMMANDS.has(command as Command) && focusableBlockIsSelected(editorState, blockKeyStore)) {
    const key = editorState.getSelection().getStartKey()
    const newEditorState = removeBlock(editorState, key)
    if (newEditorState !== editorState) {
      setEditorState(newEditorState)
      return HANDLED
    }
  }

  switch (command) {
    case Command.TAB:
      return onTab({ getEditorState, setEditorState })
    case Command.BACKSPACE:
      return handleBackspace({ getEditorState, setEditorState })
    case Command.BOLD:
    case Command.ITALIC:
    case Command.UNDERLINE:
      return toggleStyle(command, { setEditorState, getEditorState })
    default:
      return NOT_HANDLED
  }
}

export default handleKeyCommand
