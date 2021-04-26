import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './AdminTools.module.css'

import {
  getProductosStatusFilter,
  setProductosStatusFilter,
  resetPaginacion
} from '../productosSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

export default function AdminToolsEstadoFilter() {
  const dispatch = useDispatch()
  const productosStatusFilter = useSelector(getProductosStatusFilter)

  const handleProductosStatusFilterChange = (newValue: productosStatusFilter) => {
    if (
      productosStatusFilter === 'both' ||
      (newValue === null && productosStatusFilter === 'archivados') ||
      (newValue === 'archivados' && productosStatusFilter === null)
    ) {
      dispatch(setProductosStatusFilter(newValue))
    } else {
      dispatch(setProductosStatusFilter('both'))
    }

    dispatch(resetPaginacion())
  }

  return (
    <div>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionTitle}>Filtro de Estado</span>
      </div>
      <ButtonGroup>
        <Button
          variant='contained'
          color={productosStatusFilter === null ? 'primary' : undefined}
          onClick={() => handleProductosStatusFilterChange(null)}
        >
          Activos
        </Button>
        <Button
          variant='contained'
          color={productosStatusFilter === 'archivados' ? 'primary' : undefined}
          onClick={() => handleProductosStatusFilterChange('archivados')}
        >
          Archivados
        </Button>
      </ButtonGroup>
    </div>
  )
}