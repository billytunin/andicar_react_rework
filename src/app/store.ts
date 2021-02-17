import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import validationInputsReducer from '../components/validation-input/validationInputsSlice'
import productosViewerReducer from '../components/productos-viewer/productosViewerSlice'
import productosReducer from '../components/productos/productosSlice'
import newProductosReducer from '../components/productos/newProductosSlice'
import userStateReducer from '../userStateSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    validationInputs: validationInputsReducer,
    productos: productosReducer,
    productosViewer: productosViewerReducer,
    userState: userStateReducer,
    newProductos: newProductosReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
