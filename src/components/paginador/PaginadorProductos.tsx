import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import PaginadorComponent from './PaginadorComponent'

import {
  setPagina,
  setPaginado,
  getPaginaFromState,
  getCurrentTotalFromState,
  getPaginadoFromState,
  getGetProductsLoading,
  getModificarProductosLoading,
} from '../productos/productosSlice'


export default function PaginadorProductos() {
  const dispatch = useDispatch()

  const currentPagina = useSelector(getPaginaFromState)
  const currentTotal = useSelector(getCurrentTotalFromState)
  const currentPaginado = useSelector(getPaginadoFromState)

  const modificarProductosLoading = useSelector(getModificarProductosLoading)
  const getProductsLoading = useSelector(getGetProductsLoading)

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPagina(pageNumber))
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    dispatch(setPaginado(paginadoNumber))
  }

  return getProductsLoading || modificarProductosLoading ?
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