import React from 'react'
import MuiSnackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

function Alert (props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

type SnackbarProps = {
  open: boolean
  setOpen: (open: boolean) => void
  message: string
  severity?: Color
}
export function Snackbar ({
  open,
  setOpen,
  message,
  severity = 'success'
}: SnackbarProps) {
  const classes = useStyles()

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <MuiSnackbar open={open} autoHideDuration={1000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </MuiSnackbar>
    </div>
  )
}
