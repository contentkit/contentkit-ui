import React from 'react'
import Input from '../Input'
import { IconButton, InputAdornment, InputBase } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { Modifier, EditorState, SelectionState } from 'draft-js'
import clearHighlight from '../../util/clearHighlight'
import applyHighlight from '../../util/applyHighlight'
import { createLinkAtSelection, getCurrentEntity, removeLinkAtSelection } from '@contentkit/util'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff'
  }
}))

function LinkForm (props) {
  const classes = useStyles(props)
  const [value, setValue] = React.useState('')
  const selection = React.useRef(null)
  const state = React.useRef(false) 

  const onChange = evt => setValue(evt.target.value)

  const { setEditorState, getEditorState, onClose } = props

  React.useEffect(() => {
    const editorState = getEditorState()
    selection.current = editorState.getSelection()
    const entity = getCurrentEntity(editorState)
    if (entity) {
      const { url } = entity.getData()
      setValue(url)
    }
    setEditorState(applyHighlight(editorState, selection.current))
    return () => {
      if (!state.current) {
        setEditorState(clearHighlight(getEditorState(), selection.current))
      }
    }
  }, [])

  const removeLink = () => {
    state.current = true
    const editorState = getEditorState()
    const editorStateWithoutHighlight = clearHighlight(editorState, selection.current)
    setEditorState(removeLinkAtSelection(editorStateWithoutHighlight))
  }

  const addLink = () => {
    state.current = true
    const editorState = getEditorState()
    const editorStateWithoutHighlight = clearHighlight(editorState, selection.current)
    setEditorState(createLinkAtSelection(editorStateWithoutHighlight, value))
  }

  const onKeyDown = (event) => {
    const isEnter = event.key === 'Enter'
    const isEsc = event.key === 'Escape'
    if (!isEnter && !isEsc) {
      return
    }

    event.preventDefault()
  
    if (!isEnter) {
      return onClose()
    }

    addLink()
    onClose()
  }

  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton onClick={removeLink} edge='end' size='small' className={classes.root}>
        <Close />
      </IconButton>
    </InputAdornment>
  )
  return (
    <InputBase
      onChange={onChange}
      value={value}
      onKeyDown={onKeyDown}
      endAdornment={endAdornment}
      classes={{
        root: classes.root
      }}
    />
  )
}

export default LinkForm
