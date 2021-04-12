import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './CurrentSessionBox.module.css'

import { userState, userStateLogout } from '../../userStateSlice'
import { resetState } from '../productos/productosSlice'

import AndicarModal from '../andicar-modal/AndicarModal'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export default function CurrentSessionBox() {
  const dispatch = useDispatch()
  const { isAdmin, isMobileVersion } = useSelector(userState)
  const [logoutWarnOpen, setLogoutWarnOpen] = useState(false)

  const logout = () => {
    dispatch(resetState())
    dispatch(userStateLogout())
  }

  const handleCloseModal = () => {
    setLogoutWarnOpen(false)
  }

  return (
    <div className={styles.container}>
      <span>
        Sesión iniciada como:
        {isMobileVersion ? <br /> : undefined}
        <span className={styles.userType}>
          {isAdmin ? 'administrador' : 'cliente'}
        </span>
      </span>
      <IconButton
        onClick={() => setLogoutWarnOpen(true)}
      >
        <ExitToAppIcon />
      </IconButton>
      <AndicarModal isOpen={logoutWarnOpen} handleClose={handleCloseModal}>
        <span>¿Está seguro que desea cerrar su sesión?</span>
        <div className={styles.smallMarginTop}>
          <Button
            onClick={logout}
            variant='contained'
            color='primary'
            className={styles.smallMarginRight}
          >
            Aceptar
          </Button>
          <Button onClick={() => setLogoutWarnOpen(false)} variant='outlined'>Cancelar</Button>
        </div>
      </AndicarModal>
    </div>
  )
}