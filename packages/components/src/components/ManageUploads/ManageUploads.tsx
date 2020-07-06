import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Thumbnail from '../Thumbnail'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Cancel'
import { insertAtomic, Block } from '@contentkit/util'

type ThumbnailProps = {
  selected: boolean,
  // onSelect: (fileId: string) => void,
  // deleteImage: (params: { id: string }) => void,
  src: string
}

function ThumbnailGridItem (props) {
  const { id, src, actions, buttons } = props
  return (
    <Thumbnail
      selected={false}
      src={src}
      id={id}
      size={120}
      actions={actions}
      buttons={buttons}
    />
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  }
}))

function ManageUploads (props) {
  const {
    uploads = [],
    mediaProvider,
    documentId,
    getEditorState,
    setEditorState
  } = props

  const classes = useStyles(props)

  const toolbarButtons = [
    {
      icon: <CancelIcon />,
      onClick: (evt: MouseEvent, { id, actions }) => {
        actions.onDelete({ id })
      }
    },
    {
      icon: <AddIcon />,
      onClick: (evt: MouseEvent, { id, actions }) => {
        const url = uploads.find(upload => upload.id === id).url
        const src = `${mediaProvider.config.baseUrl}${url}`
        setEditorState(insertAtomic(getEditorState(), Block.IMAGE, { src }))
      }
    }
  ]

  const getThumbnailProps = (upload) => {
    const actions = mediaProvider.getActions()
    return {
      id: upload.id,
      src: mediaProvider.getSrc(upload.url),
      actions: {
        onDelete: (variables) => {
          actions.onDelete({ postId: documentId, ...variables })
        }
      },
      buttons: toolbarButtons
    }
  }

  return (
    <div className={classes.root}>
      {uploads.map(upload => (
        <ThumbnailGridItem {...getThumbnailProps(upload)} key={upload.id} />
      ))}
    </div>
  )
}

export default ManageUploads
