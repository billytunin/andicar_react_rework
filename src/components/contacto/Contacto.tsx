import React from 'react';

import { ContactoBox } from './ContactoBox'

import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import styles from './Contacto.module.css'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    }
  }),
);

export function Contacto() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={styles.contactoContainer}>
        <Grid item xs={6}>
          <ContactoBox />
        </Grid>
        <Grid item xs={6}>
        <ContactoBox id="formulario" />
        </Grid>
      </Grid>
    </div>
  )
}