import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { createStyles, makeStyles } from '@material-ui/core/styles'

import {
  setPagina,
  getPaginaFromState,
  getCurrentTotalFromState,
  getPaginadoFromState
} from '../productosSlice'

import GoToPageButton from './GoToPageButton'

import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiButton-root, .MuiIconButton-root': {
        color: 'white'
      },
      '& .MuiIconButton-root.Mui-disabled, .MuiButton-root.Mui-disabled': {
        opacity: 0.3,
        cursor: 'not-allowed'
      },
      '& .MuiInputBase-input': {
        width: '40px'
      }
    }
  })
)

export default function Paginador() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const currentPagina = useSelector(getPaginaFromState)
  const [goToPage, setGoToPage] = useState('1')
  const [errorOnGoToPage, setErrorOnGoToPage] = useState(false)
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)
  const lastPage = Math.ceil(currentTotal / currentPaginado)

  const handleClick = (pageNumber: number) => {
    dispatch(setPagina(pageNumber))
    setGoToPage(pageNumber.toString())
    setErrorOnGoToPage(false)
  }

  const handleGoToPageClick = (pageNumber: string) => {
    handleClick(Number(pageNumber))
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
    setGoToPage(newValue)
    const onlyPositiveIntegersRegExp = /^\d*[1-9]\d*$/
    if (onlyPositiveIntegersRegExp.test(newValue) && Number(newValue) <= lastPage) {
      setErrorOnGoToPage(false)
    } else {
      setErrorOnGoToPage(true)
    }
  }

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="delete"
        onClick={() => handleClick(currentPagina - 1)}
        disabled={currentPagina === 1}
      >
        <ArrowBackIcon />
      </IconButton>
      <TextField
        id="pageNumber"
        onChange={handleInputChange}
        error={errorOnGoToPage}
        value={goToPage}
        InputProps={{
          endAdornment: <InputAdornment position="end">/ {lastPage}</InputAdornment>
        }}
      />
      <GoToPageButton handleClick={() => handleGoToPageClick(goToPage)} errorOnGoToPage={errorOnGoToPage} />
      <IconButton
        aria-label="delete"
        onClick={() => handleClick(currentPagina + 1)}
        disabled={currentPagina === lastPage}
      >
        <ArrowForwardIcon />
      </IconButton>
    </div>
  )
}