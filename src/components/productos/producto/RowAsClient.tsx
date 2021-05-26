import React from 'react'
import { useSelector } from 'react-redux'

import { userState } from '../../../userStateSlice'

import Grid from '@material-ui/core/Grid'
import styles from './Producto.module.css'

interface RowAsClientProps {
  field: string
  value: string | number
  isPriceField?: boolean
}

export default function RowAsClient(props: RowAsClientProps) {
  const { priceModifier, priceVisibility } = useSelector(userState)

  if (props.isPriceField && !priceVisibility) {
    return <span></span>
  }

  const getPriceValue = (value: string | number) => {
    const parsed = typeof value === 'string' ? parseFloat(value) : value
    const parsedAndPriceModifierApplied = parsed * priceModifier
    const parsedToFixed = parsedAndPriceModifierApplied.toFixed(2)
    if (parsedToFixed.split('.')[1] === '00') {
      return parsedAndPriceModifierApplied
    } else {
      return parsedToFixed
    }
  }

  const parsedValue = props.isPriceField ? getPriceValue(props.value) : props.value

  return (
    <div className={styles.rowAsClient}>
      <Grid container spacing={0}>
        <Grid item xs>
          <span>{props.field}</span>
        </Grid>
        <Grid item xs>
          <span className='rightAligned'>{props.isPriceField ? '$' : ''}{parsedValue}</span>
        </Grid>
      </Grid>
    </div>
  )
}