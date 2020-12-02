import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import request from '../../../utils/request'

import {
  getModifiedProductos,
  setModificarProductosLoading,
  getProductoIdsToDelete,
  resetProductoIdsToDelete
} from '../productosSlice'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'

export default function AdminToolsActions() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const modifiedProductos = useSelector(getModifiedProductos)
  const productoIdsToDelete = useSelector(getProductoIdsToDelete)

  /**
   * Checks that no modifiedProductos overlap with productoIdsToDelete. If there are overlaps, remove them from modifiedProductos
   * because they will be deleted on the BE
   */
  const cleanModifiedProductos = () => {
    const foundIndexes = modifiedProductos.map(
      producto => productoIdsToDelete.findIndex(
        productoId => producto.id === productoId
      )
    )
    foundIndexes.forEach(foundIndex => {
      if (foundIndex !== -1) {
        modifiedProductos.splice(foundIndex, 1)
      }
    })
  }

  const handleGuardarCambios = async () => {
    cleanModifiedProductos()
    dispatch(setModificarProductosLoading(true))

    const promisesMap = []
    if (modifiedProductos.length) {
      promisesMap.push(
        {
          key: 'MODIFY_PRODUCTS',
          promise: request.post('/auth/modificarProductos', { productos: modifiedProductos })
        }
      )
    }
    if (productoIdsToDelete.length) {
      promisesMap.push(
        {
          key: 'DELETE_PRODUCTS',
          promise: request.delete('/auth/eliminarProductos', { productoIds: productoIdsToDelete })
        }
      )
    }
    const results = await Promise.all(
      promisesMap.map(mappedPromise => mappedPromise.promise.catch(e => e))
    )

    const modifiedProductosPromiseIndex = promisesMap.findIndex(mappedPromise => mappedPromise.key === 'MODIFY_PRODUCTS')
    if (modifiedProductosPromiseIndex !== -1) {
      enqueueSnackbar(
        results[modifiedProductosPromiseIndex] instanceof Error ? 'Hubo un problema al intentar modificar los productos' : 'Productos modificados con éxito',
        {
          variant: results[modifiedProductosPromiseIndex] instanceof Error ? 'error' : 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        }
      )
    }
    const productoIdsToDeletePromiseIndex = promisesMap.findIndex(mappedPromise => mappedPromise.key === 'DELETE_PRODUCTS')
    if (productoIdsToDeletePromiseIndex !== -1) {
      enqueueSnackbar(
        results[productoIdsToDeletePromiseIndex] instanceof Error ? 'Hubo un problema al intentar eliminar los productos' : 'Productos eliminados con éxito',
        {
          variant: results[productoIdsToDeletePromiseIndex] instanceof Error ? 'error' : 'success',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center'
          }
        }
      )
    }

    dispatch(setModificarProductosLoading(false))
    dispatch(resetProductoIdsToDelete())
  }

  return (
    <div>
      <p>Acciones:</p>
      <ButtonGroup orientation='vertical'>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={modifiedProductos.length === 0 && productoIdsToDelete.length === 0}
          onClick={handleGuardarCambios}
        >
          Guardar cambios
        </Button>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
        >
          Agregar productos
        </Button>
      </ButtonGroup>
    </div>
  )
}