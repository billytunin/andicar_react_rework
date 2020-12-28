import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { cloneDeep } from 'lodash'

import request from '../../utils/request'

import styles from './ModalBody.module.css'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'
import { getCurrentCategoriasFromState, setCategorias } from '../productos/productosSlice'
import ValidationInput from '../validation-input/ValidationInput'

import Spinner from '../spinner/Spinner'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

const VALIDATION_GROUP_NAME = 'administrarCategoriasModal'

interface AdministrarCategoriasModalBodyProps {
  closeModal: () => void
}

export default function AdministrarCategoriasModalBody(props: AdministrarCategoriasModalBodyProps){
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)
  const [modifiedCategorias, setModifiedCategorias] = useState<Array<Categoria>>([])

  const categorias = useSelector(getCurrentCategoriasFromState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const handleOnChange = (categoriaId: number, value: string) => {
    let newArray: Array<Categoria> = cloneDeep(modifiedCategorias)

    if (shouldRemoveModifiedCategoria(categoriaId, value)) {
      const foundCategoriaIndex = modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
      if (foundCategoriaIndex !== -1) {
        newArray.splice(foundCategoriaIndex, 1)
      }
    } else {
      const foundCategoriaIndex = modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
      if (foundCategoriaIndex !== -1) {
        newArray[foundCategoriaIndex] = {
          titulo: value,
          id: categoriaId
        }
      } else {
        newArray.push({
          titulo: value,
          id: categoriaId
        })
      }
    }

    setModifiedCategorias(newArray)
  }

  const isModifiedCategoria = (categoriaId: number) => {
    const foundModifiedCategoriaIndex = modifiedCategorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    return foundModifiedCategoriaIndex !== -1
  }

  const getValidationInputValue = (categoriaId: number) => {
    const isModifiedCategoriaFlag = isModifiedCategoria(categoriaId)
    let value = ''
    if (isModifiedCategoriaFlag) {
      const foundCategoria = modifiedCategorias.find(c => c.id === categoriaId)
      value = foundCategoria ? foundCategoria.titulo : ''
    } else {
      const foundCategoria = categorias.find(c => c.id === categoriaId)
      value = foundCategoria ? foundCategoria.titulo : ''
    }

    return value
  }

  const shouldRemoveModifiedCategoria = (categoriaId: number, value: string) => {
    const foundOriginalCategoriaIndex = categorias.findIndex(categoriaObj => categoriaObj.id === categoriaId)
    if (foundOriginalCategoriaIndex !== -1) {
      return categorias[foundOriginalCategoriaIndex].titulo === value
    }
  }

  const handleGuardarCambios = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsLoading(true)
      try {
        await request.post('/auth/modificarCategorias', {
          categorias: modifiedCategorias
        })
        enqueueSnackbar(
          'Categorias modificadas exitosamente',
          { variant: 'success' }
        )
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))

        // Refresh categorias state on productosSlice
        const getCategoriasResp: CategoriasBackendResponse = await request.get('/auth/getCategorias')
        dispatch(setCategorias(getCategoriasResp.data))

        props.closeModal()
      } catch(error) {
        enqueueSnackbar(
          'Hubo un problema al intentar modificar las categorias. Por favor intente nuevamente',
          { variant: 'error' }
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return isLoading ? <Spinner /> : (
    <div>
      {categorias.map(categoriaObj =>
        <div key={categoriaObj.id}>
          <ValidationInput
            id={`${categoriaObj.id}-text-input`}
            label='Titulo'
            required={true}
            maxlength={40}
            value={getValidationInputValue(categoriaObj.id)}
            validationGroupName={VALIDATION_GROUP_NAME}
            onChange={(value) => handleOnChange(categoriaObj.id, value)}
            customInputProps={{
              endAdornment: 
              (
                <InputAdornment position="end">
                  <span className={styles.idCaption}>ID: {categoriaObj.id}</span>
                </InputAdornment>
              )
            }}
          />
        </div>
      )}
      <Button
        variant='contained'
        color='primary'
        startIcon={<SaveIcon />}
        disabled={modifiedCategorias.length === 0}
        onClick={handleGuardarCambios}
      >
        Guardar cambios
      </Button>
    </div>
  )
}