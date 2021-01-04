import React, { useState } from 'react'

import styles from './UploadImageButton.module.css'

import IconButton from '@material-ui/core/IconButton'
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import EditIcon from '@material-ui/icons/Edit'

interface UploadImageButtonProps {
  productID: number
  agregarImagen: (file: File) => void
}

export default function UploadImageButton(props: UploadImageButtonProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0])
      props.agregarImagen(event.target.files[0])
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