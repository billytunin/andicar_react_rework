import React, { useState } from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import SettingsIcon from '@material-ui/icons/Settings'
import ValidatedNumberField from '../validated-number-field/ValidatedNumberField'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'inline'
    },
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

export default function PaginadorConfigModal(props: PaginadorConfigModalProps) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    props.handlePaginadoChange(paginadoNumber)
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="configure-paginacion"
        onClick={handleOpen}
      >
        <SettingsIcon />
      </IconButton>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <p>{props.paginadorConfigModalText}</p>
            <ValidatedNumberField
              bindedValue={props.paginado.toString()}
              maxNumber={props.currentTotal}
              handleClick={handlePaginadoChange}
            />
            <Alert severity="warning">
              Si utiliza un número muy alto, los tiempos de carga podrian extenderse y el consumo de datos podría ser mayor
            </Alert>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}