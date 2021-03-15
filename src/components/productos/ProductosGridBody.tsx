import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setProductos,
  setCurrentTotal,
  setGetProductsLoading,
  getGetProductsLoading,
  getProductsFromState,
  getPaginaFromState,
  getPaginadoFromState,
  getCurrentCategoriaIdFromState,
  getProductosStatusFilter,
  getModificarProductosLoading,
  getSearchFilter
} from './productosSlice'

import axios from '../../utils/axios'
import { errorIdIntoMessage } from '../../utils/errorFormater'

import Grid from '@material-ui/core/Grid'
import Spinner from '../spinner/Spinner'
import Producto from './producto/Producto'
import ProductosViewer from '../productos-viewer/ProductosViewer'

export default function ProductosGridBody() {
  const dispatch = useDispatch()

  const [errorLoadingProducts, setErrorLoadingProducts] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const modificarProductosLoading = useSelector(getModificarProductosLoading)
  const isLoadingProducts = useSelector(getGetProductsLoading)

  const productos = useSelector(getProductsFromState)
  const pagina = useSelector(getPaginaFromState)
  const paginado = useSelector(getPaginadoFromState)
  const categoria = useSelector(getCurrentCategoriaIdFromState)
  const productosStatusFilter = useSelector(getProductosStatusFilter)
  const searchFilter = useSelector(getSearchFilter)

  useEffect(() => {
    const getProducts = async () => {
      dispatch(setGetProductsLoading(true))
      const limitStart = (pagina - 1) * paginado

      let queryParams = ''
      let paramsArray = [`limitStart=${limitStart}`, `limitCount=${paginado}`]
      if(categoria) paramsArray.push(`categoriaId=${categoria}`)
      if(productosStatusFilter) paramsArray.push(`productosStatusFilter=${productosStatusFilter}`)
      if(searchFilter) paramsArray.push(`searchFilter=${searchFilter}`)
      queryParams = `?${paramsArray.join('&')}`

      try {
        const resp: ProductosBackendResponse = await axios.get(
          `/auth/getProducts${queryParams}`
        )
        dispatch(setProductos(resp.data.items))
        dispatch(setCurrentTotal(resp.data.total))
      } catch (error) {
        const { errorId = null } = axios.getErrorBody(error)
        setErrorMessage(
          errorIdIntoMessage({
            customMessage: 'Hubo un problema al intentar cargar los productos',
            errorId
          })
        )
        setErrorLoadingProducts(true)
      } finally {
        dispatch(setGetProductsLoading(false))
      }
    }

    if (modificarProductosLoading) {
      return
    }
    getProducts()
  }, [dispatch, pagina, paginado, categoria, productosStatusFilter, modificarProductosLoading, searchFilter])

  if (isLoadingProducts || modificarProductosLoading) {
    return <Spinner />
  }
  if (errorLoadingProducts) {
    return <div>{errorMessage}</div>
  }
  if (productos.length === 0) {
    return <div>No se encontraron productos</div>
  }

  return (
    <div>
      <Grid container spacing={0}>
        {productos.map((producto, index) => {
          return (
            <Grid item xs={4} key={producto.id}>
              <Producto producto={producto} productIndex={index} />
            </Grid>
          )
        })}
      </Grid>
      <ProductosViewer />
    </div>
  )
}