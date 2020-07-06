import React from 'react'
import { InputBase } from '@material-ui/core'
import { getCurrentEntity, Syntax, getSyntax } from '@contentkit/util'
import { Modifier, EditorState, SelectionState } from 'draft-js'
import setCodeSyntax from '../../util/setCodeSyntax'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff'
  }
}))

function CodeSyntaxForm (props) {
  const classes = useStyles(props)
  const [value, setValue] = React.useState('')
  const selection = React.useRef(null)
  const inputRef = React.useRef()

  const onChange = evt => setValue(evt.target.value)

  const { setEditorState, getEditorState, onClose } = props

  React.useEffect(() => {
    const editorState = getEditorState()
    const contentState = editorState.getCurrentContent()
    const selectionState = editorState.getSelection()
    selection.current = selectionState
    const currentBlock = contentState.getBlockForKey(selectionState.getFocusKey())
    const syntax = getSyntax(currentBlock, contentState)
    if (syntax) {
      setValue(syntax)
    }
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      // @ts-ignore
      inputRef.current.focus()
    }, 100)
  }, [])

  const onKeyDown = (event) => {
    const isEnter = event.key === 'Enter'
    const isEsc = event.key === 'Escape'
    if (!isEnter && !isEsc) {
      return
    }

    event.preventDefault()
    onClose()
  
    if (!isEnter) {
      return
    }

    return setCodeSyntax(value, selection.current, { setEditorState, getEditorState })
  }

  return (
    <InputBase
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      ref={inputRef}
      classes={{
        root: classes.root
      }}
    />
  )
}

export default CodeSyntaxForm

