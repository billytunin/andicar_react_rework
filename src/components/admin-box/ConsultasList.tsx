import React, { useState, useEffect } from 'react'
import request from '../../utils/request'
import Spinner from '../spinner/Spinner'
import ConsultaBox from './ConsultaBox'
import PaginadorComponent from '../paginador/PaginadorComponent'
import styles from './ConsultasList.module.css'

import Grid from '@material-ui/core/Grid'

export default function ConsultasList() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTotal, setIsLoadingTotal] = useState(false)
  const [errorText, setErrorText] = useState('')
  const [getTotalError, setGetTotalError] = useState(false)
  const [consultas, setConsultas] = useState<Array<Consulta>>([])

  const [pagina, setPagina] = useState(1)
  const [paginado, setPaginado] = useState(12)
  const [currentTotal, setCurrentTotal] = useState(0)

  useEffect(() => {
    const getConsultas = async () => {
      setIsLoading(true)
      const start = (pagina - 1) * paginado
      try {
        const resp: GetConsultasBackendResponse = await request.get(`/auth/getConsultas?start=${start}&count=${paginado}`)
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
  }, [pagina, paginado])

  useEffect(() => {
    const getTotalConsultas = async () => {
      setIsLoadingTotal(true)
      try {
        const resp: GetTotalConsultasBackendResponse = await request.get(`/auth/getTotalConsultas`)
        setCurrentTotal(resp.data)
      } catch (error) {
        setGetTotalError(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotalConsultas()
  }, [])

  const handlePageChange = (pageNumber: number) => {
    setPagina(pageNumber)
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    setPagina(1)
    setPaginado(paginadoNumber)
  }

  if (isLoading) {
    return <Spinner />
  }
  if (errorText) {
    return <span>{errorText}</span>
  }
  return (
    <div>
      <div>
        {
          isLoadingTotal || getTotalError ?
            <div></div> :
            <PaginadorComponent
              currentPagina={pagina}
              currentTotal={currentTotal}
              paginado={paginado}
              paginadorConfigModalText='¿Cuantas consultas por página desea ver?'
              handlePageChange={handlePageChange}
              handlePaginadoChange={handlePaginadoChange}
            />
        }
      </div>
      <div className={styles.consultasContainer}>
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
    </div>
  )
}