import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import PaginadorConfigModal from '../paginador-config-modal/PaginadorConfigModal'
import ValidatedNumberField from '../validated-number-field/ValidatedNumberField'
import InputActionButton from '../input-action-button/InputActionButton'

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingTop: 16,
      '& .MuiIconButton-root.Mui-disabled, .MuiButton-root.Mui-disabled': {
        cursor: 'not-allowed'
      },
      '& .MuiInputBase-input': {
        width: '40px'
      },
      '& .MuiIconButton-root': {
        padding: '2px 0 0 0',
        'vertical-align': 'unset'
      }
    }
  })
)

export default function PaginadorComponent(props: PaginadorComponentProps) {
  const classes = useStyles()
  const lastPage = Math.ceil(props.currentTotal / props.paginado)
  const [internalValue, setInternalValue] = useState('')
  const [internalValueIsInvalid, setInternalValueIsInvalid] = useState(false)

  const internalValueChanged = (newValue: string, isInvalid: boolean) => {
    setInternalValue(newValue)
    setInternalValueIsInvalid(isInvalid)
  }

  const enterKeyPressed = () => {
    if (!internalValueIsInvalid) {
      props.handlePageChange(parseFloat(internalValue))
    }
  }

  useEffect(() => {
    setInternalValue(props.currentPagina.toString())
  }, [props.currentPagina])

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="previous-page"
        onClick={() => props.handlePageChange(props.currentPagina - 1)}
        disabled={props.isDisabled || props.currentPagina <= 1}
      >
        <ArrowBackIcon />
      </IconButton>
      <ValidatedNumberField
        isDisabled={props.isDisabled}
        maxNumber={lastPage}
        bindedValue={internalValue}
        bindedValueChanged={internalValueChanged}
        enterKeyPressed={enterKeyPressed}
      />
      <IconButton
        aria-label="next-page"
        onClick={() => props.handlePageChange(props.currentPagina + 1)}
        disabled={props.isDisabled || props.currentPagina >= lastPage}
      >
        <ArrowForwardIcon />
      </IconButton>
      <InputActionButton
        disabled={internalValueIsInvalid}
        onClick={() => props.handlePageChange(parseFloat(internalValue))}
        text='IR'
      />
      <PaginadorConfigModal
        isDisabled={props.isDisabled}
        paginado={props.paginado}
        currentTotal={props.currentTotal}
        handlePaginadoChange={props.handlePaginadoChange}
        paginadorConfigModalText={props.paginadorConfigModalText}
      />
    </div>
  )
}