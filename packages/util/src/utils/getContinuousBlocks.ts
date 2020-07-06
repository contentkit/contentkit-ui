import { EditorState, ContentBlock } from 'draft-js'
import { Iterable } from 'immutable'

function getContinuousBlocks (editorState: EditorState, focusKey: string): Iterable<string, ContentBlock> {
  const contentState = editorState.getCurrentContent()
  const blockMap = contentState.getBlockMap()

  const currentBlock = blockMap.get(focusKey)
  const blockType = currentBlock.getType()

  const seq = blockMap.toSeq()

  return seq
    .takeUntil(v => v.getKey() === focusKey)
    .reverse()
    .takeUntil(v => v.getType() !== blockType)
    .reverse()
    .concat(
      seq
        .skipUntil(v => v.getKey() === focusKey)
        .takeUntil(v => v.getType() !== blockType)
    )
}

export default getContinuousBlocks
