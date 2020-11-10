import React, { useState } from 'react'
import { ValidationInput } from '../validation-input/ValidationInput'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

import {
  validationGroupHasErrors,
  setValidationGroupDirtyState,
  shakeInvalids
} from '../validation-input/validationInputsSlice'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'

const VALIDATION_GROUP_NAME = 'formularioContacto'

export function Formulario() {
  const dispatch = useDispatch()
  const initialState = {
    nombreCompleto: '',
    email: '',
    telefono: '',
    consulta: ''
  }

  const [formularioData, setFormularioData] = useState(initialState)
  const formHasErrors = useSelector(validationGroupHasErrors(VALIDATION_GROUP_NAME))

  const enviarConsulta = () => {
    console.log(formularioData)
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (formHasErrors) {
      dispatch(shakeInvalids(VALIDATION_GROUP_NAME))
      console.log('consulta NO enviada!')
    } else {
      dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
      setFormularioData(initialState)
      console.log('consulta enviada!')
    }
  }

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