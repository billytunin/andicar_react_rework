import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import request from '../../utils/request'
import { DEFAULT_PAGINADO } from '../../utils/constants'
import { openToast } from '../toast-alert/toastAlertSlice'

import Spinner from '../spinner/Spinner'
import ConsultaBox from './ConsultaBox'
import PaginadorComponent from '../paginador/PaginadorComponent'
import styles from './ConsultasList.module.css'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default function ConsultasList() {
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTotal, setIsLoadingTotal] = useState(false)

  const [errorText, setErrorText] = useState('')
  const [getTotalError, setGetTotalError] = useState(false)

  const [consultas, setConsultas] = useState<Array<Consulta>>([])
  const [consultasToArchivar, setConsultasToArchivar] = useState<Array<number>>([])

  const [pagina, setPagina] = useState(1)
  const [paginado, setPaginado] = useState(DEFAULT_PAGINADO)
  const [currentTotal, setCurrentTotal] = useState(0)

  const [showActiveConsultas, setShowActiveConsultas] = useState(true)

  useEffect(() => {
    const getConsultas = async () => {
      setIsLoading(true)
      const start = (pagina - 1) * paginado
      try {
        const resp: GetConsultasBackendResponse = await request.get(
          `/auth/getConsultas?start=${start}&count=${paginado}${showActiveConsultas ? '' : '&archivadas=true'}`
        )
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
  }, [pagina, paginado, showActiveConsultas])

  useEffect(() => {
    const getTotalConsultas = async () => {
      setIsLoadingTotal(true)
      try {
        const resp: GetTotalConsultasBackendResponse = await request.get(
          `/auth/getTotalConsultas${showActiveConsultas ? '' : '?archivadas=true'}`
        )
        setCurrentTotal(resp.data)
      } catch (error) {
        setGetTotalError(true)
      } finally {
        setIsLoadingTotal(false)
      }
    }

    getTotalConsultas()
  }, [showActiveConsultas])

  const handlePageChange = (pageNumber: number) => {
    setPagina(pageNumber)
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    setPagina(1)
    setPaginado(paginadoNumber)
  }

  const addConsultaToArchivar = (consultaId: number) => {
    setConsultasToArchivar([...consultasToArchivar, consultaId])
  }

  const removeConsultaToArchivar = (consultaId: number) => {
    let currentArray = [...consultasToArchivar]
    const consultaIdIndex = currentArray.findIndex(consultaIdFromArray => consultaIdFromArray === consultaId)
    currentArray.splice(consultaIdIndex, 1)
    setConsultasToArchivar(currentArray)
  }

  const archivarConsultas = async () => {
    setIsLoading(true)
    try {
      await request.post('/auth/archivarConsultas', { idsArray: consultasToArchivar })
      dispatch(openToast({ severity: 'success', text: 'Consultas archivadas con éxito' }))
    } catch(error) {
      console.log('ConsultasLista.tsx error at archivarConsultas:')
      console.log(error)
      dispatch(openToast({ severity: 'error', text: 'Hubo un problema al intentar archivar las consultas' }))
    } finally {
      setIsLoading(false)
    }
  }

  const resetPaginacion = () => {
    setPagina(1)
    setPaginado(DEFAULT_PAGINADO)
  }

  const resetState = () => {
    resetPaginacion()
    setConsultasToArchivar([])
  }

  const changeShowActiveConsultas = () => {
    resetState()
    setShowActiveConsultas(!showActiveConsultas)
  }

  if (isLoading) {
    return <Spinner />
  }
  if (errorText) {
    return <span>{errorText}</span>
  }
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={6}>
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
        </Grid>
        <Grid item xs={6}>
          <div className='displayInLine rightAligned'>
            <span>
              Estás viendo
            </span>
            <Button
              variant='contained'
              color='primary'
              onClick={changeShowActiveConsultas}
            >
              {showActiveConsultas ? 'ACTIVAS' : 'ARCHIVADAS'}
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={archivarConsultas}
              disabled={consultasToArchivar.length === 0}
            >
              Archivar consultas seleccionadas
            </Button>
          </div>
        </Grid>
      </Grid>
      <div className={styles.consultasContainer}>
        <Grid container spacing={0}>
          {
            consultas.map(
              consultaObj =>
                <Grid key={consultaObj.id} item xs={4}>
                  <ConsultaBox
                    {...consultaObj}
                    showActiveConsultasMode={showActiveConsultas}
                    addConsultaToArchivar={addConsultaToArchivar}
                    removeConsultaToArchivar={removeConsultaToArchivar}
                  />
                </Grid>
            )
          }
        </Grid>
      </div>
    </div>
  )
}