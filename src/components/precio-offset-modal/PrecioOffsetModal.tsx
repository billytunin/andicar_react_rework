import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import axios from '../../utils/axios'
import AndicarModal from '../andicar-modal/AndicarModal'
import Spinner from '../spinner/Spinner'
import { modalState, toggleModal } from './precioOffsetModalSlice'

import styles from './PrecioOffsetModal.module.css'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import Grid from '@material-ui/core/Grid'

import ValidatedFloatNumberField from '../validated-number-field/ValidatedFloatNumberField'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

const VALIDATION_GROUP_NAME = 'precioOffsetForm'

export default function PrecioOffsetModal() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, productId } = useSelector(modalState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<PrecioOffsetRowData[]>([])
  const [rowsToSave, setRowsToSave] = useState<PrecioOffsetRowData[]>([])

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
      const resp2: GetPrecioOffsetForAllUsersBackendResponse = await axios.get(`/auth/getPrecioOffsetForAllUsers?productId=${productId}`)
      const precioOffsetArray = resp2.data
      setRows(
        users.map(user => {
          const precioOffset = precioOffsetArray.find(precioOffsetObj => precioOffsetObj.user_id === user.id)
          return {
            userId: user.id,
            userName: user.user,
            offset: precioOffset ? precioOffset.offset : 0
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
      rows.filter(row => row.offset && row.offset !== '0')
    )
  }, [rows])

  const handleGuardarCambios = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setLoading(true)
      try {
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
    <AndicarModal isOpen={isOpen} handleClose={handleCloseModal}>
      {
        loading ? <Spinner /> :
        <div>
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
                  label='Offset'
                  value={row.offset}
                  onChange={(value) => modificarOffset(value, row.userId)}
                  validationGroupName={VALIDATION_GROUP_NAME}
                />
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