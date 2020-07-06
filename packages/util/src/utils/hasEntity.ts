import { EditorState } from 'draft-js'
import getCurrentEntity from './getCurrentEntity'

function hasEntity (editorState: EditorState, entityType: string): boolean {
  const entity = getCurrentEntity(editorState)
  return entity && entity.getType() === entityType
}

export default hasEntity
