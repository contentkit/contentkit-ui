import { EditorState, BlockMap, SelectionState, ContentBlock, ContentState, EditorChangeType } from 'draft-js'
import { ChangeType } from '../fixtures'

function insertBlocksIntoBlockMap (
  editorState: EditorState,
  blockMap: BlockMap,
  blocks: ContentBlock[],
  selectionState?: SelectionState
) {
  const selectionBefore = editorState.getSelection()
  const currentContent = editorState.getCurrentContent()
  const pivotBlockKey = selectionBefore.getFocusKey()

  const blocksBefore = blockMap.toSeq().takeUntil((v) => v.getKey() === pivotBlockKey)
  const blocksAfter = blockMap.toSeq().skipUntil((v) => v.getKey() === pivotBlockKey).skip(1)

  const newBlockMap = blocksBefore
    .concat(
      [[pivotBlockKey, blockMap.get(pivotBlockKey)]],
      blocks.map(block => ([block.getKey(), block])),
      blocksAfter
    )
    .toOrderedMap()

  const lastBlock = blocks[blocks.length - 1]
  const lastBlockKey = lastBlock.getKey()
  const offset = lastBlock.getLength()
  const selectionAfter = selectionState
      ? selectionState
      : new SelectionState({
          anchorKey: lastBlockKey,
          anchorOffset: offset,
          focusKey: lastBlockKey,
          focusOffset: offset,
          isBackward: false,
          hasFocus: true
        })

  const newContentState = currentContent.merge({
    blockMap: newBlockMap,
    selectionBefore: selectionBefore,
    selectionAfter: selectionAfter
  })

  return EditorState.push(editorState, (newContentState as ContentState), (ChangeType.SPLIT_BLOCK as EditorChangeType))
}

export default insertBlocksIntoBlockMap
