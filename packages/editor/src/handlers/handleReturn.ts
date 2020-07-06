import {
  RichUtils,
  EditorState,
  Modifier,
  EditorChangeType,
  DraftHandleValue
} from 'draft-js'
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent'
import {
  addNewBlockAt,
  getCurrentBlock,
  resetBlockWithType,
  discardInlineStyles,
  Block,
  ChangeType,
  HANDLED,
  NOT_HANDLED,
  insertNewLine,
} from '@contentkit/util'
import { focusableBlockIsSelected } from '@contentkit/util/src/utils'

export const continuousBlocks = [
  Block.UNSTYLED,
  Block.BLOCKQUOTE,
  Block.OL,
  Block.UL,
  Block.CODE,
  Block.TODO
]

export const resetBlocks = [
  Block.UL,
  Block.OL,
  Block.BLOCKQUOTE,
  Block.TODO,
  Block.H2,
  Block.H3,
  Block.H1,
  Block.CODE
]

function handleReturn (e, editorState: EditorState, { setEditorState, setEditorStateIfNeeded, blockKeyStore }): DraftHandleValue {
  let newEditorState = editorState
  const currentBlock = getCurrentBlock(editorState)
  newEditorState = discardInlineStyles(editorState)

  if (focusableBlockIsSelected(editorState, blockKeyStore)) {
    setEditorState(insertNewLine(editorState))
    return HANDLED
  }

  if (isSoftNewlineEvent(e)) {
    return setEditorStateIfNeeded(RichUtils.insertSoftNewline(newEditorState))
  }

  if (
    e.altKey ||
    e.metaKey ||
    e.ctrlKey
  ) {
    return setEditorStateIfNeeded(newEditorState)
  }

  const blockType = currentBlock.getType()

  if (blockType.startsWith(Block.ATOMIC)) {
    return setEditorStateIfNeeded(addNewBlockAt(newEditorState, currentBlock.getKey()))
  }

  if (
    currentBlock.getLength() === 0 &&
    resetBlocks.includes(blockType as Block)
  ) {
    return setEditorStateIfNeeded(resetBlockWithType(newEditorState, Block.UNSTYLED))
  }

  if (
    newEditorState.getSelection().isCollapsed() &&
    currentBlock.getLength() === newEditorState.getSelection().getStartOffset() &&
    continuousBlocks.indexOf(blockType as Block) < 0
  ) {
    return setEditorStateIfNeeded(addNewBlockAt(
      newEditorState,
      currentBlock.getKey()
    ))
  }

  return setEditorStateIfNeeded(EditorState.push(
    newEditorState,
    Modifier.splitBlock(
      newEditorState.getCurrentContent(),
      newEditorState.getSelection()
    ),
    (ChangeType.SPLIT_BLOCK as EditorChangeType)
  ))
}


export default handleReturn
