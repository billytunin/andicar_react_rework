import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from './FancyTitle.module.css'

export default function FancyTitle() {
  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item xs={2}>
          <div className={`${styles.fancyLines} ${styles.left}`}></div>
        </Grid>
        <Grid item xs={8}>
          <div className={styles.text}>Importadora <br />de Juguetes</div>
        </Grid>
        <Grid item xs={2}>
          <div className={`${styles.fancyLines} ${styles.right}`}></div>
        </Grid>
      </Grid>
    </div>
  )
}