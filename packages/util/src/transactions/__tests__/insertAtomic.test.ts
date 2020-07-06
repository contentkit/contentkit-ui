import insertAtomic from '../insertAtomic'
import { EditorState, SelectionState, ContentState, ContentBlock } from 'draft-js'
import { Block } from '../../fixtures'

const getEditorState = (blockArray, focusKey) => {
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(blockArray)
  )
  return EditorState.acceptSelection(editorState,
    new SelectionState({
      anchorKey: focusKey,
      anchorOffset: 1,
      focusKey: focusKey,
      focusOffset: 1,
      isBackward: false
    })
  )
}

it('insertAtomic should insert an atomic block and an unstyled block after', () => {
  const blocksArray = [
    new ContentBlock({ key: 'A' })
  ]

  const editorState = getEditorState(blocksArray, 'A')

  const blockMap = insertAtomic(editorState, Block.IMAGE, { key: 'value' }).getCurrentContent().getBlockMap()
  expect(
    blockMap.toSeq().skip(1).first().getType()
  ).toMatch(Block.IMAGE)
  expect(
    blockMap.toSeq().skip(2).first().getType()
  ).toMatch(Block.UNSTYLED)
})
