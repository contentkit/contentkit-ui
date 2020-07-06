import { EditorState, ContentBlock } from 'draft-js'

function getStartBlock (editorState: EditorState, focusKey?: string): ContentBlock {
  const selection = editorState.getSelection()
  focusKey = focusKey || selection.getFocusKey()
  const contentState = editorState.getCurrentContent()
  const blockMap = contentState.getBlockMap()
  const currentBlock = blockMap.get(focusKey)
  const blockType = currentBlock.getType()
  const blockBefore = contentState.getBlockBefore(focusKey)

  if (!blockBefore || blockBefore.getType() !== blockType) {
    return currentBlock
  }

  return blockMap.toSeq()
    .takeUntil(v => v.getKey() === focusKey)
    .reverse()
    .takeUntil(v => v.getType() !== blockType)
    .last()
}

export default getStartBlock
