import React from 'react'
import clsx from 'clsx'
import useStyles from './styles'
import { IconButton } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'

type ToolbarButton = {
  icon: any,
  onClick: (evt: MouseEvent, ownProps: ThumbnailProps) => void
}

type Actions = { [key: string]: (...args: any) => Promise<any> }

type ThumbnailProps = {
  id: string,
  src: string,
  size: number,
  actions: Actions,
  buttons?: ToolbarButton[],
  selected?: boolean,
  onClick?: (id: string) => void
}


const toolbarButtons = [
  {
    icon: <CancelIcon />,
    onClick: (evt: MouseEvent, { id, actions }: ThumbnailProps) => {
      actions.onDelete({ id })
    }
  }
]

function Thumbnail (props: ThumbnailProps) {
  const {
    id,
    onClick,
    selected,
    actions,
    buttons
  } = props
  const [hover, setHover] = React.useState(false)

  const onMouseEnter = () => setHover(true)
  const onMouseLeave = () => setHover(false)

  const classes = useStyles(props)

  const createClickHandler = (button: ToolbarButton) => (evt: any) => {
    button.onClick(evt, props)
  }

  return (
    <figure
      className={clsx(classes.thumbnail, {
        [classes.selected]: selected,
        [classes.hover]: hover
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={evt => onClick(id)}
    >
      <img src={props.src} className={classes.image} />
      {
        hover && (
          <div className={classes.overlay}>
            <div className={classes.toolbar}>
              {buttons.map((button, i) => {
                return (
                  <IconButton key={i} onClick={createClickHandler(button)}>
                    {button.icon}
                  </IconButton>
                )
              })}
            </div>
          </div>
        )
      }
    </figure>
  )
}

Thumbnail.defaultProps = {
  size: 100,
  buttons: toolbarButtons
}

export default Thumbnail
