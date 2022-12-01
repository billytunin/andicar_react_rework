import React from 'react'
import { useSelector } from 'react-redux'

import { userState } from '../../userStateSlice'

import styles from './ProductConfigPorUsuario.module.css'

import Grid from '@material-ui/core/Grid'
import AccountCircle from '@material-ui/icons/AccountCircle'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'

// productConfigPorUsuarioTableHeader

export default function UsersConfigTableHeader() {
  const { isMobileVersion } = useSelector(userState)

  return (
    <Grid container spacing={0} className={styles.productConfigPorUsuarioTableHeader}>
      <Grid item xs>
        {isMobileVersion ? <AccountCircle /> : 'Usuario'}
      </Grid>
      <Grid item xs>
      {isMobileVersion ? <span><AttachMoneyIcon />+/-</span> : 'Precio offset'}
      </Grid>
      <Grid item xs>
        {isMobileVersion ? <span><VisibilityOffIcon /></span> : 'Escondido'}
      </Grid>
    </Grid>
  )
}