import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setProductos, getProductsFromState } from './productosSlice'

import request from '../../utils/request'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Spinner from '../spinner/Spinner'
import { Producto } from './Producto'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
)

export function Productos() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const [isLoading, setIsLoading] = useState(true)
  const [errorLoadingProducts, setErrorLoadingProducts] = useState(false)

  const productos = useSelector(getProductsFromState)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const resp: ProductosBackendResponse = await request.get('/getProducts')
        dispatch(setProductos(resp.data))
      } catch (error) {
        setErrorLoadingProducts(true)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts()
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }
  if (errorLoadingProducts) {
    return <div>Hubo un problema al intentar cargar los productos</div>
  }

  return (
    <div className={classes.root}>
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