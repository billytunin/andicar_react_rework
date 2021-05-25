import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store'
import axios from './utils/axios'

const initialState: UserState = {
  isLoggedIn: false,
  priceModifier: 1,
  priceVisibility: false,
  isAdmin: false,
  sessionErrorId: null,
  initialCheck: false,
  isMobileVersion: false
}

export const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setInitialCheck: (state, action: PayloadAction<boolean>) => {
      state.initialCheck = action.payload
    },
    userStateLogin: (state, action: PayloadAction<UserStateLoginPayload>) => {
      state.isLoggedIn = true
      state.priceModifier = action.payload.priceModifier
      state.priceVisibility = action.payload.priceVisibility
      state.isAdmin = action.payload.isAdmin
      axios.setAuthToken(action.payload.token)
    },
    userStateLogout: (state) => {
      state.isLoggedIn = false
      state.priceModifier = 1
      state.priceVisibility = false
      state.isAdmin = false
      axios.removeAuthToken()
    },
    setSessionErrorId: (state, action: PayloadAction<string>) => {
      state.sessionErrorId = action.payload
    },
    setIsMobileVersion: (state, action: PayloadAction<boolean>) => {
      state.isMobileVersion = action.payload
    }
  }
})

export const {
  setInitialCheck,
  userStateLogin,
  userStateLogout,
  setSessionErrorId,
  setIsMobileVersion
} = userStateSlice.actions

export const userState = (state: RootState) => state.userState
export const getInitialCheckState = (state: RootState) => state.userState.initialCheck
export const getIsMobileVersion = (state: RootState) => state.userState.isMobileVersion

export default userStateSlice.reducer
