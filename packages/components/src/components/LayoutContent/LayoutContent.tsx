import React from 'react'
import clsx from 'clsx'
import { makeStyles, CreateCSSProperties } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
  content: ({ disablePadding }: any) => {
    const styles : CreateCSSProperties = {
      // backgroundColor: '#f7fafc',
      boxSizing: 'border-box',
      // minHeight: 'calc(100vh - 50px)',
      // height: '100%',
      position: 'absolute',
      top: 50, 
      left: 0,
      right: 0,
      bottom: 0
    }
    if (disablePadding) {
      return styles
    }
  
    return {
      [theme.breakpoints.down('md')]: {
        padding: 10
      },
      ['@media only screen and (-webkit-device-pixel-ratio: 3)']: {
        padding: 10
      },
      [`${theme.breakpoints.up('md')} and (-webkit-max-device-pixel-ratio: 2)`]: {
        padding: 40,
        ...styles
      }
    }
  }
}))

function LayoutContent (props) {
  const classes = useStyles(props)
  const { children, className: classNameProp, disablePadding, ...rest } = props
  const className = clsx(classes.content, classNameProp)
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
}

LayoutContent.defaultProps = {}

export default LayoutContent

