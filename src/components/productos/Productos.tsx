import React from 'react'
import { useSelector } from 'react-redux'

import styles from './Productos.module.css'

import Grid from '@material-ui/core/Grid'
import ProductosGrid from './ProductosGrid'
import AdminTools from './admin-tools/AdminTools'
import CategoriaSelector from './categoria-selector/CategoriaSelector'
import UnloggedUserBox from './unlogged-user-box/UnloggedUserBox'

import { userState } from '../../userStateSlice'
import { errorIdIntoMessage } from '../../utils/errorFormater'

export default function Productos() {
  const { isLoggedIn, sessionErrorId, isAdmin, isMobileVersion } = useSelector(userState)

  return isLoggedIn ?
    (
      <Grid container spacing={0}>
        {
          isMobileVersion ? undefined :
          <Grid item xs={2}>
            <div className={styles.leftHandContainer}>
              <CategoriaSelector />
              {isAdmin ? <AdminTools /> : undefined}
            </div>
          </Grid>
        }
        <Grid item xs={isMobileVersion ? 12 : 10}>
          <ProductosGrid />
        </Grid>
      </Grid>
    )
    :
    <UnloggedUserBox message={errorIdIntoMessage({ errorId: sessionErrorId, customMessage: 'Por favor, inicie sesión' })} />
}