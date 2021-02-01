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
import axios from '../../utils/axios'

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
  const [newImages, setNewImages] = useState<Array<ImageToUpload>>([])
  const [unsavedID, setUnsavedID] = useState(0)

  const newProductosHaveErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

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
    setNewImages([])
    setUnsavedID(0)
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

  const removerNewProducto = (id: number) => {
    let currentArray = cloneDeep(newProducts)
    let currentImagesArray = cloneDeep(newImages)
    const foundNewProductoIndex = currentArray.findIndex(newProductoObj => newProductoObj.id === id)
    const foundNewImageIndex = currentImagesArray.findIndex(newImage => newImage.productID === id)

    currentArray.splice(foundNewProductoIndex, 1)
    if (foundNewImageIndex !== -1) {
      currentImagesArray.splice(foundNewImageIndex, 1)
    }

    setNewImages(currentImagesArray)
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

  const mapUploadedImagesToNewProducts = (uploadedImages: Array<UploadedImage>) => {
    let newArray: Array<Producto> = []
    uploadedImages.forEach(uploadedImage => {
      const foundImage = newImages.find(newImage => newImage.file.name === uploadedImage.originalName)
      let foundNewProduct = newProducts.find(newProduct => newProduct.id === foundImage?.productID)
      if (foundNewProduct) {
        foundNewProduct.imagen = uploadedImage.newName
        newArray.push(foundNewProduct)
      } else {
        console.warn('mapUploadedImagesToNewProducts warning: no matchean las imagenes en el estado actual de la UI con las imagenes cargadas que volvieron del BE')
      }
    })

    setNewProducts(newArray)
  }

  const cargar = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (newProductosHaveErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      newImages.forEach(newImage => {
        formData.append('photos', newImage.file)
      })
      const uploadImagesResp: UploadImagesResponse = await axios.post('/auth/uploadImages', formData)
      mapUploadedImagesToNewProducts(uploadImagesResp.data)
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
                    newImages={newImages}
                    modificarNewProducto={modificarNewProducto}
                    removerNewProducto={removerNewProducto}
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