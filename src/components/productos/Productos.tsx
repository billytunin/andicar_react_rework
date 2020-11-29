import React from 'react'
import { useSelector } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import ProductosGrid from './ProductosGrid'
import AdminTools from './admin-tools/AdminTools'
import CategoriaSelector from './CategoriaSelector'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button'

import { userState } from '../../userStateSlice'
import { errorIdIntoMessage } from '../../utils/errorFormater'

export default function Productos() {
  const { isLoggedIn, sessionErrorId, isAdmin } = useSelector(userState)

  return isLoggedIn ?
    (
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <CategoriaSelector />
          {isAdmin ? <AdminTools /> : undefined}
        </Grid>
        <Grid item xs={10}>
          <ProductosGrid />
        </Grid>
      </Grid>
    )
    :
    (
      <div>
        <p>
          {errorIdIntoMessage({ errorId: sessionErrorId, customMessage: 'Por favor, inicie sesión' })}
          <NavLink to="/session">
            <Button variant="contained" color='primary'>
              INICIAR SESIÓN
            </Button>
          </NavLink>
        </p>
      </div>
    )
}