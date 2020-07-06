import React from 'react'
import { Grow, Dialog } from '@material-ui/core'
import JsonEditor from '../JsonEditor'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    backgroundColor: '#e2e8f0'
  }
}))

function JsonEditorModal (props) {
  const { open, onClose, ...rest } = props
  const classes = useStyles(props)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      classes={{ paper: classes.paper }}
      TransitionComponent={Grow}
      PaperProps={{
        square: true
      }}
    >
      <JsonEditor {...rest} onClose={onClose} />
    </Dialog>
  )
}

JsonEditorModal.defaultProps = {
  open: false
}

export default JsonEditorModal
