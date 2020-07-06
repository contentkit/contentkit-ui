import React from 'react'
import { Menu, MenuItem, Avatar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { SidebarAvatarOption } from '../../types'

const useStyles = makeStyles((theme: any) => ({
  [theme.breakpoints.down('md')]: {
    margin: '12px 0 0 0'
  },
  avatar: {
    backgroundColor: '#63B3ED'
  },
  menu: {
    boxShadow: '0 1px 1px 0 rgba(216,224,234,0.5)',
  },
  menuItem: {
    color: '#718096',
    '&:hover': {
      backgroundColor: '#f7fafc'
    } 
  },
  paper: {
    backgroundColor: '#f7fafc'
  }
}))

type SidebarAvatarProps = {
  options: SidebarAvatarOption[]
  id?: string
}

function SidebarAvatar (props: SidebarAvatarProps) {
  const { options, id } = props

  const classes = useStyles(props)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const openMenu = (evt) => setAnchorEl(evt.currentTarget)

  const closeMenu = () => setAnchorEl(null)

  return (
    <React.Fragment>
      <Avatar
        onClick={openMenu}
        className={classes.avatar}
      />
      <Menu
        anchorEl={anchorEl}
        onClose={closeMenu}
        open={Boolean(anchorEl)}
        keepMounted
        className={classes.menu}
        PaperProps={{ className: classes.paper }}
      >
        {options.map((option: SidebarAvatarOption) => (
          <MenuItem
            key={option.label}
            onClick={option.onClick}
            className={classes.menuItem}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  )
}

SidebarAvatar.defaultProps = {
  options: [],
  id: Math.random().toString(36).substring(7)
}

export default SidebarAvatar
