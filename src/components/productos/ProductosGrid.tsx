import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setProductos,
  getProductsFromState,
  getPaginaFromState,
  getPaginadoFromState,
  getCurrentCategoriaFromState
} from './productosSlice'

import request from '../../utils/request'
import { errorIdIntoMessage } from '../../utils/errorFormater'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Spinner from '../spinner/Spinner'
import Producto from './Producto'
import ProductosViewer from '../productos-viewer/ProductosViewer'

const useStyles = makeStyles(() =>
  createStyles({
    productosGrid: {
      height: '88vh',
      flexGrow: 1,
      'overflow-y': 'scroll'
    }
  })
)

export default function ProductosGrid() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [errorLoadingProducts, setErrorLoadingProducts] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const productos = useSelector(getProductsFromState)
  const pagina = useSelector(getPaginaFromState)
  const paginado = useSelector(getPaginadoFromState)
  const categoria = useSelector(getCurrentCategoriaFromState)

  useEffect(() => {
    const getProducts = async () => {
      setIsLoadingProducts(true)
      const limitStart = (pagina - 1) * paginado
      const categoriaParam = categoria ? `&categoriaId=${categoria}` : ''
      try {
        const resp: ProductosBackendResponse = await request.get(
          `/auth/getProducts?limitStart=${limitStart}&limitCount=${paginado}${categoriaParam}`
        )
        dispatch(setProductos(resp.data))
      } catch (error) {
        const errorId = (error.error && error.error.data && error.error.data.errorId) || null
        setErrorMessage(
          errorIdIntoMessage({
            customMessage: 'Hubo un problema al intentar cargar los productos',
            errorId
          })
        )
        setErrorLoadingProducts(true)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    getProducts()
  }, [dispatch, pagina, paginado, categoria])

  if (isLoadingProducts) {
    return <Spinner />
  }
  if (errorLoadingProducts) {
    return <div>{errorMessage}</div>
  }

  return (
    <div className={classes.productosGrid}>
      <Grid container spacing={0}>
        {productos.map((producto, index) => {
          return (
            <Grid item xs={4} key={producto.id}>
              <Producto {...producto} productIndex={index} />
            </Grid>
          )
        })}
      </Grid>
      <ProductosViewer />
    </div>
  )
}