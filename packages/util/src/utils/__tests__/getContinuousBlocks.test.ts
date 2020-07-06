import { getContinuousBlocks, Block } from '@contentkit/util'
import { EditorState, SelectionState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js'
import { List, Repeat } from 'immutable'

const getEditorState = (blockArray, focusKey: string) => {
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

it('getContinuousBlocks 1', () => {
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
    new ContentBlock({
      key: 'D',
      type: Block.CODE,
      text: 'baz',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
    new ContentBlock({ key: 'E' })
  ]

  const editorState = getEditorState(blocksArray, 'C')
  const blocks = getContinuousBlocks(editorState, 'C').toArray()

  expect(blocks).toMatchSnapshot()
})

it('getContinuousBlocks 2', () => {
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
    new ContentBlock({
      key: 'D',
      type: Block.CODE,
      text: 'baz',
      characteList: List(Repeat(new CharacterMetadata(), 3))
    }),
    new ContentBlock({ key: 'E' })
  ]

  const editorState = getEditorState(blocksArray, 'B')
  const blocks = getContinuousBlocks(editorState, 'B').toArray()

  expect(blocks).toMatchSnapshot()
})
