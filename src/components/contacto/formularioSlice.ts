import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface FormularioState {
  nombreCompleto: string | null
  email: string | null
  telefono: string | null
  consulta: string | null
}

const initialState: FormularioState = {
  nombreCompleto: null,
  email: null,
  telefono: null,
  consulta: null
}

export const formularioSlice = createSlice({
  name: 'formularioContacto',
  initialState,
  reducers: {
    setNombreCompleto: (state, action: PayloadAction<string>) => {
      state.nombreCompleto = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload
    },
    setTelefono: (state, action: PayloadAction<string>) => {
      state.telefono = action.payload
    },
    setConsulta: (state, action: PayloadAction<string>) => {
      state.consulta = action.payload
    }
  }
})

export const { setNombreCompleto, setEmail, setTelefono, setConsulta } = formularioSlice.actions

export const selectFormularioData = (state: RootState) => state.formularioContacto

export default formularioSlice.reducer
