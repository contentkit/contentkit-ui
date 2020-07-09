import React from 'react'
import EditorToolbar from '../EditorToolbar'
import { makeStyles } from '@material-ui/styles'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2D3748',
    position: 'fixed',
    // @ts-ignore
    zIndex: theme.zIndex.appBar,
    width: '100%',
    marginBottom: 2,
    [`${theme.breakpoints.up('md')} and (-webkit-max-device-pixel-ratio: 2)`]: {
      width: 'calc(100% - 60px)'
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  button: {
    color: '#cbd5e0',
    fontWeight: 600,
    textTransform: 'inherit',
    '&:hover': {
      color: '#fff'
    }
  },
  active: {
    backgroundColor: '#4a5568'
  }
}))

function Toolbar (props) {
  const { onClick, buttons, ...rest } = props
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      <div />
      <div className={classes.buttons}>
        {buttons.map(button => {
          const handleClick = evt => {
            onClick(button.key)
          }
          return (
            <Button key={button.key} className={classes.button} onClick={handleClick}>{button.label}</Button>
          )
        })}
      </div>
    </div>
  )
}

Toolbar.defaultProps = {
  buttons: [
    {
      key: 'history',
      label: 'History'
    },
    {
      key: 'postmeta',
      label: 'Postmeta'
    },
    {
      key: 'json-editor',
      label: 'Raw'
    }
  ]
}

export default Toolbar
