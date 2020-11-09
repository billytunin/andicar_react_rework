import React from 'react';
import { isEmpty } from 'lodash'
import { ValidationInput } from '../validation-input/ValidationInput'
import Button from '@material-ui/core/Button'
import { useSelector, useDispatch } from 'react-redux'

import { setFieldValue, selectFormularioData, resetState } from './formularioSlice'
import { getValidationGroups, setValidationGroupDirtyState } from '../validation-input/validationInputsSlice'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'

const VALIDATION_GROUP_NAME = 'formularioContacto'

export function Formulario() {
  const dispatch = useDispatch()

  const formularioData = useSelector(selectFormularioData)
  const validationGroups = useSelector(getValidationGroups)

  const validationGroupHasErrors = (): boolean => {
    if(!isEmpty(validationGroups) && validationGroups[VALIDATION_GROUP_NAME]) {
      let foundError = false
      for (let key in validationGroups[VALIDATION_GROUP_NAME]) {
        foundError = validationGroups[VALIDATION_GROUP_NAME][key].isInvalid
        if (foundError) {
          break
        }
      }
      return foundError
    } else {
      return false
    }
  }

  const enviarConsulta = () => {
    console.log(formularioData)
    console.log(validationGroups)
    dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: true }))
    if (validationGroupHasErrors()) {
      console.log('consulta NO enviada!')
    } else {
      dispatch(resetState())
      dispatch(setValidationGroupDirtyState({ validationGroupName: VALIDATION_GROUP_NAME, isDirty: false }))
      console.log('consulta enviada!')
    }
  }

  const dispatchSetFieldValue = ({ field, value }: SetValueAction) => {
    dispatch(setFieldValue({ field, value }))
  }

  return (
    <div>
      <ValidationInput
        id="nombreCompleto"
        validationGroupName={VALIDATION_GROUP_NAME}
        required
        maxlength={25}
        label="Nombre completo"
        icon={<AccountCircle />}
        fullWidth
        onChange={dispatchSetFieldValue}
      />
      <ValidationInput
        id="email"
        validationGroupName={VALIDATION_GROUP_NAME}
        required
        isEmail
        maxlength={60}
        label="E-mail"
        icon={<Email />}
        fullWidth
        onChange={dispatchSetFieldValue}
        helperText="*De ser necesario, Andicar utilizará este medio para contactarlo."
      />
      <ValidationInput
        id="telefono"
        maxlength={20}
        validationGroupName={VALIDATION_GROUP_NAME}
        label="Teléfono"
        isPhone
        icon={<Phone />}
        fullWidth
        onChange={dispatchSetFieldValue}
      />
      <ValidationInput
        id="consulta"
        validationGroupName={VALIDATION_GROUP_NAME}
        required
        label="Consulta"
        fullWidth
        onChange={dispatchSetFieldValue}
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