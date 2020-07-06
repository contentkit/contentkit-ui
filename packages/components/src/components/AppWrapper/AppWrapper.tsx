import React from 'react'
import PropTypes from 'prop-types-exact'

import { Sidebar } from '@contentkit/sidebar'
import LayoutContainer from '../LayoutContainer'
import LayoutContent from '../LayoutContent'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({}))

function Empty () {
  return null
}

type SidebarProps = {}

type AppWrapperProps = {
  sidebarProps?: SidebarProps,
  renderToolbar: any,
  classes: any,
  children?: any,
  disablePadding?: boolean
}

function AppWrapper (props: AppWrapperProps) {
  const {
    children,
    renderToolbar,
    sidebarProps,
    classes,
    disablePadding
  } = props
  return (
    <React.Fragment>
      <Sidebar {...sidebarProps} />
      <LayoutContainer className={classes.container}>
        {renderToolbar(props)}
        <LayoutContent className={classes.content} disablePadding={disablePadding}>
          {children}
        </LayoutContent>
      </LayoutContainer>
    </React.Fragment>
  )
}

AppWrapper.propTypes = {}

AppWrapper.defaultProps = {
  renderToolbar: Empty,
  disablePadding: false,
  classes: {},
  sidebarProps: {}
}

export default AppWrapper
