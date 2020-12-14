import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import PaginadorConfigModal from '../paginador-config-modal/PaginadorConfigModal'
import ValidatedNumberField from '../validated-number-field/ValidatedNumberField'

import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiIconButton-root.Mui-disabled, .MuiButton-root.Mui-disabled': {
        cursor: 'not-allowed'
      },
      '& .MuiInputBase-input': {
        width: '40px'
      }
    }
  })
)

export default function PaginadorComponent(props: PaginadorComponentProps) {
  const classes = useStyles()
  const lastPage = Math.ceil(props.currentTotal / props.paginado)
  return (
    <div className={classes.root}>
      <IconButton
        aria-label="previous-page"
        onClick={() => props.handlePageChange(props.currentPagina - 1)}
        disabled={props.currentPagina <= 1}
      >
        <ArrowBackIcon />
      </IconButton>
      <ValidatedNumberField
        handleClick={props.handlePageChange}
        maxNumber={lastPage}
        bindedValue={props.currentPagina.toString()}
      />
      <IconButton
        aria-label="next-page"
        onClick={() => props.handlePageChange(props.currentPagina + 1)}
        disabled={props.currentPagina >= lastPage}
      >
        <ArrowForwardIcon />
      </IconButton>
      <PaginadorConfigModal
        paginado={props.paginado}
        currentTotal={props.currentTotal}
        handlePaginadoChange={props.handlePaginadoChange}
        paginadorConfigModalText={props.paginadorConfigModalText}
      />
    </div>
  )
}