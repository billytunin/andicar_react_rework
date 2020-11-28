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
  setCurrentTotal,
  getArchivadosFilter
} from '../productos/productosSlice'


export default function PaginadorProductos() {
  const dispatch = useDispatch()
  const currentPagina = useSelector(getPaginaFromState)
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)
  const categoria = useSelector(getCurrentCategoriaFromState)
  const archivadosFilter = useSelector(getArchivadosFilter)
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
      let queryParams = ''
      if (categoria || archivadosFilter !== null) {
        let paramsArray = []
        if(categoria) paramsArray.push(`categoriaId=${categoria}`)
        if(archivadosFilter !== null) paramsArray.push(`archivados=${archivadosFilter}`)
        queryParams = `?${paramsArray.join('&')}`
      }
      try {
        const resp: GetTotalBackendResponse = await request.get(`/auth/getTotalProducts${queryParams}`)
        dispatch(setCurrentTotal(resp.data))
      } catch (error) {
        setGetTotalError(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotal()
  }, [dispatch, categoria, archivadosFilter])

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