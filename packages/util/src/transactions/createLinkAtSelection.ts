import { EditorState, RichUtils } from 'draft-js'


function createLinkAtSelection (editorState: EditorState, url: string): EditorState {
  const contentState = editorState.getCurrentContent()
    .createEntity('LINK', 'MUTABLE', { url })
  const entityKey = contentState.getLastCreatedEntityKey()
  const withLink = RichUtils.toggleLink(
    editorState,
    editorState.getSelection(),
    entityKey
  )
  return EditorState.forceSelection(
    withLink, editorState.getSelection()
  )
}

export default createLinkAtSelection
