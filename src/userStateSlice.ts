import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store'

const initialState: UserState = {
  isLoggedIn: false,
  isAdmin: false,
  sessionErrorId: null,
  initialCheck: false
}

export const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<SetStateAction>) => {
      state.isLoggedIn = action.payload.isLoggedIn ? true : false
      state.isAdmin = action.payload.isAdmin ? true : false
      state.sessionErrorId = action.payload.sessionErrorId ? action.payload.sessionErrorId : null
    },
    setInitialCheck: (state, action: PayloadAction<boolean>) => {
      state.initialCheck = action.payload
    }
  }
})

export const { setState, setInitialCheck } = userStateSlice.actions

export const userState = (state: RootState) => state.userState
export const getInitialCheckState = (state: RootState) => state.userState.initialCheck

export default userStateSlice.reducer
