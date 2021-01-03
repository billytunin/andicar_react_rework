import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'
import { cloneDeep } from 'lodash'

import request from '../../utils/request'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'
import { getCurrentCategoriasFromState, setCategorias } from '../productos/productosSlice'
import CategoriaInput from './CategoriaInput'
import CategoriasToAddRows from './CategoriasToAddRows'

import Spinner from '../spinner/Spinner'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
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

  const getCategoriaInputValue = (categoriaId: number) => {
    let value = ''
    if ( isModifiedCategoria(categoriaId) ) {
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
      let errorFlag = false
      setIsLoading(true)
      if (categoriasToAdd.length) {
        try {
          await request.post('/auth/crearCategorias', {
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
          await request.post('/auth/modificarCategorias', {
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
        const getCategoriasResp: CategoriasBackendResponse = await request.get('/auth/getCategorias')
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
    <div>
      {categorias.map(categoriaObj =>
        <CategoriaInput
          key={categoriaObj.id}
          categoriaId={categoriaObj.id}
          handleOnChange={handleOnChange}
          getCategoriaInputValue={getCategoriaInputValue}
          VALIDATION_GROUP_NAME={VALIDATION_GROUP_NAME}
        />
      )}
      <CategoriasToAddRows
        categoriasToAdd={categoriasToAdd}
        setCategoriasToAdd={(newArray) => setCategoriasToAdd(newArray)}
      />
      <ButtonGroup orientation='vertical'>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={agregarCategoria}
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
      </ButtonGroup>
    </div>
  )
}