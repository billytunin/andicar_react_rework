import React from 'react'
import Grid from '@material-ui/core/Grid'

import styles from './AdminTools.module.css'

export default function AdminToolsLeyenda() {
  return (
    <div>
      <p>Leyenda:</p>
      <Grid container spacing={0} alignItems='center' justify='center'>
        <Grid item xs={1}>
          <div className={`${styles.leyendaBox} nonArchivadoBackgroundColor`}></div>
        </Grid>
        <Grid item xs={11}>
          <div>
            <span className={styles.leyendaText}>Activo</span>
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className={`${styles.leyendaBox} archivadoBackgroundColor`}></div>
        </Grid>
        <Grid item xs={11}>
          <div>
            <span className={styles.leyendaText}>Archivado</span>
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className={`${styles.leyendaBox} isModifiedBackgroundColor`}></div>
        </Grid>
        <Grid item xs={11}>
          <div>
            <span className={styles.leyendaText}>Modificado</span>
          </div>
        </Grid>
        <Grid item xs={1}>
          <div className={`${styles.leyendaBox} isMarkedAsDeleteBackgroundColor`}></div>
        </Grid>
        <Grid item xs={11}>
          <div>
            <span className={styles.leyendaText}>Marcado para eliminar</span>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}