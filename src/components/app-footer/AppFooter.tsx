import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { getIsMobileVersion } from '../../userStateSlice'

import styles from './AppFooter.module.css'

import AndicarSpan from '../andicar-span/AndicarSpan'
import Grid from '@material-ui/core/Grid'

export default function AppFooter() {
  const isMobileVersion = useSelector(getIsMobileVersion)
  const text = isMobileVersion ? 'Sitio web bajo derechos de autor' : 'Diseño y desarrollo del sitio web bajo derechos de autor'
  return (
    <Grid container alignItems='flex-end' className={styles.grid}>
      <Grid item xs>
        <div className={styles.appFooter}>
          <div className={styles.spanContainer}>
            <span className={styles.mainSpan}>
              {text} © Copyright {moment().format('YYYY')} <AndicarSpan />
            </span>
          </div>
        </div>
      </Grid>
    </Grid>
  )
}