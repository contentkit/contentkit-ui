import { blockConverters } from '@contentkit/convert'
import { EditorState, SelectionState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js'
import { Block } from '@contentkit/util'
import { Map, List, Repeat } from 'immutable'

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

it('convertGist', () => {
  const blocksArray = [
    new ContentBlock({ key: 'A' }),
    new ContentBlock({
      key: 'B',
      type: Block.GIST,
      text: ' ',
      characterList: List(Repeat(new CharacterMetadata(), 1)),
      data: Map({
        tag: '<script src="https://gist.github.com/unshift/c7cc5cce1fc2cf034adab9586c7acae8.js"></script>'
      })
    }),
    new ContentBlock({ key: 'D' })
  ]

  const editorState = getEditorState(blocksArray, 'C')
  const contentState = editorState.getCurrentContent()
  const contentBlock = contentState.getBlockForKey('B')
  expect(
    blockConverters.gist(contentState, contentBlock)
  ).toMatchSnapshot()
})
