import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);

export function Productos() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <span>PRODUCTOS</span>
        </Grid>
        <Grid item xs={3}>
          <Button>Categoria 1</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>Categoria 2</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>Categoria 3</Button>
        </Grid>
        <Grid item xs={3}>
          <Button>Categoria 4</Button>
        </Grid>
      </Grid>
    </div>
  )
}