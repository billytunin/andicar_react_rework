import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'

interface InputActionButtonProps {
  disabled?: boolean
  moreLineHeight?: boolean
  onClick: () => void
  text: string
}

const useStyles = makeStyles(() =>
  createStyles({
    actionButton: {
      padding: '1px 7px 0 7px',
      margin: '0 1rem 0 0.25rem',
      minWidth: 0,
      verticalAlign: 'super'
    },
    moreLineHeight: {
      lineHeight: '1.95'
    }
  })
)

export default function InputActionButton(props: InputActionButtonProps) {
  const classes = useStyles()
  return (
    <Button
      disabled={props.disabled}
      onClick={props.onClick}
      variant='contained'
      color='primary'
      className={`${classes.actionButton} ${props.moreLineHeight ? classes.moreLineHeight : ''}`}
    >
      {props.text}
    </Button>
  )
}