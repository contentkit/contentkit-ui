import { blockConverters } from '@contentkit/convert'
import { EditorState, SelectionState, ContentState, ContentBlock } from 'draft-js'
import { Block } from '@contentkit/util'
import { Map } from 'immutable'

const getEditorState = (blockArray, focusKey) => {
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(blockArray)
  )
  return EditorState.acceptSelection(editorState,
    new SelectionState({
      anchorKey: focusKey,
      anchorOffset: 0,
      focusKey: focusKey,
      focusOffset: 1,
      isBackward: false
    })
  )
}

it('convertTable', () => {
  const blocksArray = [
    new ContentBlock({ key: 'A' }),
    new ContentBlock({
      key: 'B',
      type: Block.TABLE,
      data: Map({
        table: [{
          key: '1',
          row: 'P',
          text: 'lorem'
        }, {
          key: '2',
          row: 'P',
          text: 'ipsum'
        }, {
          key: '3',
          row: 'Q',
          text: 'foo'
        }, {
          key: '4',
          row: 'Q',
          text: 'bar'
        }]
      })
    }),
    new ContentBlock({ key: 'C' })
  ]

  const editorState = getEditorState(blocksArray, 'C')
  const contentState = editorState.getCurrentContent()
  const contentBlock = contentState.getBlockForKey('B')
  expect(
    blockConverters.table(contentState, contentBlock)
  ).toMatchSnapshot()
})
