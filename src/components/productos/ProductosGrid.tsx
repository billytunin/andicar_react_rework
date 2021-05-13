import React from 'react'
import { useSelector } from 'react-redux'

import { getGetProductsLoading, getModificarProductosLoading } from './productosSlice'
import { getIsMobileVersion } from '../../userStateSlice'

import styles from './ProductosGrid.module.css'
import Grid from '@material-ui/core/Grid'

import ProductosGridBody from './ProductosGridBody'
import PaginadorProductos from '../paginador/PaginadorProductos'
import BuscadorDeProductos from './buscador-de-productos/BuscadorDeProductos'
import CategoriaSelector from './categoria-selector/CategoriaSelector'

export default function ProductosGrid() {
  const isLoadingProducts = useSelector(getGetProductsLoading)
  const isMobileVersion = useSelector(getIsMobileVersion)
  const modificarProductosLoading = useSelector(getModificarProductosLoading)

  return (
    <div>
      <div className={`${styles.productosTools} toolbarBackground`}>
        <Grid container spacing={0}>
          <Grid item xs={isMobileVersion ? 12 : 6}>
            <PaginadorProductos isDisabled={isLoadingProducts || modificarProductosLoading} />
          </Grid>
          <Grid item xs={isMobileVersion ? 12 : 6}>
            <BuscadorDeProductos isDisabled={isLoadingProducts || modificarProductosLoading} fullWidth={isMobileVersion} />
          </Grid>
          {
            isMobileVersion ?
            <Grid item xs={isMobileVersion ? 12 : 6}>
              <CategoriaSelector />
            </Grid>
            :
            undefined
          }
        </Grid>
      </div>
      <div className={styles.productosGrid}>
        <ProductosGridBody />
      </div>
    </div>
  )
}