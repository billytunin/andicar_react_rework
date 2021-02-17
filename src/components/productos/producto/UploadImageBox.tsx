import React, { useState } from 'react'
import { useSnackbar } from 'notistack'

import styles from './UploadImageBox.module.css'

import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import EditIcon from '@material-ui/icons/Edit'

export default function UploadImageBox(props: UploadImageBoxProps) {
  const { enqueueSnackbar } = useSnackbar()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      if (props.newImages.find(newImage => newImage.file.name === file.name)) {
        enqueueSnackbar(
          'No está permitido subir fotos (archivos) con el mismo nombre',
          { variant: 'error' }
        )
        return
      }

      setSelectedFile(file)
      props.agregarImagen(file)
    }
  }

  return (
    <div>
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