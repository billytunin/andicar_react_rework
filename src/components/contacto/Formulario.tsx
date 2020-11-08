import React from 'react';
import { ValidationInput } from '../validation-input/ValidationInput'
import Button from '@material-ui/core/Button'
import { useSelector } from 'react-redux'

import { setNombreCompleto, setEmail, setTelefono, setConsulta, selectFormularioData } from './formularioSlice'

import AccountCircle from '@material-ui/icons/AccountCircle'
import Email from '@material-ui/icons/Email'
import Phone from '@material-ui/icons/Phone'

export function Formulario() {
  const formularioData = useSelector(selectFormularioData)

  const enviarConsulta = () => {
    console.log('consulta enviada!')
    console.log(formularioData)
  }

  return (
    <div>
      <ValidationInput
        id="nombre-completo"
        required
        label="Nombre completo"
        icon={<AccountCircle />}
        fullWidth
        actionOnChange={setNombreCompleto}
      />
      <ValidationInput
        id="email"
        required
        label="E-mail"
        icon={<Email />}
        fullWidth
        actionOnChange={setEmail}
        helperText="Por favor verifique que su casilla de correo esté escrita correctamente. De lo contrario, Andicar no tendrá la posibilidad de responder su consulta o mensaje."
      />
      <ValidationInput
        id="telefono"
        label="Teléfono"
        icon={<Phone />}
        fullWidth
        actionOnChange={setTelefono}
      />
      <ValidationInput
        id="consulta"
        required
        label="Consulta"
        fullWidth
        actionOnChange={setConsulta}
        multiline
        rows={6}
      />
      <Button onClick={enviarConsulta} variant="contained" color="primary">Enviar</Button>
    </div>
  )
}