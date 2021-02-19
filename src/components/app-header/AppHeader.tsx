import React from 'react'
import { useSelector } from 'react-redux'

import { getIsMobileVersion } from '../../userStateSlice'

import HeaderNavLink from './HeaderNavLink'
import styles from './AppHeader.module.css'

import Grid from '@material-ui/core/Grid'

export default function AppHeader() {
  const isMobileVersion = useSelector(getIsMobileVersion)

  return (
    <div className={styles.headerContainer}>
      <Grid container>
        <Grid item xs></Grid>
        <Grid item xs={isMobileVersion ? 12 : 7}>
          <Grid container>
            <Grid item xs={3}>
              <HeaderNavLink text='INICIO' path='/' shouldBeExactPath={true} />
            </Grid>
            <Grid item xs={3}>
              <HeaderNavLink text='PRODUCTOS' path='/productos' />
            </Grid>
            <Grid item xs={3}>
              <HeaderNavLink text='CONTACTO' path='/contacto' />
            </Grid>
            <Grid item xs={3}>
              <HeaderNavLink text='SESIÓN' path='/session' />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  )
}