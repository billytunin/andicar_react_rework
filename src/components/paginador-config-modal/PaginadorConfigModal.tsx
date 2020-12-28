import React, { useState } from 'react'

import AndicarModal from '../andicar-modal/AndicarModal'

import styles from './PaginadorConfigModal.module.css'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import SettingsIcon from '@material-ui/icons/Settings'
import ValidatedNumberField from '../validated-number-field/ValidatedNumberField'

export default function PaginadorConfigModal(props: PaginadorConfigModalProps) {
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
    <div className={styles.container}>
      <IconButton
        aria-label="configure-paginacion"
        onClick={handleOpen}
        disabled={props.isDisabled}
      >
        <SettingsIcon />
      </IconButton>
      <AndicarModal
        isOpen={open}
        handleClose={handleClose}
      >
        <span className={styles.titleText}>{props.paginadorConfigModalText}</span>
        <ValidatedNumberField
          bindedValue={props.paginado.toString()}
          maxNumber={props.currentTotal}
          handleClick={handlePaginadoChange}
        />
        <Alert severity="warning">
          Si utiliza un número muy alto, los tiempos de carga podrian extenderse y el consumo de datos podría ser mayor
        </Alert>
      </AndicarModal>
    </div>
  )
}