import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { setSearchFilter } from '../productosSlice'

import AndicarModal from '../../andicar-modal/AndicarModal'

import styles from './BuscadorDeProductos.module.css'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Chip from '@material-ui/core/Chip'
import Alert from '@material-ui/lab/Alert'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AddIcon from '@material-ui/icons/Add'

export default function BuscadorDeProductosModal(props: BuscadorDeProductosModalProps) {
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
      setCodigoToAdd('')
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
    <div className={styles.modalContainer}>
      <IconButton
        className={`${styles.moreIcon} ${styles.smallPaddingIcon}`}
        aria-label="buscador-de-productos-modal"
        onClick={handleOpen}
        disabled={props.isDisabled}
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
        <div className={styles.addChipContainer}>
          <TextField
            onChange={(event) => setCodigoToAdd(event.target.value)}
            onKeyPress={handleInputKeyPress}
            value={codigoToAdd}
            InputProps={{
              endAdornment:
                <InputAdornment position='end'>
                  <IconButton
                    disabled={!codigoToAdd}
                    onClick={addCodigo}
                    className={styles.smallPaddingIcon}
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
            }}
          />
        </div>
        <div className={styles.chipContainer}>
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
          color='primary'
          variant='contained'
        >
          Buscar
        </Button>
      </AndicarModal>
    </div>
  )
}