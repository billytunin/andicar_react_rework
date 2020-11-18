import React, { useState } from 'react'

import request from '../../utils/request'

import { useSelector, useDispatch } from 'react-redux'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

import { openToast } from '../toast-alert/toastAlertSlice'

import styles from './Formulario.module.css'

import { ValidationInput } from '../validation-input/ValidationInput'
import Button from '@material-ui/core/Button'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'
import Spinner from '../spinner/Spinner'

const VALIDATION_GROUP_NAME = 'formularioContacto'

export default function Formulario() {
  const dispatch = useDispatch()
  const initialState = {
    nombreCompleto: '',
    email: '',
    telefono: '',
    consulta: ''
  }

  const [isLoading, setIsLoading] = useState(false)

  const [formularioData, setFormularioData] = useState(initialState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const enviarConsulta = async () => {
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
    } else {
      setIsLoading(true)
      try {
        await request.post('/nuevaConsulta', {
          full_name: formularioData.nombreCompleto,
          email: formularioData.email,
          telefono: formularioData.telefono,
          consulta: formularioData.consulta
        })
        dispatch(openToast({ severity: 'success', text: 'Consulta enviada exitosamente' }))
        dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
        setFormularioData(initialState)
      } catch(error) {
        dispatch(openToast({ severity: 'error', text: 'Hubo un problema al intentar enviar la consulta. Por favor intente nuevamente' }))
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    )
  } else {
    return (
      <div>
        <ValidationInput
          id="nombreCompleto"
          value={formularioData.nombreCompleto}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          maxlength={25}
          label="Nombre completo"
          icon={<AccountCircle />}
          fullWidth
          onChange={(value) => setFormularioData({ ...formularioData, nombreCompleto: value })}
        />
        <ValidationInput
          id="email"
          value={formularioData.email}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          isEmail
          maxlength={60}
          label="E-mail"
          icon={<Email />}
          fullWidth
          onChange={(value) => setFormularioData({ ...formularioData, email: value })}
          helperText="*De ser necesario, Andicar utilizará este medio para contactarlo."
        />
        <ValidationInput
          id="telefono"
          value={formularioData.telefono}
          maxlength={20}
          validationGroupName={VALIDATION_GROUP_NAME}
          label="Teléfono"
          isPhone
          icon={<Phone />}
          fullWidth
          onChange={(value) => setFormularioData({ ...formularioData, telefono: value })}
        />
        <ValidationInput
          id="consulta"
          value={formularioData.consulta}
          validationGroupName={VALIDATION_GROUP_NAME}
          required
          label="Consulta"
          fullWidth
          onChange={(value) => setFormularioData({ ...formularioData, consulta: value })}
          multiline
          maxlength={800}
          rows={6}
        />
        <Button
          onClick={enviarConsulta}
          variant="contained"
          color="primary"
        >
          Enviar
        </Button>
      </div>
    )
  }
}