import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userState, userStateLogout } from '../../userStateSlice'
import { resetState } from '../productos/productosSlice'

import Button from '@material-ui/core/Button'

export default function CurrentSessionBox() {
  const dispatch = useDispatch()
  const { isAdmin } = useSelector(userState)

  const logout = () => {
    dispatch(resetState())
    dispatch(userStateLogout())
  }

  return (
    <div>
      <p>Sesión iniciada como {isAdmin ? 'administrador' : 'cliente'}</p>
      <Button
        color="primary"
        variant="contained"
        onClick={logout}
      >
        Cerrar sesión
      </Button>
    </div>
  )
}