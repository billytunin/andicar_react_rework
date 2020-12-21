import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSearchFilter } from '../productosSlice'

import AndicarModal from '../../andicar-modal/AndicarModal'

import styles from './BuscadorDeProductosModal.module.css'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Alert from '@material-ui/lab/Alert'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default function BuscadorDeProductosModal() {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [codigosArray, setCodigosArray] = useState<Array<string>>([])
  const [codigoToAdd, setCodigoToAdd] = useState('')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addCodigo = () => {
    const foundCodigo = codigosArray.find(codigo => codigo === codigoToAdd)
    if (foundCodigo || codigoToAdd === '') {
      return
    } else {
      setCodigosArray([...codigosArray, codigoToAdd])
    }
  }

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      addCodigo()
    }
  }

  const handleDeleteChip = (index: number) => {
    let newArray = [...codigosArray]
    newArray.splice(index, 1)
    setCodigosArray([...newArray])
  }

  const handleBuscarClick = () => {
    dispatch(setSearchFilter(codigosArray.join(',')))
    setCodigosArray([])
    handleClose()
  }

  return (
    <div className={styles.container}>
      <IconButton
        aria-label="buscador-de-productos-modal"
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <AndicarModal
        isOpen={open}
        handleClose={handleClose}
        width='33vw'
      >
        <Alert severity="info">
          ¿Desea buscar multiples productos por código? Ingrese los códigos de a uno y presione "Buscar"
        </Alert>
        <div>
          <TextField
            onChange={(event) => setCodigoToAdd(event.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <Button disabled={!codigoToAdd} onClick={addCodigo}>Agregar</Button>
        </div>
        <div>
          {
            codigosArray.map((codigo, index) =>
              <Chip
                key={index}
                label={codigo}
                onDelete={() => handleDeleteChip(index)}
                className={styles.chip}
              />
            )
          }
        </div>
        <Button
          disabled={!codigosArray.length}
          onClick={handleBuscarClick}
        >
          Buscar
        </Button>
      </AndicarModal>
    </div>
  )
}