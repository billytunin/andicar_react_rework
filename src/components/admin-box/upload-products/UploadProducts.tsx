import React, { useState } from 'react'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../../validation-input/validationInputsSlice'

import NewProducto from '../../productos/producto/NewProducto'
import Spinner from '../../spinner/Spinner'
import axios from '../../../utils/axios'

import { someImagenLoading } from '../../productos/newProductosSlice'

import parentStyles from '../AdminBox.module.css'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

const VALIDATION_GROUP_NAME = 'newProductos'

const PRODUCTO_EMPTY_BODY: Producto = {
  id: 0,
  imagen: '',
  codigo: '',
  categoriaId: 1,
  ancho: 0,
  alto: 0,
  largo: 0,
  archivado: false,
  en_oferta: false
}

export default function UploadProducts() {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [isLoading, setIsLoading] = useState(false)
  const [newProducts, setNewProducts] = useState<Array<Producto>>([])
  const [unsavedID, setUnsavedID] = useState(0)

  const newProductosHaveErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))
  const isSomeImagenLoading = useSelector(someImagenLoading)

  const agregarProducto = () => {
    let newArray = cloneDeep(newProducts)
    const newID = unsavedID + 1
    newArray.push(
      {
        ...PRODUCTO_EMPTY_BODY,
        id: newID
      }
    )
    setNewProducts(newArray)
    setUnsavedID(newID)
  }

  const resetState = () => {
    setNewProducts([])
    setUnsavedID(0)
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
  }

  const removerNewProducto = (id: number) => {
    let currentArray = cloneDeep(newProducts)
    const foundNewProductoIndex = currentArray.findIndex(newProductoObj => newProductoObj.id === id)

    currentArray.splice(foundNewProductoIndex, 1)
    setNewProducts(currentArray)
  }

  const modificarNewProducto = ({ field, value, id }: ModificarNewProductoArguments) => {
    let currentArray = cloneDeep(newProducts)
    const foundNewProductoIndex = currentArray.findIndex(newProductoObj => newProductoObj.id === id)
    // TODO: Cambiar esto cuando cambie "archivado" por "activo"
    const newValue = field === 'archivado' ? !value : value
    // @ts-ignore
    currentArray[foundNewProductoIndex][field] = newValue
    setNewProducts(currentArray)
  }

  const formIsInvalid = () => {
    let invalidFields = false
    let unsetImagen = false

    // Check that all fields are valid
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (newProductosHaveErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
      invalidFields = true
    }
    
    // Check that all products have imagen set
    unsetImagen = newProducts.some(newProductObj => !newProductObj.imagen)
    if (unsetImagen) {
      enqueueSnackbar(
        'Ha faltado cargarle imagen a algun producto',
        { variant: 'error' }
      )
    }

    return invalidFields || unsetImagen
  }

  const cargar = async () => {
    if (formIsInvalid()) {
      return
    }

    setIsLoading(true)
    try {
      await axios.post('/auth/crearProductos', { productos: newProducts })
      enqueueSnackbar(
        'Productos cargados con éxito',
        { variant: 'success' }
      )
      resetState()
    } catch(error) {
      enqueueSnackbar(
        'Hubo un problema al intentar cargar los productos',
        { variant: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {
        isLoading ?
          <Spinner />
          :
          <div className={`${parentStyles.box} ${parentStyles.uploadProductsBox}`}>
            <Button
              variant='outlined'
              className='smallMarginRight'
              color='primary'
              startIcon={<AddIcon />}
              onClick={agregarProducto}
              disabled={isSomeImagenLoading}
            >
              Agregar
            </Button>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadIcon />}
              disabled={!newProducts.length || isSomeImagenLoading}
              onClick={cargar}
            >
              Cargar
            </Button>
            <Grid container spacing={0}>
              {newProducts.map(newProduct =>
                <Grid item xs key={newProduct.id}>
                  <NewProducto
                    producto={newProduct}
                    validationGroupName={VALIDATION_GROUP_NAME}
                    modificarNewProducto={modificarNewProducto}
                    removerNewProducto={removerNewProducto}
                  />
                </Grid>
              )}
            </Grid>
          </div>
      }
    </div>
  )
}