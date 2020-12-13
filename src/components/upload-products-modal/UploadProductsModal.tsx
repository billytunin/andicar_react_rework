import React, { useState } from 'react'

import AndicarModal from '../andicar-modal/AndicarModal'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

export default function UploadProductsModal() {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Agregar productos
      </Button>
      <AndicarModal
        isOpen={open}
        handleClose={handleClose}
      >
        <p>WIP</p>
      </AndicarModal>
    </div>
  )
}