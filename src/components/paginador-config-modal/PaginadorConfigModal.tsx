import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  getPaginadoFromState,
  getCurrentTotalFromState,
  setPaginado,
  setPagina
} from '../productos/productosSlice'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import IconButton from '@material-ui/core/IconButton'
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
      outline: 0
    }
  })
)

export default function PaginadorConfigModal() {
  const dispatch = useDispatch()

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const paginado = useSelector(getPaginadoFromState)
  const currentTotal = useSelector(getCurrentTotalFromState)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCallToAction = (newValue: number) => {
    dispatch(setPaginado(newValue))
    dispatch(setPagina(1))
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
            <p>¿Cuantos artículos por página desea ver?</p>
            <ValidatedNumberField
              bindedValue={paginado.toString()}
              maxNumber={currentTotal}
              handleClick={handleCallToAction}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}