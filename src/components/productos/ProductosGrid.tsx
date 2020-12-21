import React from 'react'
import { useSelector } from 'react-redux'

import { getGetProductsLoading, getModificarProductosLoading } from './productosSlice'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import ProductosGridBody from './ProductosGridBody'
import PaginadorProductos from '../paginador/PaginadorProductos'
import BuscadorDeProductos from './buscador-de-productos/BuscadorDeProductos'

const useStyles = makeStyles(() =>
  createStyles({
    productosTools: {
      height: '6vh',
      backgroundColor: 'white'
    },
    productosGrid: {
      height: '82vh',
      flexGrow: 1,
      'overflow-y': 'scroll'
    }
  })
)

export default function ProductosGrid() {
  const classes = useStyles()

  const isLoadingProducts = useSelector(getGetProductsLoading)
  const modificarProductosLoading = useSelector(getModificarProductosLoading)

  return (
    <div>
      <Grid container spacing={0} className={classes.productosTools}>
        <Grid item xs>
          <PaginadorProductos isDisabled={isLoadingProducts || modificarProductosLoading} />
        </Grid>
        <Grid item xs>
          <BuscadorDeProductos isDisabled={isLoadingProducts || modificarProductosLoading} />
        </Grid>
      </Grid>
      <div className={classes.productosGrid}>
        <ProductosGridBody />
      </div>
    </div>
  )
}