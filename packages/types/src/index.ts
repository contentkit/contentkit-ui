import {
  EditorState,
  ContentBlock,
  DraftEditorCommand,
  DraftDragType,
  SelectionState
} from 'draft-js'

declare namespace ContentKit {
  namespace Plugins {
    type SyntheticKeyboardEvent = React.KeyboardEvent<{}>
    type DraftHandleValue = 'handled' | 'not-handled' | boolean;
    type Store = {
      getEditorState: () => EditorState,
      setEditorState: (editorState: EditorState) => void,
      handleUpdate: (editorState: EditorState) => DraftHandleValue,
      forceUpdate: (editorState: EditorState) => void
    }
  
    interface Handlers {
      handleReturn?(e: SyntheticKeyboardEvent, editorState: EditorState, store: Store): DraftHandleValue
      handleKeyCommand?(command: DraftEditorCommand, editorState: EditorState, eventTimeStamp: number, store: Store): DraftHandleValue
      handleBeforeInput?(chars: string, editorState: EditorState, eventTimeStamp: number, store: Store): DraftHandleValue
      handlePastedText?(text: string, html: string|undefined, editorState: EditorState, store: Store): DraftHandleValue
      handlePastedFiles?(files: Array<Blob>, store: Store): DraftHandleValue
      handleDroppedFiles?(selection: SelectionState, files: Array<Blob>, Store: Store): DraftHandleValue,
      handleDrop?(selection: SelectionState, dataTransfer: Object, isInternal: DraftDragType, store: Store): DraftHandleValue
      blockStyleFn?(block: ContentBlock): string
      blockRendererFn?(block: ContentBlock): any
    }

    type Config = {
      classes?: any
      decorator?: any
    }
  
    interface Plugin extends Handlers {
      store?: Store
      setStore?: (store: Store) => void
      getHandlers?: () => Handlers
      getDecorators?: () => any[]
    }
  }
}

import Plugin = ContentKit.Plugins.Plugin
import PluginStore = ContentKit.Plugins.Store
import PluginConfig = ContentKit.Plugins.Config
import PluginHandlers = ContentKit.Plugins.Handlers

export { 
  Plugin,
  PluginStore,
  PluginConfig,
  PluginHandlers
}
