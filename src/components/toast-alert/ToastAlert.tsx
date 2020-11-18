import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { toastState, closeToast } from './toastAlertSlice'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  }
}))

const alertStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '1.4rem',
    '& .MuiAlert-icon': {
      'font-size': '1.4rem',
      'margin-top': '0.4rem'
    },
    '& .MuiAlert-action': {
      'padding-top': '0.1rem'
    }
  }
}))

export default function ToastAlert() {
  const classes = useStyles()
  const alertClasses = alertStyles()
  const dispatch = useDispatch()

  const currentToastState = useSelector(toastState)

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(closeToast())
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={currentToastState.open}
        autoHideDuration={currentToastState.severity === 'error' ? 10000 : 6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={currentToastState.severity} className={alertClasses.root}>
          {currentToastState.text}
        </Alert>
      </Snackbar>
    </div>
  )
}