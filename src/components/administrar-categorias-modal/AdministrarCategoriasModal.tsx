import React, { useState } from 'react'

import AndicarModal from '../andicar-modal/AndicarModal'
import AdministrarCategoriasModalBody from './ModalBody'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

export default function AdministrarCategoriasModal() {
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
        startIcon={<EditIcon />}
        onClick={handleOpen}
      >
        Categorias
      </Button>
      <AndicarModal
        isOpen={open}
        handleClose={handleClose}
        width='60vw'
      >
        <AdministrarCategoriasModalBody closeModal={handleClose} />
      </AndicarModal>
    </div>
  )
}