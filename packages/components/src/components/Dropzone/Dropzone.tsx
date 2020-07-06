import React from 'react'
import useStyles from './styles'
import clsx from 'clsx'
import {
  ActionResponse,
  CustomRequestParams,
  Fields,
  DropzoneProps,
  DropzoneVariant
} from '../../types'

function Dropzone (props: DropzoneProps) {
  const [drag, setDrag] = React.useState(false)
  const inputEl = React.useRef(null)
  const {
    className: classNameProp,
    variant
  } = props

  const onDragOver = evt => {
    setDrag(true)
    evt.stopPropagation()
    evt.preventDefault()
  }

  function onDragLeave (evt) {
    setDrag(false)
  }

  const onDrop = (evt: React.DragEvent) => {
    evt.preventDefault()
    evt.stopPropagation()
    const files = Array.from(evt.dataTransfer.files)
    onUpload(files)
    setDrag(false)
  }

  const onChange = (evt) => {
    evt.preventDefault()
    evt.stopPropagation()
  
    const files : File[] = Array.from(inputEl.current.files)
    onUpload(files)
  }

  const onUpload = async (files: File[]) => {
    const actions = await Promise.all(
      files
        .map((file: File) => props.onUpload(file))
    )
  }

  const classes = useStyles(props)

  const className = clsx(
    classNameProp,
    {
      [classes.dropzone]: variant === DropzoneVariant.THUMBNAIL,
      [classes.drag]: drag
    }
  )
  return (
    <div
      onDrop={onDrop}
      className={className}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input type={'file'} ref={inputEl} onChange={onChange} className={classes.input} />
      {props.children}
    </div>
  )
}

Dropzone.defaultProps = {
  variant: DropzoneVariant.THUMBNAIL
}


export default Dropzone
