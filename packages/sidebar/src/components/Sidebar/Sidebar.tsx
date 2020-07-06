import React from 'react'
import { Drawer, useMediaQuery, useTheme } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

import SidebarAvatar from '../SidebarAvatar'
import { SidebarAvatarOption } from '../../types'
import useStyles from './styles'

const USER_QUERY = gql`
  query {
    users {
      id
    }
  }
`
export enum Anchor {
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom'
}

function Sidebar (props) {
  const { children } = props
  const classes = useStyles(props)
  const client = useApolloClient()
  const theme = useTheme()
  const matches = useMediaQuery(`${theme.breakpoints.up('md')} and (-webkit-max-device-pixel-ratio: 2)`)
  const anchor = matches ? Anchor.LEFT : Anchor.TOP
  const { history } = props

  const onLogout = () => {
    window.localStorage.removeItem('token')
    client.resetStore()
    history.replace('/login')
  }

  React.useEffect(() => {
    client.query({
      query: USER_QUERY
    }).catch(err => {
      console.log(err)
      onLogout()
    })
  }, [])

  const getOptions = (): SidebarAvatarOption[] => {
    return [{
      label: 'Account',
      onClick: () => history.replace('/profile')
    }, {
      label: 'Logout',
      onClick: onLogout
    }]
  }

  return (
    <Drawer
      anchor={anchor}
      variant='permanent'
      classes={{
        paper: classes.paper,
        paperAnchorLeft: classes.paperAnchorLeft,
        paperAnchorTop: classes.paperAnchorTop
      }}
      PaperProps={{ elevation: 2 }}
    >
      <div className={classes.sidebarSection}>
        {children}
      </div>
      <div className={classes.sidebarSection}>
        <SidebarAvatar options={getOptions()} />
      </div>
    </Drawer>
  )
}

Sidebar.defaultProps = {
  options: []
}

export default withRouter(Sidebar)
