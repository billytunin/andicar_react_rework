import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { setPagina } from '../productos/productosSlice'

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
      if (action.payload.productoIndex !== undefined) {
        state.productoIndex = action.payload.productoIndex
      }
    },
    next: (state) => {
      state.productoIndex++
    },
    prev: (state) => {
      state.productoIndex--
    },
    resetProductoIndexAtProductosViewer: (state) => {
      state.productoIndex = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setPagina, (state, action) => {
      // Cada vez que cambia la página en la sección de productos, deberiamos reinicar el estado de productoIndex.
      // Para evitar errores donde queda un productoIndex, por ejemplo 5, en una pagina que solo tiene 4 productos.
      state.productoIndex = 0
    })
  }
})

export const {
  toggleProductosViewer,
  next,
  prev,
  resetProductoIndexAtProductosViewer
} = productosViewerSlice.actions

export const productosViewerState = (state: RootState) => state.productosViewer

export default productosViewerSlice.reducer
