import React from 'react'
import { List, Divider, ListItem, Drawer, useMediaQuery, useTheme } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import gql from 'graphql-tag'

import SidebarAvatar from '../SidebarAvatar'
import { SidebarAvatarOption } from '../../types'
import useStyles from './styles'

const renderIcon = () => (
  <svg width='18' aria-hidden='true' focusable='false' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512' class='svg-inline--fa fa-paragraph fa-w-14 fa-2x'><path fill='#A0AEC0' d='M440 32H224A160 160 0 0 0 64.35 202.65c5.5 85 79.91 149.35 165.13 149.35H256v120a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h64v408a8 8 0 0 0 8 8h16a8 8 0 0 0 8-8V64h56a8 8 0 0 0 8-8V40a8 8 0 0 0-8-8zM256 320h-32a128 128 0 0 1 0-256h32z'></path></svg>
)

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
        <List disablePadding>
          <ListItem disableGutters className={classes.listItem}>
            {renderIcon()}
          </ListItem>
        </List>
        <Divider className={classes.divider} />
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
