import React from 'react'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

const useStyles = makeStyles((theme: any) => ({
  container: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: '100px 0px 0px 0px'
    },
    [`${theme.breakpoints.up('md')} and (-webkit-max-device-pixel-ratio: 2)`]: {
      width: 'calc(100% - 60px)',
      margin: '0px 0px 0px 60px',
      minHeight: '100vh'
    }
  }
}))

function LayoutContainer (props) {
  const classes = useStyles(props)
  const { children, className: classNameProp, ...rest } = props
  const className = clsx(classes.container, classNameProp)
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

LayoutContainer.defaultProps = {}

export default LayoutContainer

