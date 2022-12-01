import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: ProductConfigPorUsuarioModalState = {
  isOpen: false,
  productId: 0
}

export const productConfigPorUsuarioModalSlice = createSlice({
  name: 'productConfigPorUsuarioModal',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<ProductConfigPorUsuarioToggleModalAction>) => {
      state.isOpen = action.payload.isOpen
      if (action.payload.productId !== undefined) {
        state.productId = action.payload.productId
      }
    }
  }
})

export const {
  toggleModal,
} = productConfigPorUsuarioModalSlice.actions

export const modalState = (state: RootState) => state.productConfigPorUsuarioModal

export default productConfigPorUsuarioModalSlice.reducer
