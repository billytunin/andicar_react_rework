import React, { useState } from 'react'
import { cloneDeep } from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

import NewProducto from '../productos/producto/NewProducto'
import Spinner from '../spinner/Spinner'
import request from '../../utils/request'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

interface ImageToUpload {
  file: File
  productID: number
}

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
  const [newImages, setNewImages] = useState<Array<ImageToUpload>>([])
  const [fakeID, setFakeID] = useState(0)

  const newProductosHaveErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const agregarProducto = () => {
    let newArray = cloneDeep(newProducts)
    const newID = fakeID + 1
    newArray.push(
      {
        ...PRODUCTO_EMPTY_BODY,
        id: newID
      }
    )
    setNewProducts(newArray)
    setFakeID(newID)
  }

  const resetState = () => {
    setNewProducts([])
    setNewImages([])
    setFakeID(0)
  }

  const agregarImagen = (file: File, productID: number) => {
    let newArray = cloneDeep(newImages)
    const newImagenIndex = newArray.findIndex(newImagenObj => newImagenObj.productID === productID)
    if (newImagenIndex !== -1) {
      newArray[newImagenIndex].file = file
    } else {
      newArray.push({
        productID,
        file
      })
    }

    setNewImages(newArray)
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

  const cargar = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (newProductosHaveErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
      return
    }

    setIsLoading(true)
    try {
      await request.post('/auth/crearProductos', { productos: newProducts })
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
          <div>
            <Button
              variant='contained'
              color='primary'
              startIcon={<AddIcon />}
              onClick={agregarProducto}
            >
              Agregar
            </Button>
            <Button
              variant='contained'
              color='primary'
              startIcon={<CloudUploadIcon />}
              disabled={!newProducts.length}
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
                    agregarImagen={agregarImagen}
                  />
                </Grid>
              )}
            </Grid>
          </div>
      }
    </div>
  )
}