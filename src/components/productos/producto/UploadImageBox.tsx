import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSnackbar } from 'notistack'

import { PHOTOS_URL } from '../../../utils/constants'

import styles from './UploadImageBox.module.css'

import { setSomeImagenLoading } from '../newProductosSlice'

import axios from '../../../utils/axios'

import Spinner from '../../spinner/Spinner'
import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import EditIcon from '@material-ui/icons/Edit'

export default function UploadImageBox(props: UploadImageBoxProps) {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imagenLoading, setImagenLoading] = useState(false)

  const fileChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      const formData = new FormData()
      formData.append('photos', file)
      setImagenLoading(true)
      dispatch(setSomeImagenLoading(true))
      try {
        const uploadImagesResp: UploadImagesResponse = await axios.post('/auth/uploadImages', formData)
        setSelectedFile(file)
        props.emitSavedImage(uploadImagesResp.data[0].newName)
      } catch(error) {
        enqueueSnackbar(
          'Hubo un error al intentar subir la foto',
          { variant: 'error' }
        )
      } finally {
        setImagenLoading(false)
        dispatch(setSomeImagenLoading(false))
      }
    }
  }

  if (imagenLoading) {
    return <Spinner />
  }

  return (
    <div>
      {
        props.productImagen ?
          <img src={PHOTOS_URL + props.productImagen} alt={`Nueva foto para el producto ${props.productID}`} />
          :
          null
      }
      <input
        accept='image/*'
        className={styles.hide}
        id={`icon-button-file-${props.productID}`}
        type='file'
        onChange={fileChanged}
      />
      {
        selectedFile ?
          <div>
            <span>Archivo seleccionado: {selectedFile.name}</span>
            <label htmlFor={`icon-button-file-${props.productID}`}>
              <IconButton
                color='primary'
                component='span'
                aria-label='add-imagen'
              >
                <EditIcon />
              </IconButton>
            </label>
          </div>
          :
          <label htmlFor={`icon-button-file-${props.productID}`}>
            <IconButton
              color='primary'
              component='span'
              aria-label='add-imagen'
            >
              <AddPhotoAlternateIcon />
            </IconButton>
          </label>
      }
    </div>
  )
}