import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PaginadorComponent from './PaginadorComponent'

import request from '../../utils/request'

import {
  setPagina,
  setPaginado,
  getPaginaFromState,
  getCurrentTotalFromState,
  getPaginadoFromState,
  getCurrentCategoriaFromState,
  setCurrentTotal
} from '../productos/productosSlice'


export default function PaginadorProductos() {
  const dispatch = useDispatch()
  const currentPagina = useSelector(getPaginaFromState)
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)
  const categoria = useSelector(getCurrentCategoriaFromState)
  const [getTotalError, setGetTotalError] = useState(false)
  const [isLoadingTotal, setIsLoadingTotal] = useState(false)

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPagina(pageNumber))
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    dispatch(setPagina(1))
    dispatch(setPaginado(paginadoNumber))
  }

  useEffect(() => {
    const getTotal = async () => {
      setIsLoadingTotal(true)
      const categoriaParam = categoria ? `?categoriaId=${categoria}` : ''
      try {
        const resp: GetTotalBackendResponse = await request.get(`/auth/getTotalProducts${categoriaParam}`)
        dispatch(setCurrentTotal(resp.data))
      } catch (error) {
        setGetTotalError(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotal()
  }, [dispatch, categoria])

  return getTotalError || isLoadingTotal ?
    <div></div> :
    <PaginadorComponent
      currentPagina={currentPagina}
      handlePageChange={handlePageChange}
      paginado={currentPaginado}
      currentTotal={currentTotal}
      handlePaginadoChange={handlePaginadoChange}
      paginadorConfigModalText='¿Cuantos artículos por página desea ver?'
    />
}