import React from 'react'
import { Toolbar, Popover, useTheme, useMediaQuery } from '@material-ui/core'
import {
  Image as FormatImage,
  Code as InsertCode,
  Edit as CodeSyntaxIcon
} from '@material-ui/icons'
import { RichUtils, EditorState, Modifier } from 'draft-js'
import { Block, insertAtomic } from '@contentkit/util'
import { makeStyles } from '@material-ui/styles'
import { ButtonVariant, ButtonType, buttons } from './buttons'
import ToolbarButton from './ToolbarButton'

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    width: 'calc(100% - 80px)',
    boxShadow: '0px 4px 8px rgba(60,45,111,0.1), 0px 1px 3px rgba(60,45,111,0.15)',
    margin: '0 40px'
  },
  iconButton: {
    borderRadius: '0px',
    padding: 6
  },
  input: {
    borderBottom: 'none'
  },
  popoverPaper: {
    padding: 20
  },
  paper: {
    // backgroundColor: '#2D3748'
    backgroundColor: 'rgb(239, 243, 245)'
  },
  toolbar: {}
}))

function toggleInlineStyle (style, { getEditorState, setEditorState }) {
  setEditorState(
    RichUtils.toggleInlineStyle(getEditorState(), style)
  )
}

function toggleBlockStyle (blockType, { getEditorState, setEditorState }) {
  setEditorState(
    RichUtils.toggleBlockType(getEditorState(), blockType)
  )
}

function insertImage (src: string, { setEditorState, getEditorState }) {
  setEditorState(insertAtomic(getEditorState(), Block.IMAGE, { src }))
}

function insertVideo (src: string, { setEditorState, getEditorState }) {
  setEditorState(insertAtomic(getEditorState(), Block.VIDEO, { src }))
}

function EditorToolbar (props: any) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [value, setValue] = React.useState('')
  const [activeButton, setActiveButton] = React.useState(null)
  const { toolbarButtons, getEditorState, setEditorState } = props

  const theme = useTheme()
  const matches = useMediaQuery(`${theme.breakpoints.up('md')} and (-webkit-max-device-pixel-ratio: 2) `) 
  const classes = useStyles(props)
  const editorState = getEditorState()
  const selection = editorState.getSelection()

  const inlineStyles = React.useMemo(() => {
    const styles = toolbarButtons
      .filter(({ type, inlineStyle }) => type === ButtonType.INLINE && inlineStyle)
      .map(({ inlineStyle }) => inlineStyle)

    return new Set(styles)
  }, [toolbarButtons])

  const activeButtons = React.useMemo(() => {
    const currentContent = editorState.getCurrentContent()
    const currentBlock = currentContent.getBlockForKey(selection.getFocusKey())

    const activeInlineStyles = Array.from(inlineStyles)
      .filter(style => editorState.getCurrentInlineStyle().has(style))

    return {
      activeInlineStyles: new Set(activeInlineStyles),
      blockType: currentBlock.getType()
    } 
  }, [selection])

  const onChange = evt => setValue(evt.target.value)

  const onClose = () => {
    if (activeButton) {
      setActiveButton(null)
    }
  
    if (anchorEl) {
      setAnchorEl(null)
    }
  }

  const onClick = (button) => evt => {
    evt.preventDefault()
    const { variant } = button
  
    if (variant === ButtonVariant.TOGGLE_INLINE_STYLE) {
      return toggleInlineStyle(button.inlineStyle, { getEditorState, setEditorState })
    }

    if (variant === ButtonVariant.TOGGLE_BLOCK_TYPE) {
      return toggleBlockStyle(button.blockType, { getEditorState, setEditorState })
    }

    setActiveButton(button)
    setAnchorEl(evt.currentTarget)
  }

  const isActive = button => {
    if (button.type === ButtonType.INLINE) {
      return activeButtons.activeInlineStyles.has(button.inlineStyle)
    }

    return activeButtons.blockType === button.blockType
  }

  function renderButtons (buttons: any[]) {
    return buttons.map((button, index) => {
      const { Icon } = button
      return (
        <ToolbarButton
          key={index}
          onClick={onClick(button)}
          isActive={isActive(button)}
        >
          <Icon fontSize={matches ? 'small' : 'large'} />
        </ToolbarButton>
      )
    }) 
  }

  function renderPopoverContent () {
    if (!activeButton) {
      return null
    }

    if (activeButton.submenu) {
      return (
        <Toolbar variant='dense' className={classes.toolbar}>{renderButtons(activeButton.submenu)}</Toolbar>
      )
    }

    const { component: Component } = activeButton 

    if (Component) {
      return (<Component {...props} onClose={onClose} />)
    }

    return null
  }

  const isOpen = Boolean(anchorEl && activeButton && activeButton.popover)
  const toolbarVariant = matches ? 'dense' : 'regular'
  return (
    <div className={classes.root}>
      {renderButtons(toolbarButtons)}
      <Popover
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        classes={{}}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableEnforceFocus
        disableRestoreFocus
        PaperProps={{
          classes: {
            root: classes.paper
          }
        }}
      >
        {renderPopoverContent()}       
      </Popover>
    </div>
  )
}

EditorToolbar.defaultProps = { toolbarButtons: buttons }

// @ts-ignore
export default EditorToolbar
