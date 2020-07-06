import { List } from 'immutable'
import {
  ContentBlock,
  SelectionState,
  ContentState,
  EditorState,
  BlockMapBuilder,
  genKey as generateRandomKey,
} from 'draft-js'

const insertBlockAfterSelection = (contentState: ContentState, selectionState: SelectionState, newBlock: ContentBlock) => {
  const targetKey = selectionState.getStartKey()
  const array = []
  contentState.getBlockMap().forEach((block, blockKey) => {
    array.push(block)
    if (blockKey !== targetKey) return
    array.push(newBlock)
  })
  return contentState.merge({
    blockMap: BlockMapBuilder.createFromArray(array),
    selectionBefore: selectionState,
    selectionAfter: selectionState.merge({
      anchorKey: newBlock.getKey(),
      anchorOffset: newBlock.getLength(),
      focusKey: newBlock.getKey(),
      focusOffset: newBlock.getLength(),
      isBackward: false,
    })
  })
}

export default function insertNewLine (editorState: EditorState) {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const newLineBlock = new ContentBlock({
    key: generateRandomKey(),
    type: 'unstyled',
    text: '',
    characterList: List()
  })
  const withNewLine = insertBlockAfterSelection(contentState, selectionState, newLineBlock)
  const newContent = withNewLine.merge({
    selectionAfter: (withNewLine as ContentState).getSelectionAfter().set('hasFocus', true)
  })
  return EditorState.push(editorState, (newContent as ContentState), 'insert-fragment')
}