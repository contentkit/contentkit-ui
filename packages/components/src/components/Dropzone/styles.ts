import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  dropzone: {
    border: '1px dashed #ddd',
    width: 100,
    height: 100,
    zIndex: 9999,
    padding: 10,
    boxSizing: 'border-box',
  },
  input: {
    display: 'none'
  },
  drag: {
    borderColor: '#ccc',
    background: '#dbdbdb',
    backgroundImage: 'linear-gradient(-45deg, #d2d2d2 25%, transparent 25%, transparent 50%, #d2d2d2 50%, #d2d2d2 75%, transparent 75%, transparent)',
    backgroundSize: '40px 40px'
  }
}))

export default useStyles
