import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import axios from '../../../utils/axios'
import styles from './AdminTools.module.css'
import { PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME } from '../../../utils/constants'

import {
  getModifiedProductos,
  setModificarProductosLoading,
  getProductoIdsToDelete,
  resetProductoIdsToDelete
} from '../productosSlice'
import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

export default function AdminToolsActions() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const modifiedProductos = useSelector(getModifiedProductos)
  const productoIdsToDelete = useSelector(getProductoIdsToDelete)
  const modifiedProductosHaveErrors = useSelector(validationGroupHasErrors(PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME))

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
    dispatch(setValidationGroupDirtyState({ validationGroupName: PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME, isDirty: true }))
    if (modifiedProductosHaveErrors) {
      dispatch(shakeInvalids(PRODUCTS_MODIFICATIONS_VALIDATION_GROUP_NAME))
      return
    }

    cleanModifiedProductos()
    dispatch(setModificarProductosLoading(true))

    const promisesMap = []
    if (modifiedProductos.length) {
      promisesMap.push(
        {
          key: 'MODIFY_PRODUCTS',
          promise: axios.put('/auth/modificarProductos', { productos: modifiedProductos })
        }
      )
    }
    if (productoIdsToDelete.length) {
      promisesMap.push(
        {
          key: 'DELETE_PRODUCTS',
          promise: axios.delete('/auth/eliminarProductos', { productoIds: productoIdsToDelete })
        }
      )
    }
    const results = await Promise.all(
      promisesMap.map(mappedPromise => mappedPromise.promise.catch(e => e))
    )

    const modifiedProductosPromiseIndex = promisesMap.findIndex(mappedPromise => mappedPromise.key === 'MODIFY_PRODUCTS')
    if (modifiedProductosPromiseIndex !== -1) {
      const isModifyError = results[modifiedProductosPromiseIndex] instanceof Error
      enqueueSnackbar(
        isModifyError ? 'Hubo un problema al intentar modificar los productos' : 'Productos modificados con éxito',
        { variant: isModifyError ? 'error' : 'success' }
      )
    }
    const productoIdsToDeletePromiseIndex = promisesMap.findIndex(mappedPromise => mappedPromise.key === 'DELETE_PRODUCTS')
    if (productoIdsToDeletePromiseIndex !== -1) {
      const isDeleteError = results[productoIdsToDeletePromiseIndex] instanceof Error
      enqueueSnackbar(
        isDeleteError ? 'Hubo un problema al intentar eliminar los productos' : 'Productos eliminados con éxito',
        { variant: isDeleteError ? 'error' : 'success' }
      )
    }

    dispatch(setModificarProductosLoading(false))
    dispatch(resetProductoIdsToDelete())
  }

  return (
    <div>
      <div className={styles.sectionTitleContainer}>
        <span className={styles.sectionTitle}>Acciones</span>
      </div>
      <div>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={modifiedProductos.length === 0 && productoIdsToDelete.length === 0}
          onClick={handleGuardarCambios}
        >
          Guardar cambios
        </Button>
        {modifiedProductosHaveErrors ? <span className={styles.modifiedProductsError}>Uno o más productos modificados tiene un problema de validación</span> : undefined}
      </div>
    </div>
  )
}