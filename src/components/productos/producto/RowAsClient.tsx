import React from 'react'

import Grid from '@material-ui/core/Grid'
import styles from './Producto.module.css'

interface RowAsClientProps {
  field: string
  value: string | number
  isPriceField?: boolean
}

export default function RowAsClient(props: RowAsClientProps) {
  return (
    <div className={styles.rowAsClient}>
      <Grid container spacing={0}>
        <Grid item xs>
          <span>{props.field}</span>
        </Grid>
        <Grid item xs>
          <span className='rightAligned'>{props.isPriceField ? '$' : ''}{props.value}</span>
        </Grid>
      </Grid>
    </div>
  )
}