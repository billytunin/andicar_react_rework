import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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
    setFieldValue: (state, action: PayloadAction<SetValueAction>) => {
      state[action.payload.field as keyof FormularioState] = action.payload.value
    },
    resetState: () => initialState
  }
})

export const { setFieldValue, resetState } = formularioSlice.actions

export const selectFormularioData = (state: RootState) => state.formularioContacto

export default formularioSlice.reducer
