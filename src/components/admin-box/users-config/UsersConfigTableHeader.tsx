import React from 'react'
import { useSelector } from 'react-redux'

import { userState } from '../../../userStateSlice'

import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LockIcon from '@material-ui/icons/Lock'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

export default function UsersConfigTableHeader() {
  const { isMobileVersion } = useSelector(userState)

  return (
    <Grid container spacing={0}>
      <Grid item xs={3}>
        {isMobileVersion ? <AccountCircle /> : 'Usuario'}
      </Grid>
      <Grid item xs={3}>
      {isMobileVersion ? <LockIcon /> : 'Contraseña'}
      </Grid>
      <Grid item xs>
        {isMobileVersion ? <span><AttachMoneyIcon /><VisibilityOffIcon /></span> : 'Precios visibles'}
      </Grid>
      <Grid item xs>
      {isMobileVersion ? 'x1' : 'Modificador de precio'}
      </Grid>
      <Grid item xs>
      {isMobileVersion ? <DeleteIcon /> : 'Eliminar'}
      </Grid>
    </Grid>
  )
}