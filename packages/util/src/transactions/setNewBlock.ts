import { EditorState, ContentState, ContentBlock } from 'draft-js'
import getCurrentBlock from '../utils/getCurrentBlock'
import { Block } from '../fixtures'

const setNewBlock = (editorState: EditorState, newType : string = Block.UNSTYLED, initialData : any = {}) => {
  const selectionState = editorState.getSelection()
  if (!selectionState.isCollapsed()) {
    return editorState
  }
  const contentState = editorState.getCurrentContent()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  const currentBlock = getCurrentBlock(editorState)
  if (!currentBlock) {
    return editorState
  }
  if (currentBlock.getLength() === 0) {
    if (currentBlock.getType() === newType) {
      return editorState
    }
    const newBlock = currentBlock.merge({
      type: newType,
      data: initialData
    })
    const newContentState = contentState.merge({
      blockMap: blockMap.set(key, (newBlock as ContentBlock)),
      selectionAfter: selectionState
    })
    return EditorState.push(editorState, (newContentState as ContentState), 'change-block-type')
  }
  return editorState
}

export default setNewBlock
