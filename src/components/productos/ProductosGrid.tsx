import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  setProductos,
  setCurrentTotal,
  getProductsFromState,
  getPaginaFromState,
  getPaginadoFromState,
  getCurrentCategoriaFromState
} from './productosSlice'

import request from '../../utils/request'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Spinner from '../spinner/Spinner'
import { Producto } from './Producto'

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
  const [isLoadingTotal, setIsLoadingTotal] = useState(true)
  const [errorLoadingProducts, setErrorLoadingProducts] = useState(false)

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
          `/getProducts?limitStart=${limitStart}&limitCount=${paginado}${categoriaParam}`
        )
        dispatch(setProductos(resp.data))
      } catch (error) {
        setErrorLoadingProducts(true)
      } finally {
        setIsLoadingProducts(false)
      }
    }

    getProducts()
  }, [dispatch, pagina, paginado, categoria])

  useEffect(() => {
    const getTotal = async () => {
      const categoriaParam = categoria ? `?categoriaId=${categoria}` : ''
      try {
        const resp: GetTotalBackendResponse = await request.get(`/getTotal${categoriaParam}`)
        dispatch(setCurrentTotal(resp.data))
      } catch (error) {
        setErrorLoadingProducts(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotal()
  }, [dispatch, categoria])

  if (isLoadingProducts || isLoadingTotal) {
    return <Spinner />
  }
  if (errorLoadingProducts) {
    return <div>Hubo un problema al intentar cargar los productos</div>
  }

  return (
    <div className={classes.productosGrid}>
      <Grid container spacing={0}>
        {productos.map(producto => {
          return (
            <Grid item xs={4} key={producto.id}>
              <Producto {...producto} />
            </Grid>
          )
        })}
      </Grid>
    </div>
  )
}