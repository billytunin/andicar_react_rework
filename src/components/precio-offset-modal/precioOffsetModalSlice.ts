import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: PrecioOffsetModalState = {
  isOpen: false,
  productId: 0
}

export const precioOffsetModalSlice = createSlice({
  name: 'precioOffsetModal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<PrecioOffsetToggleModalAction>) => {
      state.isOpen = action.payload.isOpen
      if (action.payload.productId !== undefined) {
        state.productId = action.payload.productId
      }
    }
  }
})

export const {
  toggleModal,
} = precioOffsetModalSlice.actions

export const modalState = (state: RootState) => state.precioOffsetModal

export default precioOffsetModalSlice.reducer
