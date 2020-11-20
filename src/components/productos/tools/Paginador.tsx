import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import request from '../../../utils/request'

import { createStyles, makeStyles } from '@material-ui/core/styles'

import {
  setPagina,
  getPaginaFromState,
  getCurrentTotalFromState,
  getPaginadoFromState,
  getCurrentCategoriaFromState,
  setCurrentTotal
} from '../productosSlice'

import PaginadorConfigModal from '../../paginador-config-modal/PaginadorConfigModal'
import ValidatedNumberField from '../../validated-number-field/ValidatedNumberField'

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
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)
  const lastPage = Math.ceil(currentTotal / currentPaginado)
  const categoria = useSelector(getCurrentCategoriaFromState)
  const [getTotalError, setGetTotalError] = useState(false)
  const [isLoadingTotal, setIsLoadingTotal] = useState(false)

  const handleClick = (pageNumber: number) => {
    dispatch(setPagina(pageNumber))
  }

  useEffect(() => {
    const getTotal = async () => {
      setIsLoadingTotal(true)
      const categoriaParam = categoria ? `?categoriaId=${categoria}` : ''
      try {
        const resp: GetTotalBackendResponse = await request.get(`/auth/getTotal${categoriaParam}`)
        dispatch(setCurrentTotal(resp.data))
      } catch (error) {
        setGetTotalError(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotal()
  }, [dispatch, categoria])

  return getTotalError || isLoadingTotal ? <div></div> : (
    <div className={classes.root}>
      <IconButton
        aria-label="previous-page"
        onClick={() => handleClick(currentPagina - 1)}
        disabled={currentPagina === 1}
      >
        <ArrowBackIcon />
      </IconButton>
      <ValidatedNumberField
        handleClick={handleClick}
        maxNumber={lastPage}
        bindedValue={currentPagina.toString()}
      />
      <IconButton
        aria-label="next-page"
        onClick={() => handleClick(currentPagina + 1)}
        disabled={currentPagina === lastPage}
      >
        <ArrowForwardIcon />
      </IconButton>
      <PaginadorConfigModal />
    </div>
  )
}