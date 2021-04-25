import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PaginadorComponent from './PaginadorComponent'

import {
  setPagina,
  setPaginado,
  getPaginaFromState,
  getCurrentTotalFromState,
  getPaginadoFromState
} from '../productos/productosSlice'


export default function PaginadorProductos(props: PaginadorProductosProps) {
  const dispatch = useDispatch()

  const currentPagina = useSelector(getPaginaFromState)
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPagina(pageNumber))
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    dispatch(setPaginado(paginadoNumber))
  }

  return (
    <PaginadorComponent
      isDisabled={props.isDisabled}
      currentPagina={currentPagina}
      paddingTop='1.3vh'
      handlePageChange={handlePageChange}
      paginado={currentPaginado}
      currentTotal={currentTotal}
      handlePaginadoChange={handlePaginadoChange}
      paginadorConfigModalText='¿Cuantos artículos por página desea ver?'
    />
  )
}