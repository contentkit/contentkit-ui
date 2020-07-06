import { EditorState, EntityInstance } from 'draft-js'
import getCurrentEntityKey from './getCurrentEntityKey'

function getCurrentEntity (editorState: EditorState): EntityInstance | null {
  const contentState = editorState.getCurrentContent()
  const entityKey = getCurrentEntityKey(editorState)
  return entityKey ? contentState.getEntity(entityKey) : null
}
export default getCurrentEntity