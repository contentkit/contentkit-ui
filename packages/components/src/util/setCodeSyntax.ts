import { EditorState, SelectionState, Modifier, EditorChangeType } from 'draft-js'
import { Map } from 'immutable'
import { getContinuousBlocks, ChangeType, createEntity, Entity, Syntax } from '@contentkit/util'

type Store = {
  getEditorState: () => EditorState,
  setEditorState: (editorState: EditorState) => void
}

function setCodeSyntax (value: string, selectionState, { getEditorState, setEditorState }: Store): void {
  const editorState = getEditorState()
  const nextEditorState = createEntity(editorState, selectionState, Entity.CODE, { [Syntax.KEY]: value })
  setEditorState(nextEditorState)
}

export default setCodeSyntax
