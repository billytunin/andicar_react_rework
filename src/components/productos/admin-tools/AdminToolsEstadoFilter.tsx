import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DEFAULT_PAGINADO } from '../../../utils/constants'

import {
  getProductosStatusFilter,
  setProductosStatusFilter,
  setPagina,
  setPaginado
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

    dispatch(setPagina(1))
    dispatch(setPaginado(DEFAULT_PAGINADO))
  }

  return (
    <div>
      <p>Filtro de estado:</p>
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