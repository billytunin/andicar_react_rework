import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import styles from '../AdminBox.module.css'
import innerStyles from './ConfigurarCategorias.module.css'

import axios from '../../../utils/axios'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'
import { getCurrentCategoriasFromState, setCategorias } from '../../productos/productosSlice'

import CategoriaInputs from './CategoriaInputs'
import Spinner from '../../spinner/Spinner'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'
import AddIcon from '@material-ui/icons/Add'

const VALIDATION_GROUP_NAME = 'configurarCategorias'

export default function ConfigurarCategorias() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)
  const [modifiedCategorias, setModifiedCategorias] = useState<Array<Categoria>>([])
  const [categoriasToAdd, setCategoriasToAdd] = useState<Array<Categoria>>([])

  const categorias = useSelector(getCurrentCategoriasFromState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const handleGuardarCambios = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      let errorFlag = false
      setIsLoading(true)
      if (categoriasToAdd.length) {
        try {
          await axios.post('/auth/crearCategorias', {
            categorias: categoriasToAdd
          })
          enqueueSnackbar(
            'Categorias agregadas exitosamente',
            { variant: 'success' }
          )
        } catch (error) {
          enqueueSnackbar(
            'Hubo un problema al intentar agregar las categorias. Por favor intente nuevamente',
            { variant: 'error' }
          )
          errorFlag = true
        }
      }
      if (modifiedCategorias.length) {
        try {
          await axios.post('/auth/modificarCategorias', {
            categorias: modifiedCategorias
          })
          enqueueSnackbar(
            'Categorias modificadas exitosamente',
            { variant: 'success' }
          ) 
        } catch (error) {
          enqueueSnackbar(
            'Hubo un problema al intentar modificar las categorias. Por favor intente nuevamente',
            { variant: 'error' }
          )
          errorFlag = true
        }
      }

      if (!errorFlag) {
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))

        // Refresh categorias state on productosSlice
        const getCategoriasResp: CategoriasBackendResponse = await axios.get('/auth/getCategorias')
        dispatch(setCategorias(getCategoriasResp.data))
        setModifiedCategorias([])
        setCategoriasToAdd([])
      }

      setIsLoading(false)
    }
  }

  const agregarCategoria = () => {
    setCategoriasToAdd(
      [
        ...categoriasToAdd,
        {
          id: categorias.length + 1 + categoriasToAdd.length,
          titulo: ''
        }
      ]
    )
  }

  return isLoading ? <Spinner /> : (
    <div className={`${styles.box} ${styles.configurarCategoriasBox}`}>
      <div className={innerStyles.actionButtons}>
        <Button
          variant='outlined'
          color='primary'
          startIcon={<AddIcon />}
          onClick={agregarCategoria}
          className={innerStyles.smallMarginRight}
        >
          Agregar
        </Button>
        <Button
          variant='contained'
          color='primary'
          startIcon={<SaveIcon />}
          disabled={modifiedCategorias.length === 0 && categoriasToAdd.length === 0}
          onClick={handleGuardarCambios}
        >
          Guardar cambios
        </Button>
      </div>
      <CategoriaInputs
        categorias={categorias}
        modifiedCategorias={modifiedCategorias}
        categoriasToAdd={categoriasToAdd}
        setCategoriasToAdd={(newArray) => setCategoriasToAdd(newArray)}
        setModifiedCategorias={(newArray) => setModifiedCategorias(newArray)}
        VALIDATION_GROUP_NAME={VALIDATION_GROUP_NAME}
      />
    </div>
  )
}