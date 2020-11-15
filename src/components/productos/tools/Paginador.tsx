import React from 'react'

import { createStyles, makeStyles } from '@material-ui/core/styles'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      '& .MuiButton-root, .MuiIconButton-root': {
        color: 'white'
      }
    }
  })
)

export default function Paginador() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <IconButton aria-label="delete">
        <ArrowBackIcon />
      </IconButton>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
      <Button>4</Button>
      <IconButton aria-label="delete">
        <ArrowForwardIcon />
      </IconButton>
    </div>
  )
}