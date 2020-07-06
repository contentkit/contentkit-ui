import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme: any) => ({
  root: {
    color: '#A0AEC0',
    borderRadius: '0px',
    padding: 6,
    width: 48,
    height: 48,
    // backgroundColor: ({ isActive }: any) => isActive ? '#4A5568' : '#2D3748'
  }
}))

function ToolbarButton (props) {
  const classes = useStyles(props)
  const { onClick, children } = props

  const onMouseDown = evt => {
    evt.preventDefault()
    evt.stopPropagation()
  }

  return (
    <IconButton
      className={classes.root}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </IconButton>
  )
}

export default ToolbarButton

