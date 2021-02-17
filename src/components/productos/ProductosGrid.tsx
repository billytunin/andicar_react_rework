import React from 'react'
import { useSelector } from 'react-redux'

import { getGetProductsLoading, getModificarProductosLoading } from './productosSlice'

import styles from './ProductosGrid.module.css'
import Grid from '@material-ui/core/Grid'

import ProductosGridBody from './ProductosGridBody'
import PaginadorProductos from '../paginador/PaginadorProductos'
import BuscadorDeProductos from './buscador-de-productos/BuscadorDeProductos'

export default function ProductosGrid() {
  const isLoadingProducts = useSelector(getGetProductsLoading)
  const modificarProductosLoading = useSelector(getModificarProductosLoading)

  return (
    <div>
      <Grid container spacing={0} className={styles.productosTools}>
        <Grid item xs>
          <PaginadorProductos isDisabled={isLoadingProducts || modificarProductosLoading} />
        </Grid>
        <Grid item xs>
          <BuscadorDeProductos isDisabled={isLoadingProducts || modificarProductosLoading} />
        </Grid>
      </Grid>
      <div className={styles.productosGrid}>
        <ProductosGridBody />
      </div>
    </div>
  )
}