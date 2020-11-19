import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: ProductosViewerState = {
  isOpen: false,
  productoIndex: 0
}

export const productosViewerSlice = createSlice({
  name: 'productosViewer',
  initialState,
  reducers: {
    toggleProductosViewer: (state, action: PayloadAction<OpenProductosViewerAction>) => {
      state.isOpen = action.payload.isOpen
      if (action.payload.productoIndex) {
        state.productoIndex = action.payload.productoIndex
      }
    },
    next: (state) => {
      state.productoIndex++
    },
    prev: (state) => {
      state.productoIndex--
    }
  }
})

export const { toggleProductosViewer, next, prev } = productosViewerSlice.actions

export const productosViewerState = (state: RootState) => state.productosViewer

export default productosViewerSlice.reducer
