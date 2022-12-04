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
      const resp2: GetProductConfigPorUsuarioForAllUsersBackendResponse = await axios.get(`/auth/getProductConfigForAllUsers?productId=${productId}`)
      const productConfigPorUsuarioArray = resp2.data
      setRows(
        users.map(user => {
          const productConfigPorUsuario = productConfigPorUsuarioArray.find(productConfigPorUsuarioObj => productConfigPorUsuarioObj.user_id === user.id)
          return {
            userId: user.id,
            userName: user.user,
            offset: productConfigPorUsuario ? productConfigPorUsuario.offset : 0,
            hidden: productConfigPorUsuario ? productConfigPorUsuario.hidden : false,
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
        await axios.post('/auth/setProductConfig', {
          productId,
          productConfigBody: rowsToSave.map(rowToSave => ({
            userId: rowToSave.userId,
            offset: rowToSave.offset,
            hidden: rowToSave.hidden
          }))
        })
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))

        enqueueSnackbar(
          'Configuraciones por usuario cargados para este producto con éxito',
          { variant: 'success' }
        )
        handleCloseModal()
      } catch(error) {
        enqueueSnackbar(
          'Hubo un problema al intentar guardar la configuracion por usuario para este producto. Por favor intente nuevamente',
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