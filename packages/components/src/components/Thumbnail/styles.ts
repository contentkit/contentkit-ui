import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  thumbnail: {
    width: ({ size }: { size: number }) => size,
    height: ({ size }: { size: number }) => size,
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: 3,
    cursor: 'pointer',
    margin: 0
  },
  hover: {},
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: 0
  },
  selected: {
    border: '3px solid #d9f7be'
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    backgroundColor: 'rgba(245, 245, 245, 0.5)',
  },
  button: {
    borderRadius: '0px',
    padding: 6
  }
}))

export default useStyles