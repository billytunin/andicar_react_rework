import React, { useState, useEffect } from 'react'
import request from '../../utils/request'
import Spinner from '../spinner/Spinner'
import ConsultaBox from './ConsultaBox'

import Grid from '@material-ui/core/Grid'

export default function ConsultasList() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [consultas, setConsultas] = useState<Array<Consulta>>([])

  useEffect(() => {
    const getConsultas = async () => {
      setIsLoading(true)
      try {
        const resp: GetConsultasBackendResponse = await request.get('/auth/getConsultas')
        setConsultas(resp.data)
      } catch(error) {
        setErrorText(
          error.error && error.error.data ?
            error.error.data.message :
            'Ocurrió un error al intentar obtener las consultas. Por favor intente nuevamente'
        )
      } finally {
        setIsLoading(false)
      }
    }

    getConsultas()
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  if (errorText) {
    return <span>{errorText}</span>
  }
  return (
    <div>
      <Grid container spacing={0}>
        {
          consultas.map(
            consultaObj =>
              <Grid key={consultaObj.id} item xs={4}>
                <ConsultaBox {...consultaObj} />
              </Grid>
          )
        }
      </Grid>
    </div>
  )
}