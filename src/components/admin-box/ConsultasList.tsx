import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import axios from '../../utils/axios'
import { DEFAULT_PAGINADO } from '../../utils/constants'

import { getIsMobileVersion } from '../../userStateSlice'

import Spinner from '../spinner/Spinner'
import ConsultaBox from './ConsultaBox'
import PaginadorComponent from '../paginador/PaginadorComponent'
import styles from './ConsultasList.module.css'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

export default function ConsultasList() {
  const { enqueueSnackbar } = useSnackbar()

  const isMobileVersion = useSelector(getIsMobileVersion)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingActionOnConsultas, setIsLoadingActionOnConsultas] = useState(false)

  const [errorText, setErrorText] = useState('')

  const [consultas, setConsultas] = useState<Array<Consulta>>([])
  const [selectedConsultas, setSelectedConsultas] = useState<Array<number>>([])

  const [pagina, setPagina] = useState(1)
  const [paginado, setPaginado] = useState(DEFAULT_PAGINADO)
  const [currentTotal, setCurrentTotal] = useState(0)

  const [showActiveConsultas, setShowActiveConsultas] = useState(true)

  useEffect(() => {
    const getConsultas = async () => {
      setIsLoading(true)
      const start = (pagina - 1) * paginado
      try {
        const resp: GetConsultasBackendResponse = await axios.get(
          `/auth/getConsultas?start=${start}&count=${paginado}${showActiveConsultas ? '' : '&archivadas=true'}`
        )
        setConsultas(resp.data.items)
        setCurrentTotal(resp.data.total)
      } catch(error) {
        const {
          message = 'Ocurrió un error al intentar obtener las consultas. Por favor intente nuevamente'
        } = axios.getErrorBody(error)
        setErrorText(message)
      } finally {
        setIsLoading(false)
      }
    }

    if (isLoadingActionOnConsultas) {
      return
    }
    getConsultas()
  }, [pagina, paginado, showActiveConsultas, isLoadingActionOnConsultas])

  const handlePageChange = (pageNumber: number) => {
    setPagina(pageNumber)
  }

  const handlePaginadoChange = (paginadoNumber: number) => {
    setPagina(1)
    setPaginado(paginadoNumber)
  }

  const addConsultaToSelected = (consultaId: number) => {
    setSelectedConsultas([...selectedConsultas, consultaId])
  }

  const removeConsultaFromSelected = (consultaId: number) => {
    let currentArray = [...selectedConsultas]
    const consultaIdIndex = currentArray.findIndex(consultaIdFromArray => consultaIdFromArray === consultaId)
    currentArray.splice(consultaIdIndex, 1)
    setSelectedConsultas(currentArray)
  }

  const actionOnConsultas = async () => {
    setIsLoadingActionOnConsultas(true)
    try {
      if (showActiveConsultas) {
        await axios.post('/auth/archivarConsultas', { idsArray: selectedConsultas })
      } else {
        await axios.delete('/auth/borrarConsultas', { idsArray: selectedConsultas })
      }
      enqueueSnackbar(
        `Consultas ${showActiveConsultas ? 'archivadas' : 'eliminadas'} con éxito`,
        { variant: 'success' }
      )
    } catch(error) {
      console.log('ConsultasLista.tsx error at actionOnConsultas:')
      console.log(error)
      enqueueSnackbar(
        `Hubo un problema al intentar ${showActiveConsultas ? 'archivar' : 'eliminar'} las consultas`,
        { variant: 'error' }
      )
    } finally {
      setIsLoadingActionOnConsultas(false)
      setSelectedConsultas([])
    }
  }

  const resetPaginacion = () => {
    setPagina(1)
    setPaginado(DEFAULT_PAGINADO)
  }

  const resetState = () => {
    resetPaginacion()
    setSelectedConsultas([])
  }

  const changeShowActiveConsultas = () => {
    resetState()
    setShowActiveConsultas(!showActiveConsultas)
  }

  if (isLoading || isLoadingActionOnConsultas) {
    return <Spinner />
  }
  if (errorText) {
    return <span>{errorText}</span>
  }
  return (
    <div>
      <div className='toolbarBackground'>
        <Grid container spacing={0}>
          <Grid item xs={isMobileVersion ? 12 : 4}>
            <PaginadorComponent
              currentPagina={pagina}
              currentTotal={currentTotal}
              paginado={paginado}
              paddingTop={16}
              paginadorConfigModalText='¿Cuantas consultas por página desea ver?'
              handlePageChange={handlePageChange}
              handlePaginadoChange={handlePaginadoChange}
            />
          </Grid>
          <Grid item xs={isMobileVersion ? 12 : 4}>
            <div className={styles.estasViendoContainer}>
              <span className={styles.estasViendo}>
                Estás viendo
              </span>
              <div>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={changeShowActiveConsultas}
                >
                  {showActiveConsultas ? 'ACTIVAS' : 'ARCHIVADAS'}
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={isMobileVersion ? 12 : 4}>
            <div className={`displayInLine rightAligned ${styles.toolbarActionButton}`}>
              <Button
                variant='contained'
                color={showActiveConsultas ? 'primary' : 'secondary'}
                onClick={actionOnConsultas}
                disabled={selectedConsultas.length === 0}
              >
                {`${showActiveConsultas ? 'Archivar' : 'Eliminar'} consultas seleccionadas`}
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className={styles.consultasContainer}>
        <Grid container spacing={0}>
          {
            consultas.map(
              consultaObj =>
                <Grid key={consultaObj.id} item xs={isMobileVersion ? 12 : 4}>
                  <ConsultaBox
                    {...consultaObj}
                    showActiveConsultasMode={showActiveConsultas}
                    addConsultaToSelected={addConsultaToSelected}
                    removeConsultaFromSelected={removeConsultaFromSelected}
                  />
                </Grid>
            )
          }
        </Grid>
      </div>
    </div>
  )
}