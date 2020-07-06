import indentBackward from '../indentBackward'
import { EditorState, SelectionState, ContentState, ContentBlock, CharacterMetadata } from 'draft-js'
import { List, Repeat } from 'immutable'
import { pad } from 'left-indent'

const getEditorState = (blockArray, focusKey, focusOffset) => {
  const editorState = EditorState.createWithContent(
    ContentState.createFromBlockArray(blockArray)
  )
  return EditorState.acceptSelection(editorState,
    new SelectionState({
      anchorKey: focusKey,
      anchorOffset: focusOffset,
      focusKey: focusKey,
      focusOffset: focusOffset,
      isBackward: false
    })
  )
}

const samples = [
  `${pad(2)}bar `,
  `${pad(4)}foo `,

]

it('indentBackward should correctly handle', () => {
  const text = `${pad(2)}bar `
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      text,
      characterList: List(Repeat(new CharacterMetadata(), text.length))
    })
  ]

  const editorState = getEditorState(blocksArray, 'A', 2)
  const block = indentBackward(editorState).getCurrentContent().getBlockMap().get('A')
  expect(block).toMatchSnapshot()
})

it('indentBackward should remove 1 space', () => {
  const text = `${pad(3)}foo `
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      text: text,
      characterList: List(Repeat(new CharacterMetadata(), text.length))
    })
  ]

  const editorState = getEditorState(blocksArray, 'A', 3)
  const block = indentBackward(editorState).getCurrentContent().getBlockMap().get('A')
  expect(block.getText()).toMatchSnapshot()
  expect(block.getText()).toMatch(`${pad(2)}foo `)
})

it('indentBackward should remove 2 spaces', () => {
  const text = `${pad(4)}foo `
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      text: text,
      characterList: List(Repeat(new CharacterMetadata(), text.length))
    })
  ]

  const editorState = getEditorState(blocksArray, 'A', 4)
  const block = indentBackward(editorState).getCurrentContent().getBlockMap().get('A')
  expect(block.getText()).toMatchSnapshot()
  expect(block.getText()).toMatch(`${pad(2)}foo `)
})

it('indentBackward should remove 2 spaces', () => {
  const text = pad(2)
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      text: text,
      characterList: List(Repeat(new CharacterMetadata(), text.length))
    })
  ]

  const editorState = getEditorState(blocksArray, 'A', 2)
  const block = indentBackward(editorState).getCurrentContent().getBlockMap().get('A')
  expect(block.getText()).toMatchSnapshot()
  expect(block.getText()).toMatch('')
})



it('indentBackward should remove 2 spaces', () => {
  const text = pad(2)
  const blocksArray = [
    new ContentBlock({
      key: 'A',
      text: text,
      characterList: List(Repeat(new CharacterMetadata(), text.length))
    })
  ]

  const editorState = getEditorState(blocksArray, 'A', 2)
  const block = indentBackward(editorState).getCurrentContent().getBlockMap().get('A')
  expect(block.getText()).toMatchSnapshot()
  expect(block.getText()).toMatch('')
})


