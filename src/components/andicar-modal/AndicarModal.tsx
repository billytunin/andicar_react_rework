import React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

interface AndicarModalProps {
  children: React.ReactNode,
  handleClose: () => void,
  isOpen: boolean
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: 0,
      width: '300px'
    }
  })
)

export default function AndicarModal(props: AndicarModalProps) {
  const classes = useStyles()

  return (
    <Modal
      className={classes.modal}
      open={props.isOpen}
      onClose={props.handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.isOpen}>
        <div className={classes.paper}>
          {props.children}
        </div>
      </Fade>
    </Modal>
  )
}