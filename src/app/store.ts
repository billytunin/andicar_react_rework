import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import validationInputsReducer from '../components/validation-input/validationInputsSlice'
import toastAlertReducer from '../components/toast-alert/toastAlertSlice'
import productosViewerReducer from '../components/productos-viewer/productosViewerSlice'
import productosSlice from '../components/productos/productosSlice'
import userStateReducer from '../userStateSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    validationInputs: validationInputsReducer,
    toastAlert: toastAlertReducer,
    productos: productosSlice,
    productosViewer: productosViewerReducer,
    userState: userStateReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
