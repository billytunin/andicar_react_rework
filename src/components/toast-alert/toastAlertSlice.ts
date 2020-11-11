import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: ToastAlertState = {
  open: false,
  severity: 'info',
  text: ''
}

export const toastAlertSlice = createSlice({
  name: 'toastAlert',
  initialState,
  reducers: {
    openToast: (state, action: PayloadAction<OpenToastAction>) => {
      state.open = true
      state.severity = action.payload.severity
      state.text = action.payload.text
    },
    closeToast: state => {
      state.open = false
    }
  }
})

export const { openToast, closeToast } = toastAlertSlice.actions

export const toastState = (state: RootState) => state.toastAlert

export default toastAlertSlice.reducer
