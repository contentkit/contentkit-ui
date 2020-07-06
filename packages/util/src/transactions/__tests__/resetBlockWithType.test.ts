import resetBlockWithType from '../resetBlockWithType'
import { EditorState, SelectionState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js'
import { List, Repeat } from 'immutable'
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

it('resetBlockWithType should reset the current block to the specified type and set the text to ""', () => {
  const blocksArray = [
    new ContentBlock({ key: 'A', type: Block.BLOCKQUOTE }),
    new ContentBlock({
      key: 'B',
      type: Block.UL,
      text: 'foo',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
    new ContentBlock({
      key: 'C',
      type: Block.UL,
      text: 'bar',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    })
  ]

  const editor = getEditorState(blocksArray, 'C')

  expect(
    resetBlockWithType(editor, Block.UNSTYLED).getCurrentContent().getBlockMap()
  ).toMatchSnapshot()
})
