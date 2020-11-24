import React from 'react';
import Grid from '@material-ui/core/Grid';

export default function InformacionDeContacto() {
  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <span>Telefono</span>
        </Grid>
        <Grid item xs={6}>
          <span className='rightAligned'>(011)4583-3740</span>
        </Grid>
        <Grid item xs={6}>
          <span>Fax</span>
        </Grid>
        <Grid item xs={6}>
          <span className='rightAligned'>(011)4583-3740</span>
        </Grid>
        <Grid item xs={6}>
          <span>E-mail</span>
        </Grid>
        <Grid item xs={6}>
          <span className='rightAligned'>andicar@fibertel.com.ar</span>
        </Grid>
      </Grid>
    </div>
  )
}