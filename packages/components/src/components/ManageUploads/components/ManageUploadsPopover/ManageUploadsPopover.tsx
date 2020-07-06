import React from 'react'
import { Popover } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    maxWidth: 400,
    padding: 20
  }
}))

function ManageUploadsPopover (props) {
  const { open, onClose, anchorEl, children } = props
  const classes = useStyles(props)
  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left'
      }}
      classes={classes}
    >
      {children}
    </Popover>
  )
}

export default ManageUploadsPopover
