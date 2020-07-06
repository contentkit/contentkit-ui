import { getStartBlock } from '@contentkit/util'
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
      anchorOffset: 0,
      focusKey: focusKey,
      focusOffset: 0,
      isBackward: false
    })
  )
}

it('getStartBlock', () => {
  const blocksArray = [
    new ContentBlock({ key: 'A' }),
    new ContentBlock({
      key: 'B',
      type: Block.CODE,
      text: 'foo',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
    new ContentBlock({
      key: 'C',
      type: Block.CODE,
      text: 'bar',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
    new ContentBlock({ key: 'D' })
  ]

  const editorState = getEditorState(blocksArray, 'C')
  const startBlock = getStartBlock(editorState)

  expect(startBlock).toMatchSnapshot()
  expect(startBlock.getKey()).toMatch('B')
})


it('getStartBlock', () => {
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      type: Block.CODE,
      text: 'bar',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
  ]

  const editorState = getEditorState(blocksArray, 'A')
  const startBlock = getStartBlock(editorState)

  expect(startBlock).toMatchSnapshot()
  expect(startBlock.getKey()).toMatch('A')
})
