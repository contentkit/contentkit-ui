import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Thumbnail from '../Thumbnail'
import Dropzone from '../Dropzone'
import { onUpload } from '../../types'
import MediaProvider from '../ManageUploads/MediaProvider'

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex'
  }
}))

type ThumbnailImage = {
  id: string,
  url: string
}

type ThumbnailUploadProps = {
  onClick: any,
  mediaProvider: MediaProvider,
  images: ThumbnailImage[],
  // onUpload: onUpload,
  selection: string[],
  children: any,
  getUploadMediaOptions: any
}

function ThumbnailUpload (props: ThumbnailUploadProps) {
  const {
    images,
    onClick,
    selection,
    mediaProvider,
    getUploadMediaOptions
  } = props
  const classes = useStyles(props)
  const actions = mediaProvider.getActions()

  const onUpload = async (file) => {
    return mediaProvider.uploadMedia(file, getUploadMediaOptions(file))
  }

  return (
    <div className={classes.flex}>
      {
        images.map(item => {
          return (
            <Thumbnail
              id={item.id}
              key={item.id}
              src={mediaProvider.getSrc(item.url)}
              onClick={onClick}
              selected={selection.includes(item.id)}
              actions={actions}
            />
          )
        })
      }
      <Dropzone
        onUpload={onUpload}
        children={null}
      />
    </div>
  )
}

ThumbnailUpload.propTypes = {
  fileList: PropTypes.array.isRequired,
  action: PropTypes.func.isRequired
}

export default ThumbnailUpload
