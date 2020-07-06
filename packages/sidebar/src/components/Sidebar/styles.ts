import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme: any) => ({
  paperAnchorTop: {
    height: 100,
    borderBottom: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px'
  },
  paperAnchorLeft: {
    width: 60,
    borderRight: 'none',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0px 30px 0px',
    height: '100%',
    zIndex: theme.zIndex.modal
  },
  paper: {
    background: 'linear-gradient(180deg,#1a202c 0%,#2d3646 100%),#1a202c',
    display: 'flex',
    boxSizing: 'border-box',
    color: '#1a202c'
  },
  sidebarSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  brand: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))

export default useStyles
