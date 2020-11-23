import React, { useState } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

import CredentialsConfig from './CredentialsConfig'
import ConsultasList from './ConsultasList'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: '1rem',
      padding: '1rem'
    },
    smallMarginBottom: {
      marginBottom: '1rem'
    }
  })
)

export default function AdminBox() {
  const classes = useStyles()
  const [expandedCredentialsConfig, setExpandedCredentialsConfig] = useState(false)
  const [expandedConsultasList, setConsultasList] = useState(false)

  return (
    <div className={classes.root}>
      <div className={classes.smallMarginBottom}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setExpandedCredentialsConfig(!expandedCredentialsConfig)}
          endIcon={expandedCredentialsConfig ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Configurar Credenciales
        </Button>
        {expandedCredentialsConfig ? <CredentialsConfig /> : undefined}
      </div>
      <div className={classes.smallMarginBottom}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setConsultasList(!expandedConsultasList)}
          endIcon={expandedConsultasList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          Ver Consultas
        </Button>
        {expandedConsultasList ? <ConsultasList /> : undefined}
      </div>
    </div>
  )
}