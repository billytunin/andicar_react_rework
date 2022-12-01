import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import axios from '../../utils/axios'
import AndicarModal from '../andicar-modal/AndicarModal'
import ProductConfigPorUsuarioTableHeader from './ProductConfigPorUsuarioTableHeader'
import Spinner from '../spinner/Spinner'
import { modalState, toggleModal } from './productConfigPorUsuarioModalSlice'

import styles from './ProductConfigPorUsuario.module.css'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'

import ValidatedFloatNumberField from '../validated-number-field/ValidatedFloatNumberField'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

const VALIDATION_GROUP_NAME = 'productConfigPorUsuarioForm'

export default function ProductConfigPorUsuarioModal() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, productId } = useSelector(modalState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<ProductConfigPorUsuarioRowData[]>([])
  const [rowsToSave, setRowsToSave] = useState<ProductConfigPorUsuarioRowData[]>([])

  const handleCloseModal = () => {
    dispatch(
      toggleModal({ isOpen: false })
    )
  }

  const setup = async () => {
    setLoading(true)
    try {
      const resp: GetUsersBackendResponse = await axios.get('/auth/users')
      const users = resp.data
      const resp2: GetProductConfigPorUsuarioForAllUsersBackendResponse = await axios.get(`/auth/getPrecioOffsetForAllUsers?productId=${productId}`)
      const productConfigPorUsuarioArray = resp2.data
      console.log('delete me 1')
      console.log(productConfigPorUsuarioArray)
      setRows(
        users.map(user => {
          const productConfigPorUsuario = productConfigPorUsuarioArray.find(productConfigPorUsuarioObj => productConfigPorUsuarioObj.user_id === user.id)
          return {
            userId: user.id,
            userName: user.user,
            offset: productConfigPorUsuario ? productConfigPorUsuario.offset : 0,
            // TODO gaston: este "|| false" no deberia hacer falta cuando termine el BE
            hidden: productConfigPorUsuario ? productConfigPorUsuario.hidden || false : false,
            modifiedRow: false
          }
        })
      )
    } catch(error) {
      console.log('Hubo un error al intentar cargar los usuarios')
    } finally {
      setLoading(false)
    }
  }

  const modificarOffset = (value: string | number, userId: string | number) => {
    const newRows = [...rows]
    const foundIndex = newRows.findIndex(row => row.userId === userId)
    if (foundIndex !== -1) {
      newRows[foundIndex].offset = value
      newRows[foundIndex].modifiedRow = true
    }

    setRows(newRows)
  }

  const modificarHidden = (value: boolean, userId: string | number) => {
    const newRows = [...rows]
    const foundIndex = newRows.findIndex(row => row.userId === userId)
    if (foundIndex !== -1) {
      newRows[foundIndex].hidden = value
      newRows[foundIndex].modifiedRow = true
    }

    setRows(newRows)
  }

  useEffect(() => {
    if (isOpen) {
      setup()
    }
    // eslint-disable-next-line
  }, [isOpen])

  useEffect(() => {
    setRowsToSave(
      rows.filter(row => row.modifiedRow)
    )
  }, [rows])

  const handleGuardarCambios = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setLoading(true)
      try {
        console.log('delete me 2')
        console.log(rowsToSave)
        await axios.post('/auth/setPrecioOffset', {
          productId,
          usersAndOffsets: rowsToSave.map(rowToSave => ({ userId: rowToSave.userId, offset: rowToSave.offset }))
        })
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))

        enqueueSnackbar(
          'Precio offsets cargados con éxito',
          { variant: 'success' }
        )
        handleCloseModal()
      } catch(error) {
        enqueueSnackbar(
          'Hubo un problema al intentar cargar los precio offsets. Por favor intente nuevamente',
          { variant: 'error' }
        )
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <AndicarModal
      isOpen={isOpen}
      handleClose={handleCloseModal}
      width="50%"
    >
      {
        loading ? <Spinner /> :
        <div>
          <ProductConfigPorUsuarioTableHeader />
          {rows.map(row =>
            <Grid
              container
              key={row.userId}
              alignItems='center'
              className={styles.rowContainer}
            >
              <Grid item xs>
                <span>{row.userName}</span>
              </Grid>
              <Grid item xs>
                <ValidatedFloatNumberField
                  entityName='precio-offset'
                  uniqueId={row.userId}
                  label=''
                  value={row.offset}
                  onChange={(value) => modificarOffset(value, row.userId)}
                  validationGroupName={VALIDATION_GROUP_NAME}
                />
              </Grid>
              <Grid item xs>
                <div className={styles.switchContainer}>
                  <Switch
                    color='primary'
                    checked={row.hidden}
                    onChange={(event) => modificarHidden(event.target.checked, row.userId)}
                  />
                </div>
              </Grid>
            </Grid>
          )}
          <div className={styles.saveButtonContainer}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<SaveIcon />}
              onClick={handleGuardarCambios}
              disabled={!rowsToSave.length}
            >
              Guardar cambios
            </Button>
          </div>
        </div>
      }
    </AndicarModal>
  )
}