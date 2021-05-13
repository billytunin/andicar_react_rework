import React from 'react'

import {
  createStyles,
  withStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import { blue } from '@material-ui/core/colors'

interface CategoriaSelectorButtonProps {
  isActive: boolean
  onClick: () => void
  children: JSX.Element | string
}

const CustomButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[600]),
    width: '93%',
    backgroundColor: blue[600],
    borderRadius: 15,
    '&:hover': {
      backgroundColor: blue[300]
    },
    '&.is-active': {
      backgroundColor: blue[800]
    }
  }
}))(Button)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(0.4),
    }
  })
)

export default function CategoriaSelectorButton(props: CategoriaSelectorButtonProps) {
  const classes = useStyles()

  return (
    <CustomButton
      variant="contained"
      className={`${classes.margin} ${props.isActive ? 'is-active' : ''}`}
      onClick={props.onClick}
    >
      {props.children}
    </CustomButton>
  )
}