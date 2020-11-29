import React from 'react'
import Grid from '@material-ui/core/Grid'

interface RowAsClientProps {
  field: string
  value: string | number
}

export default function RowAsClient(props: RowAsClientProps) {
  return (
    <Grid container spacing={0}>
      <Grid item xs>
        <span>{props.field}</span>
      </Grid>
      <Grid item xs>
        <span className='rightAligned'>{props.value}</span>
      </Grid>
    </Grid>
  )
}