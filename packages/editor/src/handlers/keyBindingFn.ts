import {
  getDefaultKeyBinding,
  KeyBindingUtil,
  EditorState
} from 'draft-js'
import { Command, Key, Direction, focusableBlockIsSelected, setSelection } from '@contentkit/util'

const { hasCommandModifier } = KeyBindingUtil

type KeyBindingFnOptions = {
  getEditorState: () => EditorState,
  setEditorState: (editorState: EditorState) => void,
  blockKeyStore: Set<string>
}

function keyBindingFn (evt: any, { getEditorState, setEditorState, blockKeyStore }: KeyBindingFnOptions) {
  const editorState = getEditorState()
  // TODO match by entitiy instead of block type
  if (focusableBlockIsSelected(editorState, blockKeyStore)) {
    // arrow left
    if (evt.keyCode === 37) {
      setSelection(getEditorState, setEditorState, Direction.UP, evt)
    }
    // arrow right
    if (evt.keyCode === 39) {
      setSelection(getEditorState, setEditorState, Direction.DOWN, evt)
    }
    // arrow up
    if (evt.keyCode === 38) {
      setSelection(getEditorState, setEditorState, Direction.UP, event)
    }
    // arrow down
    if (evt.keyCode === 40) {
      setSelection(getEditorState, setEditorState, Direction.DOWN, event)
      return
    }
  }

  // Don't manually overwrite in case the shift key is used to avoid breaking
  // native behaviour that works anyway.
  if (evt.shiftKey) {
    return
  }

  // arrow left
  if (evt.keyCode === 37) {
    // Covering the case to select the before block
    const selection = editorState.getSelection()
    const selectionKey = selection.getAnchorKey()
    const beforeBlock = editorState
      .getCurrentContent()
      .getBlockBefore(selectionKey)
    // only if the selection caret is a the left most position
    if (
      beforeBlock &&
      selection.getAnchorOffset() === 0 &&
      blockKeyStore.has(beforeBlock.getKey())
    ) {
      setSelection(getEditorState, setEditorState, Direction.UP, evt)
    }
  }

  // arrow right
  if (evt.keyCode === 39) {
    // Covering the case to select the after block
    const selection = editorState.getSelection()
    const selectionKey = selection.getFocusKey()
    const currentBlock = editorState.getCurrentContent().getBlockForKey(selectionKey)
    const afterBlock = editorState.getCurrentContent().getBlockAfter(selectionKey)
    const notAtomicAndLastPost = !currentBlock.getType().startsWith('atomic') &&
      currentBlock.getLength() === selection.getFocusOffset()
    if (
      afterBlock &&
      notAtomicAndLastPost &&
      blockKeyStore.has(afterBlock.getKey())
    ) {
      setSelection(getEditorState, setEditorState, Direction.DOWN, evt)
    }
  }

  // arrow up
  if (evt.keyCode === 38) {
    // Covering the case to select the before block with arrow up
    const selectionKey = editorState.getSelection().getAnchorKey()
    const beforeBlock = editorState.getCurrentContent().getBlockBefore(selectionKey)
    if (beforeBlock && blockKeyStore.has(beforeBlock.getKey())) {
      setSelection(getEditorState, setEditorState, Direction.UP, event)
    }
  }

  // arrow down
  if (evt.keyCode === 40) {
    // Covering the case to select the after block with arrow down
    const selectionKey = editorState.getSelection().getAnchorKey();
    const afterBlock = editorState.getCurrentContent().getBlockAfter(selectionKey)
    if (afterBlock && blockKeyStore.has(afterBlock.getKey())) {
      setSelection(getEditorState, setEditorState, Direction.DOWN, event)
    }
  }

  if (evt.which === Key.SAVE && hasCommandModifier(evt)) {
    return Command.EDITOR_SAVE
  }

  if (evt.which === Key.BACKSPACE) {
    return Command.BACKSPACE
  }

  if (evt.which === Key.TAB) {
    return Command.TAB
  }

  return getDefaultKeyBinding(evt)
}

export default keyBindingFn
