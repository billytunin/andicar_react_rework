import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store'
import axios from './utils/axios'

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
    setInitialCheck: (state, action: PayloadAction<boolean>) => {
      state.initialCheck = action.payload
    },
    userStateLogin: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true
      axios.setAuthToken(action.payload)
    },
    userStateLogout: (state) => {
      state.isLoggedIn = false
      axios.removeAuthToken()
    },
    setIsAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload
    },
    setSessionErrorId: (state, action: PayloadAction<string>) => {
      state.sessionErrorId = action.payload
    }
  }
})

export const {
  setInitialCheck,
  userStateLogin,
  userStateLogout,
  setIsAdmin,
  setSessionErrorId
} = userStateSlice.actions

export const userState = (state: RootState) => state.userState
export const getInitialCheckState = (state: RootState) => state.userState.initialCheck

export default userStateSlice.reducer
