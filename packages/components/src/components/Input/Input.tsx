import React from 'react'
import { InputBase } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/styles'
import clsx from 'clsx'

export const StyledInputBase = withStyles(theme => ({
  root: {
    width: '100%',
    // backgroundColor: '#f4f4f4',
    // border: '2px solid rgb(204, 217, 223)',
    // boxShadow: 'rgba(12, 52, 75, 0.05) 0px 3px 3px',
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    backgroundColor: 'transparent',
    border: '2px solid rgb(204, 217, 223)',
    borderRadius: 8,
    position: 'relative',
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 0,
    },
    '@media (pointer: fine)': {
      fontSize: 12
    },
    '@media (pointer: course)': {
      fontSize: 20
    }
  }
}))(InputBase)

export default StyledInputBase
