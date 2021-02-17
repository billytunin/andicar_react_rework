import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

const initialState: NewProductosState = {
  someImagenLoading: false
}

export const newProductosSlice = createSlice({
  name: 'newProductosState',
  initialState,
  reducers: {
    setSomeImagenLoading: (state, action: PayloadAction<boolean>) => {
      state.someImagenLoading = action.payload
    }
  }
})

export const { setSomeImagenLoading } = newProductosSlice.actions

export const someImagenLoading = (state: RootState) => state.newProductos.someImagenLoading

export default newProductosSlice.reducer
