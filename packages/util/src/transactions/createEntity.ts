import { EditorState, Modifier } from 'draft-js'

function createEntity (editorState, selectionState, entityType, entityData) {
  const contentState = editorState.getCurrentContent()
  const contentStateWithEntity = contentState.createEntity(entityType, 'MUTABLE', entityData)
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
  const contentStateWithLink = Modifier.applyEntity(
    contentStateWithEntity,
    selectionState,
    entityKey
  )

  // @ts-ignore
  const newEditorState = EditorState.push(editorState, contentStateWithLink, 'apply-entity')

  return newEditorState
}

export default createEntity
