import { Modifier, EditorState, Entity, EditorChangeType } from 'draft-js'
import { ChangeType } from '../fixtures'

export function insertText (editorState: EditorState, text: string, entity?: string): EditorState {
  const selection = editorState.getSelection()
  const content = editorState.getCurrentContent()
  const newContent = Modifier[selection.isCollapsed() ? 'insertText' : 'replaceText'](
    content,
    selection,
    text,
    editorState.getCurrentInlineStyle(),
    entity
  )

  return EditorState.push(
    editorState,
    newContent,
    (ChangeType.INSERT_FRAGMENT as EditorChangeType)
  )
}

export default insertText
