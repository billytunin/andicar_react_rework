import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import formularioContactoReducer from '../components/contacto/formularioSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    formularioContacto: formularioContactoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
