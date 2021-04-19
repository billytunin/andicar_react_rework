import React, { useState, useEffect } from 'react'

import AndicarModal from '../andicar-modal/AndicarModal'
import InputActionButton from '../input-action-button/InputActionButton'

import styles from './PaginadorConfigModal.module.css'
import IconButton from '@material-ui/core/IconButton'
import Alert from '@material-ui/lab/Alert'
import SettingsIcon from '@material-ui/icons/Settings'
import ValidatedNumberField from '../validated-number-field/ValidatedNumberField'

export default function PaginadorConfigModal(props: PaginadorConfigModalProps) {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState('')
  const [internalValueIsInvalid, setInternalValueIsInvalid] = useState(false)

  const internalValueChanged = (newValue: string, isInvalid: boolean) => {
    setInternalValue(newValue)
    setInternalValueIsInvalid(isInvalid)
  }

  useEffect(() => {
    setInternalValue(props.paginado.toString())
  }, [props.paginado])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const executePaginadoChange = () => {
    if (internalValueIsInvalid) {
      return
    }

    props.handlePaginadoChange(
      parseFloat(internalValue)
    )
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
        <div className={styles.inputContainer}>
          <span className={styles.titleText}>{props.paginadorConfigModalText}</span>
          <ValidatedNumberField
            bindedValue={internalValue}
            bindedValueChanged={internalValueChanged}
            enterKeyPressed={executePaginadoChange}
            maxNumber={props.currentTotal}
          />
          <InputActionButton
            disabled={internalValueIsInvalid}
            onClick={executePaginadoChange}
            moreLineHeight={true}
            text='OK'
          />
        </div>
        <Alert severity="warning">
          Si utiliza un número muy alto, los tiempos de carga podrian extenderse y el consumo de datos podría ser mayor
        </Alert>
      </AndicarModal>
    </div>
  )
}